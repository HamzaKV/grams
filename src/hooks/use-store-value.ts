import useStoreNode from './use-store-node';

const useStoreValue = (key: string): unknown => {
    const node = useStoreNode(key);

    return node ? node.value : null;
};

export default useStoreValue;
