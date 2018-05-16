import { truncate } from '../truncate'

test("of three, take 0", () => expect(Array.from(truncate([1, 2, 3], 0))).toEqual(expect.arrayContaining([])));
test("of three, take 1", () => expect(Array.from(truncate([1, 2, 3], 1))).toEqual(expect.arrayContaining([1])));
test("of three, take 2", () => expect(Array.from(truncate([1, 2, 3], 2))).toEqual(expect.arrayContaining([1, 2])));
test("of three, take 3", () => expect(Array.from(truncate([1, 2, 3], 3))).toEqual(expect.arrayContaining([1, 2, 3])));
test("of three, take 4", () => expect(Array.from(truncate([1, 2, 3], 4))).toEqual(expect.arrayContaining([1, 2, 3])));

test("of none, take 0", () => expect(Array.from(truncate([], 0))).toEqual(expect.arrayContaining([])));
test("of none, take 1", () => expect(Array.from(truncate([], 1))).toEqual(expect.arrayContaining([])));
