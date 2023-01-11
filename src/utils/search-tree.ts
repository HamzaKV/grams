import { Node, Tree } from '../models/state-tree';

const search =
    (tree: Tree<any>) =>
        (key: string, ...props: string[]): Node<any> | undefined => {
            let current: Node<any> | undefined = tree[key];

            if (props && props.length > 0) {
                let tmp: any;
                props.forEach(() => {
                    tmp = current?.children;
                });
                current = tmp[props.length - 1];
            }

            return current;
        };

export default search;
