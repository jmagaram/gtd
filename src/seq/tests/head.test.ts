import { head } from '../head'

test("zero items return undefined", () => expect(head([])).toBeUndefined());
test("one item returns that item", () => expect(head(["a"])).toBe("a"));
test("many items returns first item", () => expect(head(["a", "b", "c"])).toBe("a"));