
export type StateMap = Map<string, any[]>;

const map = () => {
    const stateMap: StateMap = new Map();

    const get = (key: string) => (stateMap.has(key) ? stateMap.get(key) : []);

    const add = (key: string, value: any[]) => stateMap.set(key, value);

    const remove = (key: string) => stateMap.delete(key);

    return {
        get,
        add,
        remove,
        stateMap
    };
};

export default map;