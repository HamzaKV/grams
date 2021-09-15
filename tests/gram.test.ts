import gram from '../src/models/gram';

describe('Create gram', () => {
    const defaultValue = 'value';
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

    it('should return the default value', () => {
        expect(g.defaultValue).toBe(defaultValue);
    });

    it('should return the actions sum value', () => {
        expect(g.actions.sum('', '')).toBe(actions.sum('', ''));
    });

    it('should return the produce foo value', () => {
        expect(g.produce.foo('')).toBe(produce.foo(''));
    });

    it('should return the onUpdate effect', () => {
        expect(g.effects.onUpdate('')).toBe(effects.onUpdate());
    });

    it('should return the typeof defaultValue', () => {
        expect(g.type).toBe(type);
    });

    it('should return the stateType', () => {
        expect(g.stateType).toBe(stateType);
    });

    it('should return the proxy value', () => {
        expect(g.proxy('')).toBe(proxy());
    });
});