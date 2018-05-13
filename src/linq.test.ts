import { pipe } from './pipe';
import * as Linq from './linq';

test("map", () => expect(Array.from(Linq.map(i => i * 2, [1, 2, 3]))).toEqual(expect.arrayContaining([2, 4, 6])));

test("range", () => expect(Array.from(Linq.range({ from: 10, to: 12 }))).toEqual(expect.arrayContaining([10, 11, 12])));

test("filter", () => expect(Array.from(Linq.filter(i => i != 2, [1, 2, 3, 4]))).toEqual(expect.arrayContaining([1, 3, 4])));

describe("reduce", () => {
    let addTwo = (a: number, b: number) => a + b;
    test("zero items", () => expect(Linq.reduce<number>(addTwo, [])).toBeUndefined());
    test("one item", () => expect(Linq.reduce(addTwo, [1])).toBe(1));
    test("many items", () => expect(Linq.reduce(addTwo, [1, 2, 3])).toBe(6));
})

describe("length", () => {
    test("zero items", () => expect(Linq.length([])).toBe(0));
    test("one item", () => expect(Linq.length(["a"])).toBe(1));
    test("many items", () => expect(Linq.length(["a", "b", "c"])).toBe(3));
})

describe("fold", () => {
    let concatTwo = (a: string, b: string) => `${a}${b}`;
    test("zero items", () => expect(Linq.fold("z", concatTwo, [])).toBe("z"));
    test("one item", () => expect(Linq.fold("z", concatTwo, ["a"])).toBe("za"));
    test("many items", () => expect(Linq.fold("z", concatTwo, ["a", "b", "c", "d"])).toBe("zabcd"));
})

test("toSet", () => {
    let result = pipe(
        () => [1, 2, 3, 4, 2, 4, 5, 3],
        Linq.toSet,
        Linq.toArray);
    expect(result).toEqual([1, 2, 3, 4, 5]);
})