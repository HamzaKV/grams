import StateTree from '../src/models/state-tree';
import gram from '../src/models/gram';

describe('State Tree', () => {
    const tree = StateTree();

    const key = 'foo';
    const defaultValue = 'value';
    const newValue = 'newValue';
    const actions = {
        sum: () => 'bar'
    };
    const produce = {
        foo: () => 'hi'
    };
    const effects = {
        onUpdate: () => 1,
    };
    const type = typeof defaultValue;
    const stateType = 'state';
    const proxy = () => false;
    const g = gram(defaultValue, actions, produce, effects, type, stateType, proxy);

    it('should return gram', () => {
        tree.add(key, g);
        const result = tree.search(key);
        expect(result.value).toBe(defaultValue);
    });

    it('should return updated value', () => {
        tree.update(newValue, key);
        const result = tree.search(key);
        expect(result.value).toBe(newValue);
    });

    it('should return action sum', () => {
        const result = tree.search(key);
        expect(result.actions.sum()).toBe(actions.sum());
    });

    it('should return produce foo', () => {
        const result = tree.search(key);
        expect(result.produce.foo()).toBe(produce.foo());
    });

    it('should return effect onUpdate', () => {
        const result = tree.search(key);
        expect(result.effects.onUpdate()).toBe(effects.onUpdate());
    });

    it('should return proxy', () => {
        const result = tree.search(key);
        expect(result.proxy()).toBe(proxy());
    });
});