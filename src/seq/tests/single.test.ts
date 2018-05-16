import { single } from '../single'

test("zero items return undefined", () => expect(single([])).toBeUndefined());
test("one item returns that item", () => expect(single(["a"])).toBe("a"));
test("many items returns undefined", () => expect(single(["a", "b", "c"])).toBeUndefined());