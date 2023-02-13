import useStoreNode from './use-store-node';
import type { StateKeys } from '../utils/create-store';

const useStoreValue = (
    key: string | ((stateKeys: StateKeys) => string)
): unknown => {
    const node = useStoreNode(key);

    return node ? node.value : null;
};

export default useStoreValue;
