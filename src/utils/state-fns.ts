import { supportedStateTypes } from '../constants/strings';
import type { StateMap } from '../models/state-map';
import type { Getter, Setter } from '../types/gram';
import { getAllRelations } from './search-map';
import type { StateKeys } from '../utils/create-store';

export const getter: (map: StateMap, stateKeys: StateKeys) => Getter<unknown> =
    (map, stateKeys) =>
        (key: string | ((stateKeys: StateKeys) => string)): unknown => {
            const node = map.get(typeof key === 'string' ? key : key(stateKeys));
            return node ? node.value : null;
        };

export const setter: (map: StateMap, stateKeys: StateKeys) => Setter =
    (map, stateKeys) =>
        (
            value: unknown | ((prev: unknown) => unknown), 
            key: string | ((stateKeys: StateKeys) => string)
        ): void => {
            const nodes = getAllRelations(map)(typeof key === 'string' ? key : key(stateKeys));
            nodes.forEach((node) => {
                const prev = node.value;
                try {
                    if (node) {
                        if (
                            node.middleware 
                            && Object.keys(node.middleware).length > 0
                        ) {
                            for (
                                const middlewareKey of 
                                Object.keys(node.middleware)
                            ) {
                                const middleware = 
                                    node.middleware[middlewareKey];
                                if (
                                    !middleware(
                                        node.value,
                                        value,
                                        getter(map, stateKeys),
                                        setter(map, stateKeys)
                                    )
                                )
                                    return;
                            }
                        }
                        if (typeof value === 'function') {
                            node.value = value(node.value);
                        } else {
                            node.value = value;
                        }
                        if (node.effects?.onUpdate)
                            node.effects.onUpdate(
                                node.value, 
                                getter(map, stateKeys), 
                                setter(map, stateKeys)
                            );
                        if (node.stateType === supportedStateTypes.stateful) {
                            node.subscribers.forEach((s) => s());
                            if (node.effects?.onRender)
                                node.effects.onRender(
                                    node.value, 
                                    getter(map, stateKeys), 
                                    setter(map, stateKeys)
                                );
                        }
                    }
                } catch (err) {
                    if (node.effects?.onError) 
                        node.effects.onError(
                            err, 
                            prev, 
                            getter(map, stateKeys), 
                            setter(map, stateKeys)
                        );
                }
            });
        };
