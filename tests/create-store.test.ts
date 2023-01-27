import gram from '../src/models/gram';
import createStore from '../src/utils/create-store';

describe('Create a store', () => {
    const gramKey = 'g';
    const defaultValue = 'value';
    const actions = {
        bar: () => 'bar'
    };
    const produce = {
        foo: () => 'hi',
    };
    const effects = {
        onMount: () => '1',
    };
    effects.onMount = jest.fn();
    const type = 'string';
    const stateType = 'stateful';
    const middleware = {
        test: () => false
    };
    const g = gram(defaultValue, type, stateType, produce, actions, effects, middleware);
    const store = createStore({ [gramKey]: g });

    const map = store.stateMap;

    it('store should have the key', () => {
        expect(map.has(gramKey)).toBe(true);
    });

    it('it should have the value', () => {
        expect(map.get(gramKey)?.value).toBe(defaultValue);
    });

    it('it should have the type', () => {
        expect(map.get(gramKey)?.type).toBe(type);
    });

    it('it should have the stateType', () => {
        expect(map.get(gramKey)?.stateType).toBe(stateType);
    });

    it('it should give correct produce', () => {
        expect(map.get(gramKey)?.produce.foo()).toBe(produce.foo());
    });

    it('it should give correct action', () => {
        expect(map.get(gramKey)?.actions.bar()).toBe(actions.bar());
    });

    it('it should give correct effect', () => {
        expect(effects.onMount).toHaveBeenCalledTimes(1);
    });
});
