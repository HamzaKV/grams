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

    const node = store ? searchTree(store)(key, ...props) : null;
    const actions = node ? node.actions : null;
    const defaultValue = node ? node.defaultValue : null;

    const action = (newValue: any) => {
        if (actions) {
            setState(actions[actionName](value, newValue, defaultValue));
        }
    };

    return action;
};

export default useStoreActions;
