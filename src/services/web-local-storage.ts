const set = (key: string, value: any): void => {
    if (typeof value === 'string') {
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const get = (key: string): any => {
    let value: any = null;
    try {
        const result = localStorage.getItem(key) ?? '';
        value = JSON.parse(result);
    } catch (error) {
        value = localStorage.getItem(key);
    }
    return value;
};

const remove = (key: string): void => localStorage.removeItem(key);

const clear = (): void => localStorage.clear();

export default {
    set,
    get,
    remove,
    clear,
};
