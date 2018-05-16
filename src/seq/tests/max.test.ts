import { max } from '../max'

test("zero items", () => expect(max([])).toBeUndefined());
test("one items", () => expect(max([1])).toBe(1));
test("many items, first is it", () => expect(max([3, 2, 1])).toBe(3));
test("many items, second is it", () => expect(max([1, 3, 2])).toBe(3));
test("many items, last is it", () => expect(max([1, 2, 3])).toBe(3));
