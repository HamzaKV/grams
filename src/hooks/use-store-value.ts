import useStoreNode from './use-store-node';

const useStoreValue = (key: string, ...props: string[]): unknown => {
    const node = useStoreNode(key, ...props);

    return node ? node.value : null;
};

export default useStoreValue;
