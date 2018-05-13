import { pipe } from './pipe';
import * as Linq from './linq';

test("map", () => expect(Array.from(Linq.map([1, 2, 3], i => i * 2))).toEqual(expect.arrayContaining([2, 4, 6])));

test("range", () => expect(Array.from(Linq.range({ from: 10, to: 12 }))).toEqual(expect.arrayContaining([10, 11, 12])));

test("filter", () => expect(Array.from(Linq.filter([1, 2, 3, 4], i => i != 2))).toEqual(expect.arrayContaining([1, 3, 4])));

describe("reduce", () => {
    test("zero items", () => expect(Linq.reduce<number>([], (i, j) => i + j)).toBeUndefined());
    test("one item", () => expect(Linq.reduce([1], (i, j) => i + j)).toBe(1));
    test("many items", () => expect(Linq.reduce([1, 2, 3], (i, j) => i + j)).toBe(6));
})

test("toSet", () => {
    let result = pipe(
        () => [1, 2, 3, 4, 2, 4, 5, 3],
        Linq.toSet,
        Linq.toArray);
    expect(result).toEqual([1, 2, 3, 4, 5]);
})