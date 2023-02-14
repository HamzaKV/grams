import { setter } from '../utils/state-fns';
import useAppContext from './use-context';
import type { StateKeys } from '../utils/create-store';

const useSetStore = (
    key: string | ((stateKeys: StateKeys) => string)
): ((value: unknown | ((prev: unknown) => unknown)) => void) => {
    const { map, stateKeys } = useAppContext();

    const setStore = (value: unknown | ((prev: unknown) => unknown)) => {
        if (map && stateKeys) {
            setter(map)(value, typeof key === 'string' ? key : key(stateKeys as StateKeys));
        }
    };

    return setStore;
};

export default useSetStore;
