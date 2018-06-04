import { tuple } from '../tuple'

test("can create 2 item", () => expect(tuple([1, "a"])).toEqual([1, "a"]));
test("can create 3 item", () => expect(tuple([1, "a", false])).toEqual([1, "a", false]));
test("can create 4 item", () => expect(tuple([1, "a", "b", 3])).toEqual([1, "a", "b", 3]));
test("can create 5 item", () => expect(tuple([1, "a", "b", 3, "z"])).toEqual([1, "a", "b", 3, "z"]));