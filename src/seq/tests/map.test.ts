import { pipe } from '../../utility/pipe'
import { map, map_ } from '../map'

test("map", () => expect(Array.from(map([1, 2, 3], i => i * 2))).toEqual(expect.arrayContaining([2, 4, 6])));

test("can enumerate results more than once", () => {
    const x = map([1, 2, 3], i => i);
    const array1 = Array.from(x);
    const array2 = Array.from(x);
    expect(array1.length).toBe(array2.length);
});

test("using curried version", () => {
    const result = pipe(
        () => [1, 2, 3, 4, 5],
        map_(j => j + 1),
        map_(j => j * 2),
        i => Array.from(i)
    )();
    expect(result).toEqual(expect.arrayContaining([4, 6, 8, 10, 12]));
});