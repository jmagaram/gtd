import { maxBy } from '../maxBy'

test("zero items", () => expect(maxBy([], i => i)).toBeUndefined());
test("one items", () => expect(maxBy([1], i => false)).toBe(1));
test("many items, first is it", () => expect(maxBy([-3, -1, -2], i => -i)).toBe(-3));
test("many items, second is it", () => expect(maxBy([-1, -3, -2], i => -i)).toBe(-3));
test("many items, last is it", () => expect(maxBy([-1, -2, -3], i => -i)).toBe(-3));
