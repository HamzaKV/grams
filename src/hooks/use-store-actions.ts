import useContext from './use-context';
import useStoreValue from './use-store-value';
import searchTree from '../utils/search-tree';
import useSetStore from './use-set-store';

const useStoreActions = (
    actionName: string,
    key: string,
    ...props: string[]
): (newValue: any) => void => {
    const { store } = useContext();
    const value = useStoreValue(key, ...props);
    const setState = useSetStore(key, ...props);

    const actions = store ? searchTree(store)(key, ...props)?.actions : null;

    const action = (newValue: any) => {
        if (actions) {
            setState(actions[actionName](value, newValue));
        }
    };

    return action;
};

export default useStoreActions;
