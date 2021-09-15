import StateTree from '../src/models/state-tree';
import gram from '../src/models/gram';

describe('State Tree', () => {
    const tree = StateTree();

    const key = 'foo';
    const defaultValue = 'value';
    const newValue = 'newValue';
    const actions = {
        sum: (v, nV) => 'bar'
    };
    const produce = {
        foo: (v) => 'hi'
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
});