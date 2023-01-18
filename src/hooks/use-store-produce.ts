import useStoreNode from './use-store-node';

const useStoreProduce = (
    produceName: string,
    key: string,
    ...props: string[]
): unknown => {
    const node = useStoreNode(key, ...props);

    return node ? node.produce?.[produceName] : null;
};

export default useStoreProduce;
