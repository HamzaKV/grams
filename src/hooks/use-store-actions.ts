import { getter, setter } from '../utils/state-fns';
import useContext from './use-context';
import useSetStore from './use-set-store';

const useStoreActions = (
    actionName: string,
    key: string
): (newValue?: any) => void => {
    const { map } = useContext();
    const setState = useSetStore(key);

    const action = (newValue?: any) => {
        if (map) {
            const node = map.get(key);
            const actions = map.get(key)?.actions;
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
