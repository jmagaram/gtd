import { reduce } from '../reduce'

const addTwo = (a: number, b: number) => a + b;
test("zero items", () => expect(reduce<number>([], addTwo)).toBeUndefined());
test("one item", () => expect(reduce([1], addTwo)).toBe(1));
test("many items", () => expect(reduce([1, 2, 3], addTwo)).toBe(6));

