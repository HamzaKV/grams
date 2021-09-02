import { useState, useEffect } from 'react';
import useAppContext from './use-context';
import searchTree from '../utils/search-tree';
import subscriber from '../models/subscriber';

const useStoreValue = (key: string, ...props: string[]): any => {
    const { store, map } = useAppContext();

    const mapKey = props ? key + ':prop:' + props.join(':prop:') : key;

    const [_, updateState] = useState(1);

    const forceUpdate = () => {
        updateState((prev) => (prev === 0 ? 1 : 0));
    };

    useEffect(() => {
        const s = subscriber(mapKey);
        if (map) {
            const list = map.get(mapKey);
            if (list) {
                list.push(forceUpdate);
                s.setId(list.length - 1);
            }
        }

        return () => {
            //cleanup -> remove from subscriber list on unmount
            if (map && map.has(mapKey)) {
                const list = map.get(mapKey);
                if (list) {
                    list.splice(s.getId(), 1);
                }
            }
        };
    }, []);

    return store ? searchTree(store)(key, ...props)?.value : null;
};

export default useStoreValue;
