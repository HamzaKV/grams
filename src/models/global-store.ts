import { Tree, Node } from '../models/state-tree';
import searchTree from '../utils/search-tree';

const GlobalStore = (store?: Tree<any>): {
    getStore: () => Tree<any>,
    setStore: (store: Tree<any>) => Tree<any>,
    search: (key: string, ...props: string[]) => Node<any> | undefined
} => {
    let _store = store ?? {};

    const getStore = () => _store;

    const setStore = (store: Tree<any>) => _store = store;

    const search = (key: string, ...props: string[]) =>
        searchTree(_store)(key, ...props);

    return {
        getStore,
        setStore,
        search,
    };
};

const globalStore = GlobalStore();

export default globalStore;