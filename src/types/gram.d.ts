import { supportedTypes, supportedStateTypes } from '../constants/strings';
import type { StateKeys } from '../utils/create-store';

export type Value<T> = T;

export type Getter<T> = (
    key: string | ((stateKeys: StateKeys) => string)
) => Value<T>;

export type Setter = (
    value: unknown,
    key: string | ((stateKeys: StateKeys) => string)
) => void;

export type GramTypes = keyof typeof supportedTypes;

export type GramStateTypes = keyof typeof supportedStateTypes;

export type GramAction<T> = (
    prev: Value<T>,
    newValue: Value<T>,
    defaultValue: Value<T>,
    get: Getter<unknown>,
    set: Setter
) => Value<T> | Promise<Value<T>>;

export type GramProduce<T> = (
    value: Value<T>,
    get: Getter<unknown>
) => Value<T>;

export type GramMiddleware<T> = (
    prev: Value<T>,
    newValue: Value<T>,
    get: Getter<unknown>,
    set: Setter
) => boolean;

export type GramMiddlewares<T> = {
    [key: string]: GramMiddleware<T>;
};

export type Gram<T> = {
    defaultValue: Value<T>;
    type: GramTypes;
    stateType: GramStateTypes;
    actions?: {
        [key: string]: GramAction<T>;
    };
    produce?: {
        [key: string]: GramProduce<unknown>;
    };
    effects?: {
        onMount?: (
            prev: Value<T>,
            get: Getter<unknown>,
            set: Setter
        ) => void | Value<T> | Promise<Value<T>>;
        onUpdate?: (prev: Value<T>, get: Getter<unknown>, set: Setter) => void;
        onRender?: (prev: Value<T>, get: Getter<unknown>, set: Setter) => void;
        onUnMount?: (prev: Value<T>, get: Getter<unknown>, set: Setter) => void;
        onError?: (
            error: any,
            prev: Value<T>,
            get: Getter<unknown>,
            set: Setter
        ) => void;
    };
    middleware?: GramMiddlewares<T>;
};

export type GramNode<T> = {
    defaultValue: Value<T>;
    value: Value<T>;
    subscribers: Set<any>;
    type: GramTypes;
    stateType: GramStateTypes;
    actions?: Gram<T>['actions'];
    produce?: Gram<T>['produce'];
    effects?: Gram<T>['effects'];
    middleware?: Gram<T>['middleware'];
};

export type GramModels = {
    [key: string]: Gram<unknown>;
};
