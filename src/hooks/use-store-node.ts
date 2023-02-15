import { useState, useMemo, useEffect } from 'react';
import useAppContext from './use-context';
import subscriber, { Subscriber } from '../models/subscriber';
import { getter, setter } from '../utils/state-fns';
import { GramNode } from '../types/gram';
import { supportedStateTypes } from '../constants/strings';
import type { StateKeys } from '../utils/create-store';

const useStoreNode = (
    key: string | ((stateKeys: StateKeys) => string)
): GramNode<unknown> | null | undefined => {
    const { map, stateKeys } = useAppContext();

    const resolvedKey = useMemo(() => {
        if (stateKeys) return typeof key === 'string' ? key : key(stateKeys);
        return null;
    }, [key, stateKeys]);

    const [, updateState] = useState(1);

    const forceUpdate = () => {
        updateState((prev) => (prev === 0 ? 1 : 0));
    };

    const node = useMemo(() => {
        return map && resolvedKey ? map.get(resolvedKey) : null;
    }, [map, resolvedKey]);

    useEffect(() => {
        let s: ReturnType<Subscriber> | undefined;
        if (map && node && resolvedKey) {
            s = subscriber(resolvedKey);
            if (node.stateType === supportedStateTypes.stateful) {
                s.setId(node.subscribers.size);
                node.subscribers.add(forceUpdate);
            }
        }

        return () => {
            //cleanup -> remove from subscriber list on unmount
            if (map && node && s) {
                const arr = Array.from(node.subscribers.values());
                const subToDelete = arr[s.getId()];
                node.subscribers.delete(subToDelete);
                if (node.effects?.onUnMount)
                    node.effects.onUnMount(
                        node.value,
                        getter(map, stateKeys as StateKeys),
                        setter(map, stateKeys as StateKeys)
                    );
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, node, resolvedKey]);

    return node;
};

export default useStoreNode;
