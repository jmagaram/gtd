import { partial } from './partial'

type AddThreeNumbersArgs = {
    a: number;
    b: number;
    c: number;
}

function addThreeNumbers(args: AddThreeNumbersArgs) {
    return args.a + args.b + args.c;
}

test("fix zero parameters", () => {
    let f = partial(addThreeNumbers, {});
    let result = f({ a: 1, b: 10, c: 100 });
    expect(result).toBe(111);
});


test("fix one parameter", () => {
    let f = partial(addThreeNumbers, { c: 100 });
    let result = f({ a: 1, b: 10 });
    expect(result).toBe(111);
});

test("fix two parameters", () => {
    let f = partial(addThreeNumbers, { b: 10, c: 100 });
    let result = f({ a: 1 });
    expect(result).toBe(111);
});

test("fix all parameters, no parameter needed at all", () => {
    let f = partial(addThreeNumbers, { a: 1, b: 10, c: 100 });
    let result = f();
    expect(result).toBe(111);
});