import * as Option from '../option'
import { Maybe } from '../option'

describe("create", () => {
    test("when null, return undefined.", () => expect(Option.create(null)).toBeUndefined());
    test("when undefined, return undefined.", () => expect(Option.create(undefined)).toBeUndefined());
    test("when some, return value.", () => expect(Option.create("a")).toBe("a"));
});

describe("reduce", () => {
    test("when undefined, return alternate value.", () => expect(Option.reduce(undefined, "x")).toBe("x"));
    test("when some, return actual value.", () => expect(Option.reduce("a" as Maybe<string>, "x")).toBe("a"));
});

describe("reduceOrThrow", () => {
    test("when undefined, throw", () => expect(() => Option.reduceOrThrow<string>(undefined)).toThrow());
    test("when some, return value.", () => expect(Option.reduceOrThrow<string>("a" as Maybe<string>)).toBe("a"));
});

describe("reduceLazy", () => {
    test("when undefined, return alternate value from function.", () => {
        const returnX = jest.fn(() => "x");
        expect(Option.reduceLazy<string>(undefined, returnX)).toBe("x");
        expect(returnX.mock.calls.length).toBe(1);
    });

    test("when some, return actual value without executing function.", () => {
        const returnX = jest.fn(() => "x");
        expect(Option.reduceLazy<string>("a", returnX)).toBe("a");
        expect(returnX.mock.calls.length).toBe(0);
    });
});

describe("filter", () => {
    test("when some and predicate true, return same instance", () => {
        const result = Option.filter("x", i => i === "x");
        expect(result).toBe("x");
    });
    test("when some and predicate false, return undefined", () => {
        const result = Option.filter("x" as string, i => i === "y");
        expect(result).toBeUndefined();
    });
    test("when none, return undefined", () => expect(Option.filter<string>(undefined, i => true)).toBeUndefined());
    test("when none, do not evaluate predicate", () => {
        const predicate = jest.fn((i: string) => true);
        Option.filter(undefined, predicate);
        expect(predicate.mock.calls.length).toBe(0);
    });

    test("curry when predicate matches", () => expect(Option.filter_((i: string) => i === "x")("x")).toBe("x"));
    test("curry when predicate fails", () => expect(Option.filter_((i: string) => i === "x")("y")).toBeUndefined());
});

describe("map", () => {
    test("when some, return mapped value.", () => expect(Option.map("a", i => i === "a" ? 100 : -1)).toBe(100));
    test("when undefined, return undefined without executing function.", () => {
        const returnNumber = jest.fn(i => 1);
        expect(Option.map<number, number>(undefined, returnNumber)).toBeUndefined();
        expect(returnNumber.mock.calls.length).toBe(0);
    });
    test("curry when not undefined", () => expect(Option.map_((i: number) => i * i)(3)).toBe(9));
    test("curry when undefined", () => expect(Option.map_((i: number) => i * i)(undefined)).toBeUndefined());
});