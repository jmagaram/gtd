import { take } from '../take'

test("0 from 3", () => expect(Array.from(take([1, 2, 3], 0))).toEqual(expect.arrayContaining([])));
test("1 from 3", () => expect(Array.from(take([1, 2, 3], 1))).toEqual(expect.arrayContaining([1])));
test("2 from 3", () => expect(Array.from(take([1, 2, 3], 2))).toEqual(expect.arrayContaining([1, 2])));
test("3 from 3", () => expect(Array.from(take([1, 2, 3], 3))).toEqual(expect.arrayContaining([1, 2, 3])));
test("0 from 0", () => expect(Array.from(take([], 0))).toEqual(expect.arrayContaining([])));

function* repeat(n: number) {
    while (true) {
        yield n;
    }
}

test("take 0 from forever", () => expect(Array.from(take(repeat(1), 0))).toEqual(expect.arrayContaining([])));
test("take 1 from forever", () => expect(Array.from(take(repeat(1), 1))).toEqual(expect.arrayContaining([1])));
test("take 2 from forever", () => expect(Array.from(take(repeat(1), 2))).toEqual(expect.arrayContaining([1, 1])));
test("take 3 from forever", () => expect(Array.from(take(repeat(1), 3))).toEqual(expect.arrayContaining([1, 1, 1])));

test("4 from 3", () => expect(() => Array.from(take([1, 2, 3], 4))).toThrowError());
test("1 from 0", () => expect(() => Array.from(take([], 1))).toThrowError());

test("can take repeatedly and get same result", () => {
    const x = take([1, 2, 3], 3);
    const array1 = Array.from(x);
    const array2 = Array.from(x);
    expect(array1.length).toBe(array2.length);
});