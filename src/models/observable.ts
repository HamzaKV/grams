import deepCopy from '../utils/deep-copy';

const Observable = <T>(
    obj: T,
    listener: (prev: T, newValue: T) => void
): any => {
    const _object = deepCopy(obj);

    const proxify = (
        object: any,
        change: (
            object: any,
            name: string | symbol,
            old: any,
            value: any
        ) => void
    ) => {
        // we use unique field to determine if object is proxy
        // we can't test this otherwise because typeof and
        // instanceof is used on original object
        if (object && object.__proxy__) {
            return object;
        }
        const proxy = new Proxy(object, {
            get: function (object, name) {
                if (name == '__proxy__') {
                    return true;
                }
                return object[name];
            },
            set: function (object, name, value) {
                const old = object[name];
                if (value && typeof value == 'object') {
                    // new object need to be proxified as well
                    value = proxify(value, change);
                }
                object[name] = value;
                change(object, name, old, value);
                return true;
            },
        });
        for (const prop in object) {
            if (
                // eslint-disable-next-line no-prototype-builtins
                object.hasOwnProperty(prop) &&
                object[prop] &&
                typeof object[prop] == 'object'
            ) {
                // proxify all child objects
                object[prop] = proxify(object[prop], change);
            }
        }
        return proxy;
    };
    return proxify(_object, () => listener(obj, _object));
};

export default Observable;
