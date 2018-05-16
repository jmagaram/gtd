import { any } from '../any'

test("zero items, with predicate, is always false", () => expect(any([], i => true)).toBeFalsy());
test("many items, with predicate, with match, return true", () => expect(any([1, 2, 3], i => i === 2)).toBeTruthy());
test("many items, with predicate, with no match, return false", () => expect(any([1, 2, 3], i => i === 9)).toBeFalsy());

test("zero items, with NO predicate, return false", () => expect(any([])).toBeFalsy());
test("many items, with NO predicate, return true", () => expect(any([1, 2, 3])).toBeTruthy());
