import { useState, useMemo, useEffect } from 'react';
import useAppContext from './use-context';
import subscriber from '../models/subscriber';
import { getter, setter } from '../utils/state-fns';
import { GramNode } from '../types/gram';
import { supportedStateTypes } from '../constants/strings';
import type { StateKeys } from '../utils/create-store';

const useStoreNode = (
    key: string | ((stateKeys: StateKeys) => string)
): GramNode<unknown> | null | undefined => {
    const { map, stateKeys } = useAppContext();

    const [, updateState] = useState(1);

    const forceUpdate = () => {
        updateState((prev) => (prev === 0 ? 1 : 0));
    };

    const node = useMemo(() => {
        return map && stateKeys ? map.get(typeof key === 'function' ? key(stateKeys) : key) : null;
    }, [map, key, stateKeys]);

    useEffect(() => {
        const s = subscriber(typeof key === 'function' ? key(stateKeys as StateKeys) : key);
        if (map && node && node.stateType === supportedStateTypes.stateful) {
            node.subscribers.add(forceUpdate);
            s.setId(node.subscribers.size - 1);
        }

        return () => {
            //cleanup -> remove from subscriber list on unmount
            if (map && node) {
                node.subscribers.delete(s.getId());
                if (node.effects?.onUnMount)
                    node.effects.onUnMount(
                        node.value,
                        getter(map),
                        setter(map)
                    );
            }
        };
    }, [map, key, node, stateKeys]);

    return node;
};

export default useStoreNode;
