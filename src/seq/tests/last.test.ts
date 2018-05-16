import { last } from '../last'

test("zero items, return undefined", () => expect(last([])).toBeUndefined());
test("one item", () => expect(last(["a"])).toBe("a"));
test("many items", () => expect(last(["a", "b", "c"])).toBe("c"));