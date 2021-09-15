import useContext from './use-context';
import useStoreValue from './use-store-value';
import searchTree from '../utils/search-tree';

const useStoreProduce = (
    produceName: string,
    key: string,
    ...props: string[]
): any => {
    const { store } = useContext();
    const value = useStoreValue(key, ...props);
    const produce = store ? searchTree(store)(key, ...props)?.produce : null;

    return produce ? produce[produceName](value) : null;
};

export default useStoreProduce;
