import { length } from './length'
import { take } from './take'
import { unfold } from './unfold'

const oneToTen = () => unfold<number, number>({ seed: 1, generator: (i) => (i <= 10) ? [i, i + 1] : undefined });
test("unfold simple sequence 1 to 10", () => expect(length(oneToTen())).toBe(10));

class FibonacciState {
    constructor(readonly n1: number, readonly n2: number) { }
    public readonly shift = () => new FibonacciState(this.n2, this.n1 + this.n2);
}

// can fix everything by making this a function, but why?
const fibonacci = unfold({
    seed: new FibonacciState(0, 1),
    generator: i => i.n1 > 10000 ? undefined : [i.n1, i.shift()]
});

test("fib1", () => expect(Array.from(take({ source: fibonacci, count: 1 }))).toEqual(expect.arrayContaining([0])));
test("fib2", () => expect(Array.from(take({ source: fibonacci, count: 2 }))).toEqual(expect.arrayContaining([0, 1])));
test("fib3", () => expect(Array.from(take({ source: fibonacci, count: 3 }))).toEqual(expect.arrayContaining([0, 1, 1])));
test("fib4", () => expect(Array.from(take({ source: fibonacci, count: 4 }))).toEqual(expect.arrayContaining([0, 1, 1, 2])));
test("fib5", () => expect(Array.from(take({ source: fibonacci, count: 5 }))).toEqual(expect.arrayContaining([0, 1, 1, 2])));
test("fib6", () => expect(Array.from(take({ source: fibonacci, count: 6 }))).toEqual(expect.arrayContaining([0, 1, 1, 2, 3])));
test("fib7", () => expect(Array.from(take({ source: fibonacci, count: 6 }))).toEqual(expect.arrayContaining([0, 1, 1, 2, 3, 5])));
