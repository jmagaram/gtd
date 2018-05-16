import { any } from '../any'

test("zero items, with predicate, is always false", () => expect(any([], i => true)).toBe(false));
test("many items, with predicate, with match, return true", () => expect(any([1, 2, 3], i => i === 2)).toBe(true));
test("many items, with predicate, with no match, return false", () => expect(any([1, 2, 3], i => i === 9)).toBe(false));

test("zero items, with NO predicate, return false", () => expect(any([])).toBe(false));
test("many items, with NO predicate, return true", () => expect(any([1, 2, 3])).toBe(true));
