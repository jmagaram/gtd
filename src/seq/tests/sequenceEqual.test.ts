import { sequenceEqual } from '../sequenceEqual'

test("same 0", () => expect(sequenceEqual([], [])).toBe(true));
test("same 1", () => expect(sequenceEqual([1], [1])).toBe(true));
test("same 2", () => expect(sequenceEqual([1, 2], [1, 2])).toBe(true));
test("same 3", () => expect(sequenceEqual([1, 2, 3], [1, 2, 3])).toBe(true));

test("same items, different order", () => expect(sequenceEqual([1, 2, 3], [3, 2, 1])).toBe(false));
test("same items, different order", () => expect(sequenceEqual([1, 2], [2, 1])).toBe(false));
test("different lengths, subset", () => expect(sequenceEqual([1, 2], [1, 2, 3])).toBe(false));
test("different lengths, subset", () => expect(sequenceEqual([1, 2, 3], [1])).toBe(false));
test("different lengths, subset", () => expect(sequenceEqual([], [1])).toBe(false));
test("different lengths, subset", () => expect(sequenceEqual([1], [])).toBe(false));