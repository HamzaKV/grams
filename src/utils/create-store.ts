import type { GramModels, GramNode } from '../types/gram';
import StateMap from '../models/state-map';
import type { StateMap as Map } from '../models/state-map';
import { getter, setter } from './state-fns';
import compareMiddleware from '../middleware/compare';

export type StateKeys = {
    [key: string]: {
        key: string;
        produceKeys: { [key: string]: string };
        actionKeys: { [key: string]: string };
    };
};

const createStore = (
    grams: GramModels
): { stateMap: Map; stateKeys: StateKeys } => {
    const map = StateMap();
    const stateKeys: StateKeys = {};

    const make = (models: GramModels, accKey: string) => {
        for (const key in models) {
            const gram = models[key];
            stateKeys[key] = {
                key,
                produceKeys: gram.produce
                    ? Object.keys(gram.produce).reduce((acc, key) => {
                        acc[key] = key;
                        return acc;
                    }, {})
                    : {},
                actionKeys: gram.actions
                    ? Object.keys(gram.actions).reduce((acc, key) => {
                        acc[key] = key;
                        return acc;
                    }, {})
                    : {},
            };
            const defaultValue = gram.defaultValue ?? null;
            const gramNode: GramNode<unknown> = {
                defaultValue: Object.freeze(defaultValue),
                value: gram.defaultValue,
                subscribers: new Set(),
                type: Object.freeze(gram.type),
                stateType: Object.freeze(gram.stateType),
                actions: Object.freeze(gram.actions),
                produce: Object.freeze(gram.produce),
                effects: Object.freeze(gram.effects),
                middleware: {
                    compare: compareMiddleware,
                    ...(gram.middleware ?? {}),
                },
            };
            map.add(accKey ? accKey + key : key, Object.seal(gramNode));
        }
    };

    make(grams, '');

    const keys = map.keys();

    for (const key of keys) {
        const gramNode = map.get(key);
        if (gramNode?.effects?.onMount) {
            const prev = gramNode.value;
            try {
                const result = gramNode.effects.onMount(
                    prev,
                    getter(map, stateKeys),
                    setter(map, stateKeys)
                );
                if (result) {
                    if (result instanceof Promise) {
                        result
                            .then((value) => setter(map, stateKeys)(value, key))
                            .catch((err) => {
                                if (gramNode?.effects?.onError)
                                    gramNode.effects.onError(
                                        err,
                                        prev,
                                        getter(map, stateKeys),
                                        setter(map, stateKeys)
                                    );
                            });
                    } else {
                        setter(map, stateKeys)(result, key);
                    }
                }
            } catch (err) {
                if (gramNode.effects.onError)
                    gramNode.effects.onError(
                        err,
                        prev,
                        getter(map, stateKeys),
                        setter(map, stateKeys)
                    );
            }
        }
    }

    return { stateMap: map, stateKeys };
};

export default createStore;
