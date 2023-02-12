import useStoreNode from './use-store-node';
import { getter } from '../utils/state-fns';
import useAppContext from './use-context';

const useStoreProduce = (
    produceName: string,
    key: string,
    ...props: string[]
): unknown => {
    const { map } = useAppContext();
    const node = useStoreNode(key, ...props);

    return node && map
        ? node.produce?.[produceName](node.value, getter(map))
        : null;
};

export default useStoreProduce;
