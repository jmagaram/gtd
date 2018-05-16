import { takeWhile } from '../takeWhile'

test("many items, match first item only", () => expect(Array.from(takeWhile([1, 2, 3], i => i === 1))).toEqual(expect.arrayContaining([1])));
test("many items, match first two", () => expect(Array.from(takeWhile([1, 2, 3], i => i <= 2))).toEqual(expect.arrayContaining([1, 2])));
test("many items, match all", () => expect(Array.from(takeWhile([1, 2, 3], i => i !== 99))).toEqual(expect.arrayContaining([1, 2, 3])));

test("no items, return empty", () => expect(Array.from(takeWhile([], i => true))).toEqual(expect.arrayContaining([])));

test("one items, match first item only", () => expect(Array.from(takeWhile([1], i => i === 1))).toEqual(expect.arrayContaining([1])));
test("one items, match no items", () => expect(Array.from(takeWhile([1], i => i !== 1))).toEqual(expect.arrayContaining([])));
