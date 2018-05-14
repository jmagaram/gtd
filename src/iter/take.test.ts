import { take } from './take'

test("0 from 3", () => expect(Array.from(take({ source: [1, 2, 3], count: 0 }))).toEqual(expect.arrayContaining([])));
test("1 from 3", () => expect(Array.from(take({ source: [1, 2, 3], count: 1 }))).toEqual(expect.arrayContaining([1])));
test("2 from 3", () => expect(Array.from(take({ source: [1, 2, 3], count: 2 }))).toEqual(expect.arrayContaining([1, 2])));
test("3 from 3", () => expect(Array.from(take({ source: [1, 2, 3], count: 3 }))).toEqual(expect.arrayContaining([1, 2, 3])));
test("0 from 0", () => expect(Array.from(take({ source: [], count: 0 }))).toEqual(expect.arrayContaining([])));

function* repeat(n: number) {
    while (true) {
        yield n;
    }
}

test("take 0 from forever", () => expect(Array.from(take({ source: repeat(1), count: 0 }))).toEqual(expect.arrayContaining([])));
test("take 1 from forever", () => expect(Array.from(take({ source: repeat(1), count: 1 }))).toEqual(expect.arrayContaining([1])));
test("take 2 from forever", () => expect(Array.from(take({ source: repeat(1), count: 2 }))).toEqual(expect.arrayContaining([1, 1])));
test("take 3 from forever", () => expect(Array.from(take({ source: repeat(1), count: 3 }))).toEqual(expect.arrayContaining([1, 1, 1])));

test("4 from 3", () => expect(() => Array.from(take({ source: [1, 2, 3], count: 4 }))).toThrowError());
test("1 from 0", () => expect(() => Array.from(take({ source: [], count: 1 }))).toThrowError());

test("can take repeatedly and get same result", () => {
    const x = take({ source: [1, 2, 3], count: 3 });
    const array1 = Array.from(x);
    const array2 = Array.from(x);
    expect(array1.length).toBe(array2.length);
});