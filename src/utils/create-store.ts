import compareMiddleware from '../middleware/compare';
import type {
    Gram as GramType,
    Listener,
    Value,
    Produce,
    Actions,
} from '../types/gram.type';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

const gram = <T, P extends Produce<T>, A extends Actions<T>>(
    definition: GramType<T, P, A>
) => {
    const { 
        effects, 
        actions, 
        produce, 
        defaultValue, 
        type, 
        stateType 
    } = definition;
    let state = defaultValue;
    const listeners = new Set<Listener>();
    const middleware = {
        compare: compareMiddleware,
        ...(definition.middleware ?? {}),
    };

    const update = (result: Value<T>) => {
        const middlewares = Object.values(middleware);
        if (middlewares.length > 0) {
            for (const fn of middlewares) {
                if (!fn(state, result)) return;
            }
        }
        if (type === 'object') state = { ...state, ...result };
        else state = result;
        if (effects?.onUpdate) effects.onUpdate(state);
    };

    const subscribe = (listener: Listener) => {
        if (stateType === 'stateic') 
            return () => {
                // do nothing 
            };
        listeners.add(listener);
        if (effects?.onListenerSubscribed) effects.onListenerSubscribed(state);

        return () => {
            listeners.delete(listener);
            if (effects?.onListenerUnSubscribed)
                effects.onListenerUnSubscribed(state);
        };
    };

    const getState = () => state;

    type ProduceKeys<T> = keyof T extends 'valueOf'
        ? keyof NonNullable<typeof produce>
        : keyof NonNullable<typeof produce> | keyof T;

    const getStateProduce =
        <K extends ProduceKeys<T>>(key: K) =>
            (): unknown => {
                // @ts-expect-error - key is a subset if P
                if (produce && produce[key]) {
                    // @ts-expect-error - key is a subset if P
                    return produce[key](state);
                }
                if (type !== 'object')
                    throw new Error('Produce not defined for non-object types');
                // @ts-expect-error - key is a subset if T
                return state[key];
            };

    const emitChange = () => {
        if (stateType === 'stateic') return;
        for (const listener of listeners) {
            listener(state);
        }
        if (effects?.onRender) effects.onRender(state);
    };

    const setState = (newValue: Value<T> | ((prev: Value<T>) => Value<T>)) => {
        try {
            let result;
            if (typeof newValue === 'function') {
                // @ts-expect-error - newValue is a function
                result = newValue(state);
            } else {
                result = newValue;
            }
            update(result);
            emitChange();
        } catch (err) {
            if (effects?.onError) effects.onError(err, state);
        }
    };

    const action =
        <P extends keyof NonNullable<typeof actions>>(key: P) =>
            (value?: Value<T>) => {
                try {
                    if (!actions) {
                        throw new Error('No actions defined');
                    }
                    // @ts-expect-error - key is in actions
                    const fn = actions[key];
                    if (!fn) {
                        throw new Error(`No action with ${String(key)} is defined`);
                    }
                    const result = fn(state, defaultValue, value);
                    if (result instanceof Promise) {
                        result
                            .then((value) => {
                                update(value);
                                emitChange();
                            })
                            .catch((err) => {
                                if (effects?.onError) 
                                    effects.onError(err, state);
                            });
                    } else {
                        update(result);
                        emitChange();
                    }
                } catch (err) {
                    if (effects?.onError) effects.onError(err, state);
                }
            };

    if (effects?.onMount) {
        const result = effects.onMount(state);

        if (result) {
            if (result instanceof Promise) {
                result
                    .then((value) => {
                        update(value);
                        emitChange();
                    })
                    .catch((err) => {
                        if (effects?.onError) effects.onError(err, state);
                    });
            } else {
                update(result);
                emitChange();
            }
        }
    }

    const useStoreValue = (): T => useSyncExternalStore(subscribe, getState);

    const useStoreProduce = <K extends ProduceKeys<T>>(key: K) =>
        useSyncExternalStore(subscribe, getStateProduce(key));

    const useSetStore = () => setState;

    const useStoreAction = <P extends keyof NonNullable<typeof actions>>(
        key: P
    ) => action<P>(key);

    const useStore = (): [
        ReturnType<typeof useStoreValue>,
        ReturnType<typeof useSetStore>
    ] => {
        const state = useStoreValue();
        const setState = useSetStore();

        return [state, setState];
    };

    return {
        internal: {
            subscribe,
            getState,
            setState,
            getStateProduce,
            action,
        },
        useStore,
        useStoreValue,
        useSetStore,
        useStoreProduce,
        useStoreAction,
    };
};

export default gram;
