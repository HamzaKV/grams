import useStoreNode from './use-store-node';
import { getter } from '../utils/state-fns';
import useAppContext from './use-context';
import type { StateKeys } from '../utils/create-store';

const useStoreProduce = (
    produceName: string | ((stateKeys: StateKeys) => string),
    key: string | ((stateKeys: StateKeys) => string)
): unknown => {
    const { map, stateKeys } = useAppContext();
    const node = useStoreNode(key);

    return node && map && stateKeys
        ? node.produce?.[
            typeof produceName === 'string'
                ? produceName
                : produceName(stateKeys)
        ](node.value, getter(map, stateKeys))
        : null;
};

export default useStoreProduce;
