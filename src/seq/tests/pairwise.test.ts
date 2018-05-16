import { pairwise } from '../pairwise'

test("no items", () => expect(Array.from(pairwise([1]))).toEqual(expect.arrayContaining([])));
test("one items", () => expect(Array.from(pairwise([1]))).toEqual(expect.arrayContaining([])));
test("two items", () => expect(Array.from(pairwise([1, 2]))).toEqual(expect.arrayContaining([[1, 2]])));
test("many items", () => expect(Array.from(pairwise([1, 2, 3, 4]))).toEqual(expect.arrayContaining([[1, 2], [2, 3], [3, 4]])));