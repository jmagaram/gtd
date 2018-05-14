import { filter } from './filter'

test("filter", () => expect(Array.from(filter([1, 2, 3, 4], i => (i !== 2)))).toEqual(expect.arrayContaining([1, 3, 4])));

test("can enumerate filter results more than once", () => {
    const r = filter([1, 2, 3], i => true);
    const array1 = Array.from(r);
    const array2 = Array.from(r);
    expect(array1.length).toBe(array2.length);
});

