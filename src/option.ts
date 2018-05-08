import { error } from "util";

export type T<Value> = Value | null | undefined;


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

export function none<Value>(): T<Value> {
    return undefined;
}

export function create<Value>(v: Value): T<Value> {
    return (v == null || v === undefined) ? undefined : v;
}

export function reduce<Value>(i: T<Value>, whenNone: Value): Value {
    switch (i) {
        case null: return whenNone;
        case undefined: return whenNone;
        default: return i;
    }
}

export function reduceLazy<Value>(i: T<Value>, whenNone: () => Value): Value {
    switch (i) {
        case null: return whenNone();
        case undefined: return whenNone();
        default: return i;
    }
}

export function reduceOrThrow<Value>(i: T<Value>, whenNone: Value): Value {
    switch (i) {
        case null: throw new Error("Expected a value but it was null instead.");
        case undefined: throw new Error("Expected a value but it was undefined instead.");
        default: return i;
    }
}

export function map<Value, Result>(i: T<Value>, fn: (v: Value) => Result): T<Result> {
    return (i == null || i === undefined) ? undefined : fn(i);
}