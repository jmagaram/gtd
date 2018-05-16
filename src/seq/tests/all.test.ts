import { all } from '../all'

test("zero items with always true predicate, return true", () => expect(all([], i => true)).toBeTruthy());
test("zero items with always false predicate, return true", () => expect(all([], i => false)).toBeTruthy());

test("many items where each satisfies predicate, return true", () => expect(all([1, 2, 3], i => i !== 9)).toBeTruthy());
test("many items where at least one does not satisfy predicate, return false", () => expect(all([1, 2, 9, 3], i => i !== 9)).toBeFalsy());
