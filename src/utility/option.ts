export type T<V> = NonNullable<V> | undefined;

export function some<V>(value: NonNullable<V>): T<V> {
    switch (value) {
        case null: throw new Error("Null is not permitted.");
        case undefined: throw new Error("Undefined is not permitted.");
        default: return value;
    }
}

export const none = undefined;

export function create<V>(value: V): T<V> {
    return (value == null || value === undefined) ? undefined : value!;
}

export function reduce<V>(source: T<V>, ifUndefined: V): V {
    return (source == null || source === undefined) ? ifUndefined : source;
}

export function reduceLazy<V>(source: T<V>, ifUndefined: () => V): V {
    return (source == null || source === undefined) ? ifUndefined() : source;
}

export function reduceOrThrow<V>(source: T<V>): V {
    switch (source) {
        case null: throw new Error("Can't reduce 'null'.");
        case undefined: throw new Error("Can't reduce 'undefined'.");
        default: return source;
    }
}

export function map<V, R>(source: T<V>, selector: (value: V) => NonNullable<R>): T<R> {
    return (source == null || source === undefined) ? undefined : selector(source);
}

export function mapOption<V, R>(source: T<V>, selector: (value: V) => T<R>): T<R> {
    return (source == null || source === undefined) ? undefined : selector(source);
}

export function filter<Value>(source: T<Value>, predicate: (v: Value) => boolean): T<Value> {
    return (source === undefined) ? undefined : predicate(source) ? source : undefined;
}

// tslint:disable:variable-name
export const filter_ = <V>(predicate: (v: V) => boolean) => (source: T<V>) => ((source === undefined) ? undefined : predicate(source) ? source : undefined);
export const mapOption_ = <V, R>(selector: (value: V) => T<R>) => (source: T<V>) => (source == null || source === undefined) ? undefined : selector(source);
export const map_ = <V, R>(selector: (value: V) => NonNullable<R>) => (source: T<V>) => (source == null || source === undefined) ? undefined : selector(source);
export const reduceLazy_ = <V>(ifUndefined: () => V) => (source: T<V>) => (source == null || source === undefined) ? ifUndefined() : source;
export const reduce_ = <V>(ifUndefined: V) => (source: T<V>) => (source == null || source === undefined) ? ifUndefined : source;