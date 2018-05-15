import { init } from '../init'

test("init", () => expect(Array.from(init(5))).toEqual(expect.arrayContaining([0, 1, 2, 3, 4])));

test("can interate multiple times", () => {
    const x = init(10);
    const array1 = Array.from(x);
    const array2 = Array.from(x);
    expect(array1.length).toBe(array2.length);
});