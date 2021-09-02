import useStoreValue from './use-store-value';
import useSetStore from './use-set-store';

const useStore = (key: string, ...props: string[]) => {
    const state = useStoreValue(key, ...props);
    const setState = useSetStore(key, ...props);

    return [state, setState];
};

export default useStore;
