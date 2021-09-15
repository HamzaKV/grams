import { Tree } from '../models/state-tree';


// TODO: needs to be fixed
const update =
    (tree: Tree<any>) =>
        (value: any, key: string, ...props: string[]): void => {
            if (props && props.length > 0) {
                let node = tree[key];

                let currentValue = node.value;
                for (const prop of props) {
                    currentValue = currentValue[prop];
                }
                currentValue = value;

                for (const prop of props) {
                    const n = node.children?.[prop];
                    if (n) {
                        node = n;
                        let currentValue = node.value;
                        for (const p of props.slice(props.indexOf(prop) + 1)) {
                            currentValue = currentValue[p];
                        }
                        currentValue = value;
                    }
                }
            } else {
                tree[key].value = value;
            }
        };

export default update;