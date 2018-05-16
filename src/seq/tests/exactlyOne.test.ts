import { exactlyOne } from '../exactlyOne'

test("zero items return undefined", () => expect(exactlyOne([])).toBeUndefined());
test("one item returns that item", () => expect(exactlyOne(["a"])).toBe("a"));
test("many items returns undefined", () => expect(exactlyOne(["a", "b", "c"])).toBeUndefined());