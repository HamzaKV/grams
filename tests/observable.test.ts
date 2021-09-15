import observable from '../src/models/observable';

describe('Observable', () => {
    let observed: any = {};
    const value = 'a';

    const obj = observable({
        a: 'foo',
        b: {
            c: 'bar',
            d: {
                e: 'baz'
            }
        }
    }, (_, newValue) => {
        observed = newValue;
    });

    it('should return observable new value', () => {
        obj.a = value;
        expect(observed.a).toBe(value);
    });

    it('should return observable new nested value', () => {
        obj.b.c = value;
        expect(observed.b.c).toBe(value);
    });

    it('should return observable new deeply nested value', () => {
        obj.b.d.e = value;
        expect(observed.b.d.e).toBe(value);
    });
});