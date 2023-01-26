import { supportedStateTypes } from '../constants/strings';
import type { StateMap } from '../models/state-map';
import type { Getter, Setter } from '../types/gram';
import { getAllRelations } from './search-map';
import { mergeKey } from './state-prop';

export const getter: (map: StateMap) => Getter<unknown> =
    (map) =>
        (key: string, ...props: string[]): unknown => {
            const mapKey = mergeKey(key, ...props);
            const node = map.get(mapKey);
            return node ? node.value : null;
        };

export const setter: (map: StateMap) => Setter =
    (map: StateMap) =>
        (
            value: unknown | ((prev: unknown) => unknown), 
            key: string, 
            ...props: string[]
        ): void => {
            const mapKey = mergeKey(key, ...props);
            const nodes = getAllRelations(map)(mapKey);
            nodes.forEach((node) => {
                const prev = node.value;
                try {
                    if (node) {
                        if (node.middleware && node.middleware.length > 0) {
                            for (const middleware of node.middleware) {
                                if (
                                    !middleware(
                                        node.value,
                                        value,
                                        getter(map),
                                        setter(map)
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
                                getter(map), 
                                setter(map)
                            );
                        if (node.stateType === supportedStateTypes.stateful)
                            node.subscribers.forEach((s) => s());
                        if (node.effects?.onRender)
                            node.effects.onRender(
                                node.value, 
                                getter(map), 
                                setter(map)
                            );
                    }
                } catch (err) {
                    if (node.effects?.onError) 
                        node.effects.onError(
                            err, 
                            prev, 
                            getter(map), 
                            setter(map)
                        );
                }
            });
        };
