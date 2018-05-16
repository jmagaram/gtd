import { none } from '../none'

test("zero items, with predicate, is always true", () => expect(none([], i => true)).toBe(true));
test("many items, with predicate, with no match, return true", () => expect(none([1, 2, 3], i => i === 9)).toBe(true));
test("many items, with predicate, with some match, return false", () => expect(none([1, 2, 3], i => i === 2)).toBe(false));

test("zero items, with NO predicate, return true", () => expect(none([])).toBe(true));
test("many items, with NO predicate, return true", () => expect(none([1, 2, 3])).toBe(false));
