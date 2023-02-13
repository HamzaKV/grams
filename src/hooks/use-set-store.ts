import { setter } from '../utils/state-fns';
import useAppContext from './use-context';

const useSetStore = (
    key: string
): ((newValue: unknown) => void) => {
    const { map } = useAppContext();

    const setStore = (value: unknown | ((prev: unknown) => unknown)) => {
        if (map) setter(map)(value, key);
    };

    return setStore;
};

export default useSetStore;
