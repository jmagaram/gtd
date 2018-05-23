import { pipe } from '../../utility/pipe'
import { uniqueBy, uniqueBy_ } from '../uniqueBy'

test("many items see all unique before repeats", () => expect(Array.from(uniqueBy([1, 2, 3, 1, 2, 3], i => i))).toEqual(expect.arrayContaining([1, 2, 3])));
test("just one item", () => expect(Array.from(uniqueBy([1], i => i.toString()))).toEqual(expect.arrayContaining([1])));
test("repeats interspersed", () => expect(Array.from(uniqueBy([1, 1, 2, 2, 1, 3, 3, 2, 1], i => i.toString()))).toEqual(expect.arrayContaining([1, 2, 3])));
test("repeats interspersed, real mapper", () => expect(Array.from(uniqueBy([3, 4, 5, 6, 7, 8, 0, 1, 2], i => i % 4))).toEqual(expect.arrayContaining([3, 4, 5])));
test("empty", () => expect(Array.from(uniqueBy([], i => i))).toEqual(expect.arrayContaining([])));

test("using curried version", () => {
    const result = pipe(
        () => [1, 2, 2, 4, 3, 4, 4, 3, 2, 1],
        uniqueBy_(j => j.toString()),
        i => Array.from(i)
    )();
    expect(result).toEqual(expect.arrayContaining([1, 2, 4, 3]));
});