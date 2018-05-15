import { collect } from '../collect'

test("flattens inner sequence", () =>
    expect(Array.from(collect([1, 2, 3], i => [i, i]))).toEqual(expect.arrayContaining([1, 1, 2, 2, 3, 3])));