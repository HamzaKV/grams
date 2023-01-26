import gram from '../src/models/gram';
import createStore from '../src/utils/create-store';
import { getter, setter } from '../src/utils/state-fns';

describe('Testing getter and setter fns', () => {
    const gramKey = 'g';
    const gramKey2 = 'g2';
    const defaultValue = 'value';
    const actions = {
        bar: () => 'bar'
    };
    const produce = {
        foo: () => 'hi',
    };
    const effects = {
        onMount: () => {
            //
        },
    };
    const type = 'string';
    const stateType = 'stateful';
    const middleware = [() => true];
    const g = gram(defaultValue, type, stateType, produce, actions, effects, middleware);
    const store = createStore({ [gramKey]: g, [gramKey2]: g });
    const map = store.stateMap;

    it('should get the correct value', () => {
        const value = getter(map)(gramKey);
        expect(value).toBe(defaultValue);
    });

    it('should get the correct value after setter', () => {
        const newValue = 'foo';
        setter(map)(newValue, gramKey);
        const value = getter(map)(gramKey);
        expect(value).toBe(newValue);
    });
});
