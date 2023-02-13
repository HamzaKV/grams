import { setter } from '../utils/state-fns';
import useAppContext from './use-context';
import type { StateKeys } from '../utils/create-store';

const useSetStore = (
    key: string | ((stateKeys: StateKeys) => string)
): ((newValue: unknown) => void) => {
    const { map, stateKeys } = useAppContext();

    const setStore = (value: unknown | ((prev: unknown) => unknown)) => {
        if (map && stateKeys) {
            setter(map)(value, typeof key === 'function' ? key(stateKeys) : key);
        }
    };

    return setStore;
};

export default useSetStore;
