import { partial } from '../partial'

interface AddThreeNumbersArgs {
    a: number;
    b: number;
    c: number;
}

function addThreeNumbers(args: AddThreeNumbersArgs) {
    return args.a + args.b + args.c;
}

test("fix zero parameters", () => {
    const f = partial(addThreeNumbers, {});
    const result = f({ a: 1, b: 10, c: 100 });
    expect(result).toBe(111);
});


test("fix one parameter", () => {
    const f = partial(addThreeNumbers, { c: 100 });
    const result = f({ a: 1, b: 10 });
    expect(result).toBe(111);
});

test("fix two parameters", () => {
    const f = partial(addThreeNumbers, { b: 10, c: 100 });
    const result = f({ a: 1 });
    expect(result).toBe(111);
});

test("fix all parameters, no parameter needed at all", () => {
    const f = partial(addThreeNumbers, { a: 1, b: 10, c: 100 });
    const result = f();
    expect(result).toBe(111);
});