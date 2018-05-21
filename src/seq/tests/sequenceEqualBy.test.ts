import { sequenceEqualBy } from '../sequenceEqualBy'

test("same 0", () => expect(sequenceEqualBy<number, string>([], [], i => i.toString())).toBe(true));
test("same 1", () => expect(sequenceEqualBy([1], [1], i => i.toString())).toBe(true));
test("same 2", () => expect(sequenceEqualBy([1, 2], [1, 2], i => i.toString())).toBe(true));
test("same 3", () => expect(sequenceEqualBy([1, 2, 3], [1, 2, 3], i => i.toString())).toBe(true));

test("same items, different order", () => expect(sequenceEqualBy([1, 2, 3], [3, 2, 1], i => i.toString())).toBe(false));
test("same items, different order", () => expect(sequenceEqualBy([1, 2], [2, 1], i => i.toString())).toBe(false));
test("different lengths, subset", () => expect(sequenceEqualBy([1, 2], [1, 2, 3], i => i.toString())).toBe(false));
test("different lengths, subset", () => expect(sequenceEqualBy([1, 2, 3], [1], i => i.toString())).toBe(false));
test("different lengths, subset", () => expect(sequenceEqualBy([], [1], i => i.toString())).toBe(false));
test("different lengths, subset", () => expect(sequenceEqualBy([1], [], i => i.toString())).toBe(false));