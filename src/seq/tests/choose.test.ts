import { choose } from '../choose'

test("return items where chooser does not return undefined", () =>
    expect(Array.from(choose([1, 2, 3, 4], i => (i % 2 === 0) ? i.toString() : undefined))).toEqual(expect.arrayContaining(["2", "4"])));

