import StateTree, { Tree } from '../models/state-tree';
import StateMap, { StateMap as Map } from '../models/state-map';
import { Gram } from '../types/gram';
import globalStore from '../models/global-store';
import Observable from '../models/observable';

const createStore = (
    grams: {
        [key: string]: Gram<any>;
    },
    createGlobal?: boolean
): { store: Tree<any>; map: Map } => {
    const tree = StateTree();
    const map = StateMap();

    const make = (models: any, accKey: string) => {
        for (const key in models) {
            const gram = models[key];
            const props = accKey.split(':prop:');

            tree.add(key, gram, ...props);
            map.add(accKey ? `${accKey}:${key}` : key, []);

            if (gram.type === 'granular') {
                make(gram, accKey ? `${accKey}:${key}:prop:` : `${key}:prop:`);
            }
        }
    };

    make(grams, '');

    const store = createGlobal
        ? <typeof tree.root>Observable(tree.root, (_, newValue) => {
            globalStore.setStore(newValue);
        })
        : tree.root;

    // for (const key in grams) {
    //     const gram = grams[key];

    //     if (gram.type === 'granular') {
    //         store.add(key, gram);
    //         map.add(key, []);
    //         for (const childKey in gram.defaultValue) {
    //             const childGram = gram.defaultValue[childKey];
    //             store.add(key, childGram, childKey);
    //             map.add(`${key}:prop:${childKey}`, []);
    //         }
    //     } else {
    //         store.add(key, gram);
    //         map.add(key, []);
    //     }
    // }

    return {
        store: store,
        map: map.stateMap,
    };
};

export default createStore;
