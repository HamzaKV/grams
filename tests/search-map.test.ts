import gram from '../src/models/gram';
import createStore from '../src/utils/create-store';
import { getAllRelations } from '../src/utils/search-map';

describe('Test map search', () => {
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
        onMount: () => '1',
    };
    const type = 'string';
    const stateType = 'stateful';
    const middleware = [() => false];
    const g = gram(defaultValue, type, stateType, produce, actions, effects, middleware);
    const store = createStore({ [gramKey]: g, [gramKey2]: g });
    const map = store.stateMap;

    it('should find the correct nodes', () => {
        const nodes = getAllRelations(map)(gramKey);
        expect(nodes[0].value).toBe(defaultValue);
    });

    it('should find the correct nodes', () => {
        const nodes = getAllRelations(map)(gramKey2);
        expect(nodes[0].value).toBe(defaultValue);
    });
});
