import { Node, Tree } from '../models/state-tree';

const search =
    (tree: Tree<any>) =>
        (key: string, ...props: string[]): Node<any> | undefined => {
            let current: Node<any> | undefined = tree[key];

            if (props && props.length > 0) {
                let tmp: any;
                for (const _ of props.slice(0, -1)) {
                    tmp = current?.children;
                }
                current = tmp[props.length - 1];
            }

            return current;
        };

export default search;
