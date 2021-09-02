const DeepProxy = (
    obj: any,
    getter: (target: any, key: any) => any,
    setter: (target: any, key: any, value: any) => any
): any => {
    const handler = {
        get(target: any, key: any) {
            if (key == 'isProxy') return true;

            const prop = target[key];

            // return if property not found
            if (typeof prop == 'undefined') return;

            // set value as proxy if object
            if (!prop.isProxy && typeof prop === 'object')
                target[key] = new Proxy(prop, handler);

            return getter(target, key);
        },
        set(target: any, key: any, value: any) {
            return setter(target, key, value);
        },
    };

    return new Proxy(obj, handler);
};

export default DeepProxy;
