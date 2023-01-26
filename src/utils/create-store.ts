import type { GramModels, GramNode } from '../types/gram';
import StateMap from '../models/state-map';
import type { StateMap as Map } from '../models/state-map';
import { getter, setter } from './state-fns';

const createStore = (
    grams: GramModels
): { stateMap: Map; }  => {
    const map = StateMap();

    const make = (models: GramModels, accKey: string) => {
        for (const key in models) {
            const gram = models[key];
            const defaultValue = gram.defaultValue ?? null;
            const gramNode: GramNode<unknown> = {
                defaultValue: Object.freeze(defaultValue),
                value: gram.defaultValue,
                subscribers: [],
                type: Object.freeze(gram.type),
                stateType: Object.freeze(gram.stateType),
                actions: Object.freeze(gram.actions),
                produce: Object.freeze(gram.produce),
                effects: Object.freeze(gram.effects),
                middleware: gram.middleware,
            };
            map.add(accKey ? accKey + key : key, Object.seal(gramNode));
            // if (rootGramType === supportedTypes.granular) {
            //     if (typeof gram.defaultValue !== 'object')
            //         throw new Error('granular can only be type object');
            //     const gramModels: GramModels = {};
            //     for (const gramKey in gram.defaultValue) {
            //         gramModels[gramKey] = gram.defaultValue[gramKey].type 
            //             ? gram.defaultValue[gramKey] : newGram(
            //                 gram.defaultValue[gramKey],
            //                 typeof gram.defaultValue[gramKey] as GramTypes
            //             );
            //     }
            //     make(
            //         gramModels,
            //         accKey ? accKey + key + propDenote : key + propDenote
            //     );
            // }
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
                    getter(map), 
                    setter(map)
                );
                if (result) {
                    if (result instanceof Promise) {
                        result
                            .then((value) => setter(map)(value, key))
                            .catch(err => {
                                if (gramNode?.effects?.onError) 
                                    gramNode.effects.onError(
                                        err, 
                                        prev, 
                                        getter(map), 
                                        setter(map)
                                    );
                            });
                    } else {
                        setter(map)(result, key);
                    }
                }
            } catch (err) {
                if (gramNode.effects.onError) 
                    gramNode.effects.onError(
                        err, 
                        prev, 
                        getter(map), 
                        setter(map)
                    );
            }
        }
    }

    return { stateMap: map };
};

export default createStore;
