import * as Linq from './iter';
import { pipe } from './pipe';

describe("map", () => {
    test("map", () => expect(Array.from(Linq.map([1, 2, 3], i => i * 2))).toEqual(expect.arrayContaining([2, 4, 6])));
    test("can enumerate results more than once", () => {
        const x = Linq.map([1, 2, 3], i => i);
        const array1 = Array.from(x);
        const array2 = Array.from(x);
        expect(array1.length).toBe(array2.length);
    });
});

describe("init", () => {
    test("init", () => expect(Array.from(Linq.init({ count: 5 }))).toEqual(expect.arrayContaining([0, 1, 2, 3, 4])));
    test("can interate multiple times", () => {
        const x = Linq.init({ count: 10 });
        const array1 = Array.from(x);
        const array2 = Array.from(x);
        expect(array1.length).toBe(array2.length);
    });
});

describe("filter", () => {
    test("filter", () => expect(Array.from(Linq.filter([1, 2, 3, 4], i => (i !== 2)))).toEqual(expect.arrayContaining([1, 3, 4])));
    test("can enumerate filter results more than once", () => {
        const r = Linq.filter([1, 2, 3], i => true);
        const array1 = Array.from(r);
        const array2 = Array.from(r);
        expect(array1.length).toBe(array2.length);
    });
});

describe("reduce", () => {
    const addTwo = (a: number, b: number) => a + b;
    test("zero items", () => expect(Linq.reduce<number>([], addTwo)).toBeUndefined());
    test("one item", () => expect(Linq.reduce([1], addTwo)).toBe(1));
    test("many items", () => expect(Linq.reduce([1, 2, 3], addTwo)).toBe(6));
})

describe("length", () => {
    test("zero items", () => expect(Linq.length([])).toBe(0));
    test("one item", () => expect(Linq.length(["a"])).toBe(1));
    test("many items", () => expect(Linq.length(["a", "b", "c"])).toBe(3));
})

describe("take", () => {
    test("0 from 3", () => expect(Array.from(Linq.take({ source: [1, 2, 3], count: 0 }))).toEqual(expect.arrayContaining([])));
    test("1 from 3", () => expect(Array.from(Linq.take({ source: [1, 2, 3], count: 1 }))).toEqual(expect.arrayContaining([1])));
    test("2 from 3", () => expect(Array.from(Linq.take({ source: [1, 2, 3], count: 2 }))).toEqual(expect.arrayContaining([1, 2])));
    test("3 from 3", () => expect(Array.from(Linq.take({ source: [1, 2, 3], count: 3 }))).toEqual(expect.arrayContaining([1, 2, 3])));
    test("0 from 0", () => expect(Array.from(Linq.take({ source: [], count: 0 }))).toEqual(expect.arrayContaining([])));

    function* repeat(n: number) {
        while (true) {
            yield n;
        }
    }

    test("take 0 from forever", () => expect(Array.from(Linq.take({ source: repeat(1), count: 0 }))).toEqual(expect.arrayContaining([])));
    test("take 1 from forever", () => expect(Array.from(Linq.take({ source: repeat(1), count: 1 }))).toEqual(expect.arrayContaining([1])));
    test("take 2 from forever", () => expect(Array.from(Linq.take({ source: repeat(1), count: 2 }))).toEqual(expect.arrayContaining([1, 1])));
    test("take 3 from forever", () => expect(Array.from(Linq.take({ source: repeat(1), count: 3 }))).toEqual(expect.arrayContaining([1, 1, 1])));

    test("4 from 3", () => expect(() => Array.from(Linq.take({ source: [1, 2, 3], count: 4 }))).toThrowError());
    test("1 from 0", () => expect(() => Array.from(Linq.take({ source: [], count: 1 }))).toThrowError());

    test("can take repeatedly and get same result", () => {
        const x = Linq.take({ source: [1, 2, 3], count: 3 });
        const array1 = Array.from(x);
        const array2 = Array.from(x);
        expect(array1.length).toBe(array2.length);
    });
})

describe("fold", () => {
    const concatTwo = (a: string, b: string) => `${a}${b}`;
    test("zero items", () => expect(Linq.fold([], "z", concatTwo)).toBe("z"));
    test("one item", () => expect(Linq.fold(["a"], "z", concatTwo)).toBe("za"));
    test("many items", () => expect(Linq.fold(["a", "b", "c", "d"], "z", concatTwo)).toBe("zabcd"));
})

describe("unfold", () => {
    const oneToTen = () => Linq.unfold<number, number>({ seed: 1, generator: (i) => (i <= 10) ? [i, i + 1] : undefined });
    test("unfold simple sequence 1 to 10", () => expect(Linq.length(oneToTen())).toBe(10));

    class FibonacciState {
        constructor(readonly n1: number, readonly n2: number) { }
        public readonly shift = () => new FibonacciState(this.n2, this.n1 + this.n2);
    }

    // can fix everything by making this a function, but why?
    const fibonacci = Linq.unfold({
        seed: new FibonacciState(0, 1),
        generator: i => i.n1 > 10000 ? undefined : [i.n1, i.shift()]
    });

    test("fib1", () => expect(Array.from(Linq.take({ source: fibonacci, count: 1 }))).toEqual(expect.arrayContaining([0])));
    test("fib2", () => expect(Array.from(Linq.take({ source: fibonacci, count: 2 }))).toEqual(expect.arrayContaining([0, 1])));
    test("fib3", () => expect(Array.from(Linq.take({ source: fibonacci, count: 3 }))).toEqual(expect.arrayContaining([0, 1, 1])));
    test("fib4", () => expect(Array.from(Linq.take({ source: fibonacci, count: 4 }))).toEqual(expect.arrayContaining([0, 1, 1, 2])));
    test("fib5", () => expect(Array.from(Linq.take({ source: fibonacci, count: 5 }))).toEqual(expect.arrayContaining([0, 1, 1, 2])));
    test("fib6", () => expect(Array.from(Linq.take({ source: fibonacci, count: 6 }))).toEqual(expect.arrayContaining([0, 1, 1, 2, 3])));
    test("fib7", () => expect(Array.from(Linq.take({ source: fibonacci, count: 6 }))).toEqual(expect.arrayContaining([0, 1, 1, 2, 3, 5])));
});

test("toSet", () => {
    const result = pipe(
        () => [1, 2, 3, 4, 2, 4, 5, 3],
        Linq.toSet,
        Linq.toArray);
    expect(result).toEqual([1, 2, 3, 4, 5]);
})

test("map", () => {
    const result = Linq.toMap([1, 2, 3], i => [i, i.toString()]);
    expect(result.size).toBe(3);
    expect(result.get(1)).toBe("1");
    expect(result.get(2)).toBe("2");
    expect(result.get(3)).toBe("3");
})