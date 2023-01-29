import useAppContext from './use-context';

const useIsStoreReady = (): boolean => {
    const { isReady } = useAppContext();
    return isReady as boolean;
};

export default useIsStoreReady;
