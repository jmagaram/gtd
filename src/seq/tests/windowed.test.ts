import { windowed } from '../windowed'

test("many items, size 1", () => expect(Array.from(windowed([1, 2, 3, 4], 1))).toEqual(expect.arrayContaining([[1], [2], [3], [4]])));
test("many items, size 2", () => expect(Array.from(windowed([1, 2, 3, 4], 2))).toEqual(expect.arrayContaining([[1, 2], [2, 3], [3, 4]])));
test("many items, size 3", () => expect(Array.from(windowed([1, 2, 3, 4], 3))).toEqual(expect.arrayContaining([[1, 2, 3], [2, 3, 4]])));
test("many items, size 4", () => expect(Array.from(windowed([1, 2, 3, 4], 4))).toEqual(expect.arrayContaining([[1, 2, 3, 4]])));

test("many items, size too big", () => expect(Array.from(windowed([1, 2, 3, 4], 5))).toEqual(expect.arrayContaining([])));
test("one item, size too big", () => expect(Array.from(windowed([1], 2))).toEqual(expect.arrayContaining([])));
test("two items, size too big", () => expect(Array.from(windowed([1, 2], 3))).toEqual(expect.arrayContaining([])));