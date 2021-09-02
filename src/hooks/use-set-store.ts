import useAppContext from './use-context';
import searchTree from '../utils/search-tree';
import updateTree from '../utils/update-tree';
import deepCopy from '../utils/deep-copy';

const useSetStore = (
    key: string,
    ...props: string[]
): ((newValue: any) => void) => {
    const { store, map } = useAppContext();

    const setStore = (value: any | ((prev: any) => any)) => {
        if (store) {
            const node = searchTree(store)(key, ...props);
            if (node) {
                const newValue =
                    typeof value === 'function'
                        ? value(deepCopy(node?.value))
                        : value;
                let run = false;
                if (node?.proxy) {
                    try {
                        node.proxy(newValue);
                        run = true;
                    } catch (err) {
                        console.error(err);
                        run = false;
                        return;
                    }
                } else {
                    run = true;
                }
                if (run) {
                    if (node?.effects?.onUpdate)
                        node.effects.onUpdate(node?.value);
                    updateTree(store)(newValue, key, ...props);
                }
            }
        }

        if (map) {
            let mapKey = key;
            const mapKeys = [mapKey];
            for (const prop of props) {
                mapKey += ':prop:' + prop;
                mapKeys.push(mapKey);
            }
            for (const mapKey of mapKeys) {
                const list = map.get(mapKey);
                if (list) {
                    for (const updater of list) {
                        updater();
                    }
                }
            }
        }
    };

    return setStore;
};

export default useSetStore;
