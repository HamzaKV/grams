import { useState, useMemo, useEffect } from 'react';
import useAppContext from './use-context';
import subscriber, { Subscriber } from '../models/subscriber';
import { getter, setter } from '../utils/state-fns';
import { GramNode } from '../types/gram';
import { supportedStateTypes } from '../constants/strings';
import type { StateKeys } from '../utils/create-store';
import type { StateMap } from '../models/state-map';

const useStoreNode = (
    key: string | ((stateKeys: StateKeys) => string)
): GramNode<unknown> | null | undefined => {
    const { map, stateKeys } = useAppContext();

    const [, updateState] = useState(1);

    const node = useMemo(() => {
        return (map as StateMap).get(
            typeof key === 'string' ? key : key(stateKeys as StateKeys)
        );
    }, [key, map, stateKeys]);

    useEffect(() => {
        let s: ReturnType<Subscriber> | undefined;
        if (map && node && stateKeys) {
            s = subscriber(
                typeof key === 'string' ? key : key(stateKeys)
            );
            if (node.stateType === supportedStateTypes.stateful) {
                s.setId(node.subscribers.size);
                node.subscribers.add(() => {
                    updateState((prev) => (prev === 0 ? 1 : 0));
                });
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
                        getter(map),
                        setter(map)
                    );
            }
        };
    }, [map, key, node, stateKeys]);

    return node;
};

export default useStoreNode;
