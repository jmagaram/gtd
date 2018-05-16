import { skip } from '../skip'

test("0 from 3", () => expect(Array.from(skip([1, 2, 3], 0))).toEqual(expect.arrayContaining([1, 2, 3])));
test("1 from 3", () => expect(Array.from(skip([1, 2, 3], 1))).toEqual(expect.arrayContaining([2, 3])));
test("2 from 3", () => expect(Array.from(skip([1, 2, 3], 2))).toEqual(expect.arrayContaining([3])));
test("3 from 3", () => expect(Array.from(skip([1, 2, 3], 3))).toEqual(expect.arrayContaining([])));
test("0 from 0", () => expect(Array.from(skip([], 0))).toEqual(expect.arrayContaining([])));

test("4 from 3", () => expect(() => Array.from(skip([1, 2, 3], 4))).toThrowError());
test("1 from 0", () => expect(() => Array.from(skip([], 1))).toThrowError());
