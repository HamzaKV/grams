import { supportedTypes, supportedStateTypes } from '../constants/strings';

export type Value<T> = T;

export type GramTypes = keyof typeof supportedTypes;

export type GramStateTypes = keyof typeof supportedStateTypes;

export type GramAction<T> = (
    prev: Value<T>,
    defaultValue: Value<T>,
    newValue?: Value<T>
) => Partial<Value<T>> | Promise<Partial<Value<T>>>;

export type GramProduce<T> = (value: Value<T>) => unknown;

export type GramMiddleware<T> = (prev: Value<T>, newValue: Value<T>) => boolean;

export type Middleware<T> = Record<string, GramMiddleware<T>>;

export type Produce<T> = Record<string, GramProduce<T>>;

export type Actions<T> = Record<string, GramAction<T>>;

export type Listener = <T>(state: Value<T>) => void;

export type Gram<T, P extends Produce<T>, A extends Actions<T>> = {
    defaultValue: Value<T>;
    type: GramTypes;
    stateType: GramStateTypes;
    produce?: P;
    actions?: A;
    effects?: {
        onMount?: (prev: Value<T>) => void | Value<T> | Promise<Value<T>>;
        onUpdate?: (prev: Value<T>) => void;
        onRender?: (prev: Value<T>) => void;
        onListenerSubscribed?: (prev: Value<T>) => void;
        onListenerUnSubscribed?: (prev: Value<T>) => void;
        onError?: (error: any, prev: Value<T>) => void;
    };
    middleware?: Middleware<T>;
};
