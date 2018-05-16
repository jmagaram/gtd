import { skipWhile } from '../skipWhile'

test("many items, skip first", () => expect(Array.from(skipWhile([1, 2, 3], i => i <= 1))).toEqual(expect.arrayContaining([2, 3])));
test("many items, skip first two", () => expect(Array.from(skipWhile([1, 2, 3], i => i <= 2))).toEqual(expect.arrayContaining([3])));
test("many items, skip all", () => expect(Array.from(skipWhile([1, 2, 3], i => i <= 3))).toEqual(expect.arrayContaining([])));

test("no items, predicate false, skip all", () => expect(Array.from(skipWhile([], i => false))).toEqual(expect.arrayContaining([])));
test("no items, prediacte true, skip all", () => expect(Array.from(skipWhile([], i => true))).toEqual(expect.arrayContaining([])));
