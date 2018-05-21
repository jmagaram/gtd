import { pipe } from '../../utility/pipe'
import { filter, filter_ } from '../filter'

test("filter", () => expect(Array.from(filter([1, 2, 3, 4], i => (i !== 2)))).toEqual(expect.arrayContaining([1, 3, 4])));

test("can enumerate filter results more than once", () => {
    const r = filter([1, 2, 3], i => true);
    const array1 = Array.from(r);
    const array2 = Array.from(r);
    expect(array1.length).toBe(array2.length);
});

test("using curried version", () => {
    const result = pipe(
        () => [1, 2, 3, 4, 5, 6, 7, 8],
        filter_(j => j % 2 === 0),
        filter_(j => j > 3),
        i => Array.from(i)
    )();
    expect(result).toEqual(expect.arrayContaining([4, 6, 8]));
});