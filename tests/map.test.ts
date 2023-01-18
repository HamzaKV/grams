import stateMap from '../src/models/state-map';
import type { GramNode } from '../src/types/gram';

describe('State Map', () => {
    const map = stateMap();

    const key = 'key';
    const defaultValue = 'value';
    const actions = {
        bar: () => 'bar'
    };
    const produce = {
        foo: () => 'hi',
    };
    const effects = {
        onUpdate: () => 1,
    };
    const type = typeof defaultValue;
    const stateType = 'stateful';
    const middleware = [() => false];
    const gramNode: GramNode<unknown> = {
        defaultValue,
        value: defaultValue,
        subscribers: [],
        type: Object.freeze(type) as 'string',
        stateType: Object.freeze(stateType) as 'stateful',
        actions: Object.freeze(actions),
        produce: Object.freeze(produce),
        effects: Object.freeze(effects),
        middleware: middleware,
    };

    it('should return map value', () => {
        map.add(key, gramNode);
        expect(map.get(key)?.value).toBe(gramNode.value);
    });

    it('should return map actions', () => {
        expect(map.get(key)?.actions.bar()).toBe(gramNode.actions.bar());
    });

    it('should return map produce', () => {
        expect(map.get(key)?.produce.foo()).toBe(gramNode.produce.foo());
    });

    it('should return map effects', () => {
        expect(map.get(key)?.effects.onUpdate()).toBe(gramNode.effects.onUpdate());
    });

    it('should return map middleware', () => {
        expect(map.get(key)?.middleware[0]).toBe(gramNode.middleware[0]);
    });
});
