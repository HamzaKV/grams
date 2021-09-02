import { Node } from '../models/state-tree';
import globalStore from '../models/global-store';
import searchStore from '../utils/search-tree';

const getStoreValue = (
    key: string,
    ...props: string[]
): Node<any> | undefined => searchStore(globalStore.getStore())(key, ...props);

export default getStoreValue;
