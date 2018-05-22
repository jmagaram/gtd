export type T<V> = NonNullable<V> | undefined;

export function some<V>(value: NonNullable<V>): T<V> {
    switch (value) {
        case null: throw new Error("Null is not permitted.");
        case undefined: throw new Error("Undefined is not permitted.");
        default: return value;
    }
}

export const none = undefined;

export const create = <V>(value: V): T<V> =>
    (value == null || value === undefined) ? undefined : value!;

export const reduce = <V>(source: V, ifUndefined: NonNullable<V>): V =>
    (source == null || source === undefined) ? ifUndefined : source!;

export const reduceLazy = <V>(source: V, ifUndefined: () => NonNullable<V>): V =>
    (source == null || source === undefined) ? ifUndefined() : source!;

export const reduceOrThrow = <V>(source: V): V => {
    switch (source) {
        case null: throw new Error("Can't reduce 'null'.");
        case undefined: throw new Error("Can't reduce 'undefined'.");
        default: return source!;
    }
}

export const map = <V, R>(source: V, selector: (v: NonNullable<V>) => NonNullable<R>): T<R> =>
    (source == null || source === undefined) ? undefined : selector(source!);

export const mapOption = <V, R>(source: V, selector: (v: NonNullable<V>) => T<R>): T<R> =>
    (source == null || source === undefined) ? undefined : selector(source!);

export const filter = <V>(source: V, predicate: (v: NonNullable<V>) => boolean): T<V> =>
    (source == null || source === undefined) ? undefined : predicate(source!) ? source! : undefined;

// tslint:disable:variable-name
export const reduce_ = <V>(ifUndefined: NonNullable<V>) => (source: V) => reduce(source, ifUndefined);
export const reduceLazy_ = <V>(ifUndefined: () => NonNullable<V>) => (source: V) => reduceLazy(source, ifUndefined)
export const map_ = <V, R>(selector: (v: NonNullable<V>) => NonNullable<R>) => (source: V) => map(source, selector);
export const mapOption_ = <V, R>(selector: (v: NonNullable<V>) => T<R>) => (source: V) => mapOption(source, selector);
export const filter_ = <V>(predicate: (v: NonNullable<V>) => boolean) => (source: V) => filter(source, predicate);