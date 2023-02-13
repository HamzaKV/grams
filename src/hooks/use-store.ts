import useStoreValue from './use-store-value';
import useSetStore from './use-set-store';
import type { StateKeys } from '../utils/create-store';

const useStore = (key: string | ((stateKeys: StateKeys) => string)) => {
    const state = useStoreValue(key);
    const setState = useSetStore(key);

    return [state, setState];
};

export default useStore;
