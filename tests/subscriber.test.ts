import subscriber from '../src/models/subscriber';

// eslint-disable-next-line no-undef
describe('Subscriber', () => {
    const key = 'bar';
    const id = 1;
    const s = subscriber(key);
    it('should return the subscriber key', () => {
        expect(s.getKey()).toBe(key);
    });

    it('should set the key amd return value', () => {
        s.setId(id);
        expect(s.getId()).toBe(id);
    });
});