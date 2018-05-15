import { length } from '../length'

test("zero items", () => expect(length([])).toBe(0));
test("one item", () => expect(length(["a"])).toBe(1));
test("many items", () => expect(length(["a", "b", "c"])).toBe(3));