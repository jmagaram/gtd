import { fold } from './fold'

const concatTwo = (a: string, b: string) => `${a}${b}`;
test("zero items", () => expect(fold([], "z", concatTwo)).toBe("z"));
test("one item", () => expect(fold(["a"], "z", concatTwo)).toBe("za"));
test("many items", () => expect(fold(["a", "b", "c", "d"], "z", concatTwo)).toBe("zabcd"));
