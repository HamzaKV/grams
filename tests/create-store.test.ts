import gram from '../src/models/gram';
import createStore from '../src/utils/create-store';

describe('Create a store', () => {
    const defaultValue1 = 'value';
    const actions1 = {
        sum: (v, nV) => 'bar'
    };
    const produce1 = {
        foo: (v) => 'hi'
    };
    const effects1 = {
        onUpdate: () => 1,
    };
    const type1 = typeof defaultValue1;
    const stateType1 = 'state';
    const proxy1 = () => false;
    const g1 = gram(defaultValue1, actions1, produce1, effects1, type1, stateType1, proxy1);

    const defaultValue2 = {
        foo: 'bar'
    };
    const actions2 = {
        sum: (v, nV) => ({
            foo: 'foo'
        })
    };
    const produce2 = {
        foo: (v) => ({
            foo: 'hi'
        })
    };
    const effects2 = {
        onUpdate: () => 1,
    };
    const type2 = typeof defaultValue2;
    const stateType2 = 'state';
    const proxy2 = () => false;
    const g2 = gram(defaultValue2, actions2, produce2, effects2, type2, stateType2, proxy2);

    const defaultValue3 = {
        foo: 'bar'
    };
    const actions3 = {
        sum: (v, nV) => ({
            foo: 'foo'
        })
    };
    const produce3 = {
        foo: (v) => ({
            foo: 'hi'
        })
    };
    const effects3 = {
        onUpdate: () => 1,
    };
    const type3 = 'granular';
    const stateType3 = 'state';
    const proxy3 = () => false;
    const g3 = gram(defaultValue3, actions3, produce3, effects3, type3, stateType3, proxy3);

    const models = {
        modelA: g1,
        modelB: g2,
        modelC: g3,
    };

    const { store, map } = createStore(models);

    it('Should return the value', () => {
        expect(store.modelA.value).toBe(defaultValue1);
    });

    it('Should return the map for value', () => {
        expect(map.has('modelA')).toBe(true);
    });

    it('Should return second value', () => {
        expect(store.modelB.value.foo).toBe(defaultValue2.foo);
    });

    it('Should return the map for second value', () => {
        expect(map.has('modelB')).toBe(true);
    });
});