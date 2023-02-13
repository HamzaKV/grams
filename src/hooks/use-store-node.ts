import { useState, useMemo, useEffect } from 'react';
import useAppContext from './use-context';
import subscriber from '../models/subscriber';
import { getter, setter } from '../utils/state-fns';
import { GramNode } from '../types/gram';
import { supportedStateTypes } from '../constants/strings';

const useStoreNode = (
    key: string
): GramNode<unknown> | null | undefined => {
    const { map } = useAppContext();

    const [, updateState] = useState(1);

    const forceUpdate = () => {
        updateState((prev) => (prev === 0 ? 1 : 0));
    };

    const node = useMemo(() => {
        return map ? map.get(key) : null;
    }, [map, key]);

    useEffect(() => {
        const s = subscriber(key);
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
    }, [map, key, node]);

    return node;
};

export default useStoreNode;
