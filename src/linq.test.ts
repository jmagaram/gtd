import { pipe } from './pipe';
import * as Linq from './linq';

test("map", () => expect(Array.from(Linq.map([1, 2, 3], i => i * 2))).toEqual(expect.arrayContaining([2, 4, 6])));

test("range", () => expect(Array.from(Linq.range({ from: 10, to: 12 }))).toEqual(expect.arrayContaining([10, 11, 12])));

test("filter", () => expect(Array.from(Linq.filter([1, 2, 3, 4], i => (i != 2)))).toEqual(expect.arrayContaining([1, 3, 4])));

describe("reduce", () => {
    let addTwo = (a: number, b: number) => a + b;
    test("zero items", () => expect(Linq.reduce<number>([], addTwo)).toBeUndefined());
    test("one item", () => expect(Linq.reduce([1], addTwo)).toBe(1));
    test("many items", () => expect(Linq.reduce([1, 2, 3], addTwo)).toBe(6));
})

describe("length", () => {
    test("zero items", () => expect(Linq.length([])).toBe(0));
    test("one item", () => expect(Linq.length(["a"])).toBe(1));
    test("many items", () => expect(Linq.length(["a", "b", "c"])).toBe(3));
})

describe("fold", () => {
    let concatTwo = (a: string, b: string) => `${a}${b}`;
    test("zero items", () => expect(Linq.fold([], "z", concatTwo)).toBe("z"));
    test("one item", () => expect(Linq.fold(["a"], "z", concatTwo)).toBe("za"));
    test("many items", () => expect(Linq.fold(["a", "b", "c", "d"], "z", concatTwo)).toBe("zabcd"));
})

test("toSet", () => {
    let result = pipe(
        () => [1, 2, 3, 4, 2, 4, 5, 3],
        Linq.toSet,
        Linq.toArray);
    expect(result).toEqual([1, 2, 3, 4, 5]);
})

test("map", () => {
    let result = Linq.toMap([1, 2, 3], i => [i, i.toString()]);
    expect(result.size).toBe(3);
    expect(result.get(1)).toBe("1");
    expect(result.get(2)).toBe("2");
    expect(result.get(3)).toBe("3");
})