type Value<T> = T;

type Getter<T> = (key: string, ...props: string[]) => Value<T>;

type Setter = (key: string, action: string, ...props: string[]) => void;

export interface Gram<T> {
    defaultValue: Value<T>;
    type:
        | 'string'
        | 'number'
        | 'bigint'
        | 'boolean'
        | 'symbol'
        | 'undefined'
        | 'object'
        | 'function'
        | 'granular';
    stateType: 'state' | 'cache';
    actions?: {
        [key: string]: (
            prev: Value<T>,
            newValue: Value<T>,
            defaultValue?: Value<T>,
            get?: Getter<T>,
            set?: Setter
        ) => Value<T>;
    };
    produce?: {
        [key: string]: (
            value: Value<T>,
            get?: Getter<T>,
            set?: Setter
        ) => Value<T>;
    };
    effects?: {
        onStart?: () => Value<T> | void;
        onUpdate: (prev: Value<T>, get?: Getter<T>, set?: Setter) => void;
        // onExit?: (
        //     prev: Value<T>,
        //     get?: Getter<T>,
        //     set?: Setter
        // ) => void;
        // onError?: (prev: Value<T>, get?: Getter<T>, set?: Setter) => void;
    };
    proxy?: (prev: Value<T>, get?: Getter<T>, set?: Setter) => boolean | Error;
}
