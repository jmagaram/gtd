import * as Option from '../option'

describe("some", () => {
    test("when null, throw", () => expect(() => Option.some<any>(null)).toThrow());
    test("when undefined, throw", () => expect(() => Option.some<any>(undefined)).toThrow());
    test("when some, return value", () => expect(Option.some<string>("x")).toBe("x"));
});

describe("none", () => {
    test("is same as undefined", () => expect(Option.none).toBeUndefined());
});

describe("create", () => {
    test("when null, return undefined.", () => expect(Option.create<string | null>(null)).toBeUndefined());
    test("when undefined, return undefined.", () => expect(Option.create<string | undefined>(undefined)).toBeUndefined());
    test("when some, return value.", () => expect(Option.create<string>("a")).toBe("a"));
});

describe("reduce", () => {
    test("when undefined, return alternate value.", () => expect(Option.reduce<string | undefined>(undefined, "x")).toBe("x"));
    test("when null, return alternate value.", () => expect(Option.reduce<string | null>(null, "x")).toBe("x"));
    test("when some, return actual value.", () => expect(Option.reduce<string>("a", "x")).toBe("a"));
});

describe("reduceOrThrow", () => {
    test("when undefined, throw", () => expect(() => Option.reduceOrThrow<string | undefined>(undefined)).toThrow());
    test("when null, throw", () => expect(() => Option.reduceOrThrow<string | null>(null)).toThrow());
    test("when some, return value.", () => expect(Option.reduceOrThrow<string>("a")).toBe("a"));
});

describe("reduceLazy", () => {
    test("when undefined, return alternate value from function.", () => {
        const returnX = jest.fn(() => "x");
        expect(Option.reduceLazy<string | undefined>(undefined, returnX)).toBe("x");
        expect(returnX.mock.calls.length).toBe(1);
    });

    test("when null, return alternate value from function.", () => {
        const returnX = jest.fn(() => "x");
        expect(Option.reduceLazy<string | null>(null, returnX)).toBe("x");
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
        const some = Option.some("x");
        const result = Option.filter(some, i => i === "x");
        expect(result).toBe(some);
    });
    test("when some and predicate false, return undefined", () => {
        const some = Option.some("x");
        const result = Option.filter(some, i => i === "y");
        expect(result).toBeUndefined();
    });
    test("when none, return undefined", () => expect(Option.filter<string | undefined>(undefined, i => true)).toBeUndefined());
    test("when none, do not evaluate predicate", () => {
        const predicate = jest.fn((i: string) => true);
        const source: Option.T<string> = Option.none;
        Option.filter(source, predicate);
        expect(predicate.mock.calls.length).toBe(0);
    });

    test("curry when predicate matches", () => expect(Option.filter_<string>(i => i === "x")("x")).toBe("x"));
    test("curry when predicate fails", () => expect(Option.filter_<string>(i => i === "x")("y")).toBeUndefined());
});

describe("map", () => {
    test("when some, return mapped value.", () => expect(Option.map<string, number>("a", i => i === "a" ? 100 : -1)).toBe(100));
    test("when undefined, return undefined without executing function.", () => {
        const returnNumber = jest.fn(i => 1);
        expect(Option.map<number | undefined, number>(undefined, returnNumber)).toBeUndefined();
        expect(returnNumber.mock.calls.length).toBe(0);
    });
    test("when null, return undefined without executing function.", () => {
        const returnNumber = jest.fn(i => 1);
        expect(Option.map<number | null, number>(null, returnNumber)).toBeUndefined();
        expect(returnNumber.mock.calls.length).toBe(0);
    });
    test("curry when not undefined", () => expect(Option.map_<number, number>(i => i * i)(3)).toBe(9));
    test("curry when undefined", () => expect(Option.map_<number | undefined, number>(i => i * i)(undefined)).toBeUndefined());
});

describe("mapOption", () => {
    test("when some, return mapped value flattened.", () => expect(Option.mapOption<string, number>("a", i => Option.create((i === "a") ? 100 : -1))).toBe(100));
    test("when undefined, return undefined without executing function.", () => {
        const returnNumber = jest.fn((i: string) => Option.create(1));
        expect(Option.mapOption<number | undefined, number>(undefined, returnNumber)).toBeUndefined();
        expect(returnNumber.mock.calls.length).toBe(0);
    });
    test("when null, return undefined without executing function.", () => {
        const returnNumber = jest.fn((i: (number | null)) => Option.create(1));
        expect(Option.mapOption<number | null, number>(null, returnNumber)).toBeUndefined();
        expect(returnNumber.mock.calls.length).toBe(0);
    });
});