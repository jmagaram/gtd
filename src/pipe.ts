export function pipe<A, B, C, D, E, F, G, H, I, J>(
    a: () => A,
    mapA: (a: A) => B,
    mapB: (b: B) => C,
    mapC: (c: C) => D,
    mapD: (d: D) => E,
    mapE: (e: E) => F,
    mapF: (f: F) => G,
    mapG: (g: G) => H,
    mapH: (h: H) => I,
    mapI: (i: I) => J
): J;

export function pipe<A, B, C, D, E, F, G, H, I>(
    a: () => A,
    mapA: (a: A) => B,
    mapB: (b: B) => C,
    mapC: (c: C) => D,
    mapD: (d: D) => E,
    mapE: (e: E) => F,
    mapF: (f: F) => G,
    mapG: (g: G) => H,
    mapH: (h: H) => I,
): I;

export function pipe<A, B, C, D, E, F, G, H>(
    a: () => A,
    mapA: (a: A) => B,
    mapB: (b: B) => C,
    mapC: (c: C) => D,
    mapD: (d: D) => E,
    mapE: (e: E) => F,
    mapF: (f: F) => G,
    mapG: (g: G) => H,
): H;

export function pipe<A, B, C, D, E, F, G>(
    a: () => A,
    mapA: (a: A) => B,
    mapB: (b: B) => C,
    mapC: (c: C) => D,
    mapD: (d: D) => E,
    mapE: (e: E) => F,
    mapF: (f: F) => G,
): G;

export function pipe<A, B, C, D, E, F>(
    a: () => A,
    mapA: (a: A) => B,
    mapB: (b: B) => C,
    mapC: (c: C) => D,
    mapD: (d: D) => E,
    mapE: (e: E) => F,
): F;

export function pipe<A, B, C, D, E>(
    a: () => A,
    mapA: (a: A) => B,
    mapB: (b: B) => C,
    mapC: (c: C) => D,
    mapD: (d: D) => E,
): E;

export function pipe<A, B, C, D>(
    a: () => A,
    mapA: (a: A) => B,
    mapB: (b: B) => C,
    mapC: (c: C) => D,
): D;

export function pipe<A, B, C>(
    a: () => A,
    mapA: (a: A) => B,
    mapB: (b: B) => C,
): C;

export function pipe<A, B>(
    a: () => A,
    mapA: (a: A) => B,
): B;

export function pipe<A, B, C=never, D=never, E=never, F=never, G=never, H=never, I=never, J=never>(
    a: () => A,
    mapA: (a: A) => B,
    mapB?: (b: B) => C,
    mapC?: (c: C) => D,
    mapD?: (d: D) => E,
    mapE?: (e: E) => F,
    mapF?: (f: F) => G,
    mapG?: (g: G) => H,
    mapH?: (h: H) => I,
    mapI?: (i: I) => J
) {
    if (mapB === undefined) {
        return mapA(a());
    }
    if (mapC === undefined) {
        return mapB(mapA(a()));
    }
    if (mapD === undefined) {
        return mapC(mapB(mapA(a())));
    }
    if (mapE === undefined) {
        return mapD(mapC(mapB(mapA(a()))));
    }
    if (mapF === undefined) {
        return mapE(mapD(mapC(mapB(mapA(a())))));
    }
    if (mapG === undefined) {
        return mapF(mapE(mapD(mapC(mapB(mapA(a()))))));
    }
    if (mapH === undefined) {
        return mapG(mapF(mapE(mapD(mapC(mapB(mapA(a())))))));
    }
    if (mapI === undefined) {
        return mapH(mapG(mapF(mapE(mapD(mapC(mapB(mapA(a()))))))));
    }
    return mapI(mapH(mapG(mapF(mapE(mapD(mapC(mapB(mapA(a())))))))));
}