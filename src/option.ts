export type T<Value> = Value | undefined;

export function some<Value>(v: Value): T<Value> {
    if (v == null) {
        throw new Error("Null is not a permitted.");
    }
    else if (v === undefined) {
        throw new Error("Undefined is not a permitted.");
    }
    else {
        return v as T<Value>;
    }
}

export const none = undefined;

export function create<Value>(v: Value): T<Value> {
    return (v == null || v === undefined) ? undefined : v;
}

export function reduce<Value>(i: T<Value>, ifNone: Value): Value {
    return (i == null || i === undefined) ? ifNone : i;
}

export function reduceLazy<Value>(i: T<Value>, ifNone: () => Value): Value {
    return (i == null || i === undefined) ? ifNone() : i;
}

export function reduceOrThrow<Value>(i: T<Value>): Value {
    switch (i) {
        case null: throw new Error("Expected a value but it was null instead.");
        case undefined: throw new Error("Expected a value but it was undefined instead.");
        default: return i;
    }
}

export function map<Value, Result>(i: T<Value>, fn: (v: Value) => Result): T<Result> {
    return (i == null || i === undefined) ? undefined : fn(i);
}

export function mapOption<Value, Result>(i: T<Value>, fn: (v: Value) => T<Result>): T<Result> {
    return (i == null || i === undefined) ? undefined : fn(i);
}

export function filter<Value>(source: T<Value>, predicate: (v: Value) => boolean): T<Value> {
    return (source === undefined) ? undefined : predicate(source) ? source : undefined;
}