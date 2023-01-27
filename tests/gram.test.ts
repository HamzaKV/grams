import gram from '../src/models/gram';

describe('Create gram', () => {
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
    const type = 'string';
    const stateType = 'stateful';
    const middleware = {
        test: () => false
    };
    const g = gram(defaultValue, type, stateType, produce, actions, effects, middleware);

    it('should return the default value', () => {
        expect(g.defaultValue).toBe(defaultValue);
    });

    it('should return the actions sum value', () => {
        expect(g.actions.bar()).toBe(actions.bar());
    });

    it('should return the produce foo value', () => {
        expect(g.produce.foo()).toBe(produce.foo());
    });

    it('should return the onUpdate effect', () => {
        expect(g.effects.onUpdate()).toBe(effects.onUpdate());
    });

    it('should return the typeof defaultValue', () => {
        expect(g.type).toBe(type);
    });

    it('should return the stateType', () => {
        expect(g.stateType).toBe(stateType);
    });

    it('should return the proxy value', () => {
        expect(g.middleware[0]()).toBe(middleware[0]());
    });
});
