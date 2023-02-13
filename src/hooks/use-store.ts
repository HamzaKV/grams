import useStoreValue from './use-store-value';
import useSetStore from './use-set-store';

const useStore = (key: string) => {
    const state = useStoreValue(key);
    const setState = useSetStore(key);

    return [state, setState];
};

export default useStore;
