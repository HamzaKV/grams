import { getter, setter } from '../utils/state-fns';
import useContext from './use-context';
import useSetStore from './use-set-store';
import type { StateKeys } from '../utils/create-store';

const useStoreActions = (
    actionName: string | ((stateKeys: StateKeys) => string),
    key: string | ((stateKeys: StateKeys) => string)
): (newValue?: unknown) => void => {
    const { map, stateKeys } = useContext();
    const setState = useSetStore(key);

    const action = (newValue?: unknown) => {
        if (map && stateKeys) {
            const node = map.get(typeof key === 'string' ? key : key(stateKeys));
            const actions = map.get(typeof key === 'string' ? key : key(stateKeys))?.actions;
            if (actions) {
                const action = actions[typeof actionName === 'string' ? actionName : actionName(stateKeys)];
                if (action) {
                    const result = action(
                        node?.value, 
                        newValue, 
                        node?.defaultValue, 
                        getter(map, stateKeys), 
                        setter(map, stateKeys)
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
