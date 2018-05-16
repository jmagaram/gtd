import { min } from '../min'

test("zero items", () => expect(min([])).toBeUndefined());
test("one items", () => expect(min([1])).toBe(1));
test("many items, first is it", () => expect(min([3, 2, 1])).toBe(1));
test("many items, second is it", () => expect(min([1, 3, 2])).toBe(1));
test("many items, last is it", () => expect(min([1, 2, 3])).toBe(1));
