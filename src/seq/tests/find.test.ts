import { find } from '../find'

test("zero items, false predicate", () => expect(find([], i => false)).toBeUndefined());
test("zero items, true predicate", () => expect(find([], i => true)).toBeUndefined());

test("many items, found unique ", () => expect(find(["a", "b", "c", "d"], i => i === "c")).toBe("c"));
test("many items, found first ", () => expect(find(["a", "c", "b", "c", "d"], i => i === "c")).toBe("c"));
test("many items, found none ", () => expect(find(["a", "c", "b", "c", "d"], i => i === "z")).toBeUndefined());
