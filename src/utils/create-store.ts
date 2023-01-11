import StateTree, { Tree } from '../models/state-tree';
import StateMap, { StateMap as Map } from '../models/state-map';
import { Gram } from '../types/gram';
import globalStore from '../models/global-store';
import Observable from '../models/observable';
import { default as newGram } from '../models/gram';

type GramModels = {
    [key: string]: Gram<any>;
};

const createStore = (
    grams: GramModels,
    createGlobal?: boolean
): { store: Tree<any>; map: Map } => {
    const tree = StateTree();
    const map = StateMap();

    const make = (models: GramModels, accKey: string) => {
        for (const key in models) {
            const gram = models[key];
            const props = `${accKey}${key}`
                .split(':prop:')
                .filter((item) => !!item);
            const treeKey = accKey ? props[0] : key;
            props.splice(0, 1);
            tree.add(
                treeKey,
                gram,
                ...(props && props.length > 0 ? props : [])
            );
            map.add(accKey ? `${accKey}:${key}` : key, []);

            if (gram.type === 'granular') {
                const gramModels: GramModels = {};
                for (const gramKey in gram.defaultValue) {
                    gramModels[gramKey] = newGram(gram.defaultValue[gramKey]);
                }
                make(
                    gramModels,
                    accKey ? `${accKey}${key}:prop:` : `${key}:prop:`
                );
            }
        }
    };

    make(grams, '');

    const store = createGlobal
        ? <typeof tree.root>Observable(
            tree.root, (_, newValue) => {
                globalStore.setStore(newValue);
            })
        : tree.root;

    console.log(store);

    return {
        store: store,
        map: map.stateMap,
    };
};

export default createStore;
