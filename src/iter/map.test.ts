import { map } from './map'

test("map", () => expect(Array.from(map([1, 2, 3], i => i * 2))).toEqual(expect.arrayContaining([2, 4, 6])));
test("can enumerate results more than once", () => {
    const x = map([1, 2, 3], i => i);
    const array1 = Array.from(x);
    const array2 = Array.from(x);
    expect(array1.length).toBe(array2.length);
});