import { getter, setter } from '../utils/state-fns';
import { mergeKey } from '../utils/state-prop';
import useContext from './use-context';
import useSetStore from './use-set-store';

const useStoreActions = (
    actionName: string,
    key: string,
    ...props: string[]
): (newValue?: any) => void => {
    const { map } = useContext();
    const setState = useSetStore(key, ...props);

    const action = (newValue?: any) => {
        if (map) {
            const accKey = mergeKey(key, ...props);
            const node = map.get(accKey);
            const actions = map.get(accKey)?.actions;
            if (actions) {
                const action = actions[actionName];
                if (action) {
                    const result = action(
                        node?.value, 
                        newValue, 
                        node?.defaultValue, 
                        getter(map), 
                        setter(map)
                    );
            
                    if (result instanceof Promise) {
                        result.then((value) => setState(value));
                    } else {
                        setState(result);
                    }
                }
            }
        }
    };

    return action;
};

export default useStoreActions;
