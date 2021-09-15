import { Gram } from '../types/gram';
import searchTree from '../utils/search-tree';
import updateTree from '../utils/update-tree';

export interface Node<T> extends Gram<T> {
    key: string;
    value: Gram<T>['defaultValue'];
    children?: {
        [key: string]: Node<T>;
    };
}

export interface Tree<T> {
    [key: string]: Node<T>;
}

const tree = () => {
    const root: Tree<any> = {};

    const search = (key: string, ...props: string[]) => 
        searchTree(root)(key, ...props);

    const add = (key: string, gram: Gram<any>, ...props: string[]) => {
        const value = gram?.effects?.onStart
            ? gram.effects.onStart() ?? gram.defaultValue
            : gram.defaultValue;
        if (props && props.length > 0) {
            let node = search(key, ...props);
            if (node && !node?.children) {
                node = {
                    ...node,
                    children: {
                        ...node.children,
                        [props[props.length - 1]]: {
                            ...gram,
                            value: value,
                            key: props[props.length - 1],
                        },
                    },
                };
            } else {
                throw new Error('Invalid property');
            }
        } else {
            root[key] = {
                ...gram,
                value: value,
                key: key,
            };
        }
    };

    const prune = (key: string, ...props: string[]) => {
        if (props && props.length > 0) {
            const node = search(key, ...props);
            if (node && !node?.children) {
                delete node.children;
            } else {
                throw new Error('Invalid property');
            }
        } else {
            delete root[key];
        }
    };

    const update = (value: any, key: string, ...props: string[]) => 
        updateTree(root)(value, key, ...props);

    return {
        add,
        search,
        prune,
        root,
        update,
    };
};

export default tree;
