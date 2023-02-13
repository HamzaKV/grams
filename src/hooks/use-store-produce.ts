import useStoreNode from './use-store-node';
import { getter } from '../utils/state-fns';
import useAppContext from './use-context';

const useStoreProduce = (
    produceName: string,
    key: string
): unknown => {
    const { map } = useAppContext();
    const node = useStoreNode(key);

    return node && map
        ? node.produce?.[produceName](node.value, getter(map))
        : null;
};

export default useStoreProduce;
