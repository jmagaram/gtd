import { zip2, zip3, zip4 } from '../zip'

test("3-3", () => expect(Array.from(zip2([1, 2, 3], ["a", "b", "c"])))
    .toEqual(expect.arrayContaining([[1, "a"], [2, "b"], [3, "c"]])));
test("2-3", () => expect(Array.from(zip2([1, 2], ["a", "b", "c"])))
    .toEqual(expect.arrayContaining([[1, "a"], [2, "b"], [undefined, "c"]])));
test("3-2", () => expect(Array.from(zip2([1, 2, 3], ["a", "b"])))
    .toEqual(expect.arrayContaining([[1, "a"], [2, "b"], [3, undefined]])));
test("1-1", () => expect(Array.from(zip2([1], ["a"])))
    .toEqual(expect.arrayContaining([[1, "a"]])));
test("0-0", () => expect(Array.from(zip2([], [])))
    .toEqual(expect.arrayContaining([])));

test("2-2-2", () => expect(Array.from(zip3([1, 2, 3], ["a", "b", "c"], [true, false, true])))
    .toEqual(expect.arrayContaining([[1, "a", true], [2, "b", false], [3, "c", true]])));

test("2-2-2-2", () => expect(Array.from(zip4([1, 2, 3], ["a", "b", "c"], [true, false, true], [7, 8, 9])))
    .toEqual(expect.arrayContaining([[1, "a", true, 7], [2, "b", false, 8], [3, "c", true, 9]])));
