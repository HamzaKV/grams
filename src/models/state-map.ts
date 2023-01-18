import type { GramNode } from '../types/gram';

export type StateMap = {
    get: (key: string) => GramNode<unknown> | undefined;
    add: (key: string, value: GramNode<unknown>) => void;
    remove: (key: string) => void;
    keys: () => string[];
    entries: () => [key: string, value: GramNode<unknown>][];
    has: (key: string) => boolean;
};

const map = (): StateMap => {
    const stateMap = new Map<string, GramNode<unknown>>();

    const get = (key: string) => stateMap.get(key);

    const add = (key: string, value: GramNode<unknown>) => 
        stateMap.set(key, value);

    const remove = (key: string) => stateMap.delete(key);

    const keys = () => [...stateMap.keys()];

    const entries = () => [...stateMap.entries()];

    const has = (key: string) => stateMap.has(key);

    return {
        get,
        add,
        remove,
        keys,
        entries,
        has,
    };
};

export default map;
