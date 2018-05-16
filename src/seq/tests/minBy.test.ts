import { minBy } from '../minBy'

test("zero items", () => expect(minBy([], i => i)).toBeUndefined());
test("one items", () => expect(minBy([1], i => false)).toBe(1));
test("many items, first is it", () => expect(minBy([3, 1, 2], i => -i)).toBe(3));
test("many items, second is it", () => expect(minBy([1, 3, 2], i => -i)).toBe(3));
test("many items, last is it", () => expect(minBy([1, 2, 3], i => -i)).toBe(3));
