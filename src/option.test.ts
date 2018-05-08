import * as Option from './option'

describe("some", () => {
    test("when null, throw", () => expect(() => Option.some<any>(null)).toThrow());
    test("when undefined, throw", () => expect(() => Option.some<any>(undefined)).toThrow());
    test("when some, return value", () => expect(Option.some<string>("x")).toBe("x"));
});

describe("none", () => {
    test("returns undefined when string", () => expect(Option.none<string>()).toBeUndefined());
    test("returns undefined when number", () => expect(Option.none<number>()).toBeUndefined());
});

describe("create", () => {
    test("when null, return undefined.", () => expect(Option.create<any>(null)).toBeUndefined());
    test("when undefined, return undefined.", () => expect(Option.create<any>(undefined)).toBeUndefined());
    test("when some, return value.", () => expect(Option.create<string>("a")).toBe("a"));
});

describe("reduce", () => {
    test("when undefined, return alternate value.", () => expect(Option.reduce<string>(undefined, "x")).toBe("x"));
    test("when null, return alternate value.", () => expect(Option.reduce<any>(null, "x")).toBe("x"));
    test("when some, return actual value.", () => expect(Option.reduce<string>("a", "x")).toBe("a"));
});

describe("reduceOrThrow", () => {
    test("when undefined, throw", () => expect(() => Option.reduceOrThrow<string>(undefined, "x")).toThrow());
    test("when null, throw", () => expect(() => Option.reduceOrThrow<any>(null, "x")).toThrow());
    test("when some, return value.", () => expect(Option.reduceOrThrow<string>("a", "x")).toBe("a"));
});

describe("reduceLazy", () => {
    test("when undefined, return alternate value from function.", () => {
        const returnX = jest.fn(() => "x");
        expect(Option.reduceLazy<string>(undefined, returnX)).toBe("x");
        expect(returnX.mock.calls.length).toBe(1);
    });

    test("when null, return alternate value from function.", () => {
        const returnX = jest.fn(() => "x");
        expect(Option.reduceLazy<any>(null, returnX)).toBe("x");
        expect(returnX.mock.calls.length).toBe(1);
    });  

    test("when some, return actual value without executing function.", () => {
        const returnX = jest.fn(() => "x");
        expect(Option.reduceLazy<string>("a", returnX)).toBe("a");
        expect(returnX.mock.calls.length).toBe(0);
    });
});

describe("map", () => {
    test("when some, return mapped value.", () => expect(Option.map<string, number>("a", i => i === "a" ? 100 : -1)).toBe(100));
    test("when undefined, return undefined without executing function.", () => {
        const returnNumber = jest.fn(i => 1);
        expect(Option.map<string, number>(undefined, returnNumber)).toBeUndefined();
        expect(returnNumber.mock.calls.length).toBe(0);
    });
    test("when null, return undefined without executing function.", () => {
        const returnNumber = jest.fn(i => 1);
        expect(Option.map<string, number>(null, returnNumber)).toBeUndefined();
        expect(returnNumber.mock.calls.length).toBe(0);
    });    
});