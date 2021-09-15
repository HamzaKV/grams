import stateMap from '../src/models/state-map';

describe('State Map', () => {
    const map = stateMap();

    const key = 'key';
    const value = ['value'];
    const empty = undefined;

    it('should return map value', () => {
        map.add(key, value);
        expect(map.get(key)[0]).toBe(value[0]);
    });

    it('should return nothing', () => {
        map.remove(key);
        expect(map.get(key)[0]).toBe(empty);
    });
});