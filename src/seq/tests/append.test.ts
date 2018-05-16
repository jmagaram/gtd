import { append } from '../append'

test("append 0-0", () => expect(Array.from(append([], []))).toEqual(expect.arrayContaining([])));
test("append 0-1", () => expect(Array.from(append([], [1]))).toEqual(expect.arrayContaining([1])));
test("append 0-2", () => expect(Array.from(append([], [1, 2]))).toEqual(expect.arrayContaining([1, 2])));
test("append 1-0", () => expect(Array.from(append([1], []))).toEqual(expect.arrayContaining([1])));
test("append 1-1", () => expect(Array.from(append([1], [2]))).toEqual(expect.arrayContaining([1, 2])));
test("append 1-2", () => expect(Array.from(append([1], [2, 3]))).toEqual(expect.arrayContaining([1, 2, 3])));
test("append 2-2", () => expect(Array.from(append([1, 2], [3, 4]))).toEqual(expect.arrayContaining([1, 2, 3, 4])));




