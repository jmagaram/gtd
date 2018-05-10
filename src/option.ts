export type T<Value> = NonNullable<Value> | undefined;

export function some<Value>(value: NonNullable<Value>): T<Value> {
    switch(value) {
        case null: throw new Error("Null is not permitted.");
        case undefined: throw new Error("Undefined is not permitted.");
        default: return value;
    }
}

export const none = undefined;

export function create<Value>(value: Value): T<Value> {
    return (value == null || value === undefined) ? undefined : value!;
}

export function reduce<Value>(source: T<Value>, ifUndefined: Value): Value {
    return (source == null || source === undefined) ? ifUndefined : source;
}

export function reduceLazy<Value>(source: T<Value>, ifUndefined: () => Value): Value {
    return (source == null || source === undefined) ? ifUndefined() : source;
}

export function reduceOrThrow<Value>(source: T<Value>): Value {
    switch (source) {
        case null: throw new Error("Can't reduce 'null'.");
        case undefined: throw new Error("Can't reduce 'undefined'.");
        default: return source;
    }
}

export function map<Value, Result>(source: T<Value>, selector: (value: Value) => NonNullable<Result>): T<Result> {
    return (source == null || source === undefined) ? undefined : selector(source);
}

export function mapOption<Value, Result>(source: T<Value>, selector: (value: Value) => T<Result>): T<Result> {
    return (source == null || source === undefined) ? undefined : selector(source);
}

export function filter<Value>(source: T<Value>, predicate: (v: Value) => boolean): T<Value> {
    return (source === undefined) ? undefined : predicate(source) ? source : undefined;
}