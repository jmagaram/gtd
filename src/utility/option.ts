export type Some = string | boolean | number | object;
export type None = undefined;
export type Maybe<TValue extends Some> = TValue | None;
export { Maybe as T }

export const create = <V extends Some>(value: V | null | undefined) => (value == null) ? undefined : value;

export const reduce = <V extends Some>(source: Maybe<V>, ifUndefined: V): V =>
    (source === undefined) ? ifUndefined : source;

export const reduceLazy = <V extends Some>(source: Maybe<V>, ifUndefined: () => V): V =>
    (source === undefined) ? ifUndefined() : source;

export const reduceOrThrow = <V extends Some>(source: Maybe<V>): V => {
    if (source === undefined) {
        throw new Error("Can't reduce because the wrapped value is undefined.")
    }
    else {
        return source!;
    }
}

export const map = <V extends Some, R extends Some>(source: Maybe<V>, selector: (v: V) => R | undefined) =>
    (source === undefined) ? undefined : selector(source);

export const filter = <V extends Some>(source: Maybe<V>, predicate: (v: V) => boolean) =>
    (source === undefined) ? undefined : predicate(source) ? source : undefined;

// tslint:disable:variable-name
export const reduce_ = <V extends Some>(ifUndefined: V) => (source: Maybe<V>) => reduce(source, ifUndefined);
export const reduceLazy_ = <V extends Some>(ifUndefined: () => V) => (source: Maybe<V>) => reduceLazy(source, ifUndefined);
export const map_ = <V extends Some, R extends Some>(selector: (v: V) => R | undefined) => (source: Maybe<V>) => map(source, selector);
export const filter_ = <V extends Some>(predicate: (v: V) => boolean) => (source: Maybe<V>) => filter(source, predicate);