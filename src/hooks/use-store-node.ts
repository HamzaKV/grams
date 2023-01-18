import { useState, useEffect, useMemo } from 'react';
import useAppContext from './use-context';
import subscriber from '../models/subscriber';
import { mergeKey } from '../utils/state-prop';
import { getter, setter } from '../utils/state-fns';
import { GramNode } from '../types/gram';
import { supportedStateTypes } from '../constants/strings';

const useStoreNode = (
    key: string,
    ...props: string[]
): GramNode<unknown> | null | undefined => {
    const { map } = useAppContext();

    const [, updateState] = useState(1);

    const forceUpdate = () => {
        updateState((prev) => (prev === 0 ? 1 : 0));
    };

    const mapKey = useMemo(() => mergeKey(key, ...props), []);

    const node = useMemo(() => {
        return map ? map.get(mapKey) : null;
    }, []);

    useEffect(() => {
        const s = subscriber(mapKey);
        if (map && node && node.stateType === supportedStateTypes.stateful) {
            node.subscribers.push(forceUpdate);
            s.setId(node.subscribers.length - 1);
        }

        return () => {
            //cleanup -> remove from subscriber list on unmount
            if (map && node) {
                node.subscribers.splice(s.getId(), 1);
                if (node.effects?.onUnMount)
                    node.effects.onUnMount(
                        node.value,
                        getter(map),
                        setter(map)
                    );
            }
        };
    }, []);

    return node;
};

export default useStoreNode;
