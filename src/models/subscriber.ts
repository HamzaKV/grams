export type Subscriber = (key: string) => {
    setId: (id: number) => number;
    getId: () => number;
    getKey: () => string;
}

const subscriber: Subscriber = (key: string) => {
    let _id = 0;
    const _key = key;

    return {
        setId: (id: number) => _id = id,
        getId: () => _id,
        getKey: () => _key,
    };
};

export default subscriber;
