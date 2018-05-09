type LastOf<
    A,
    B=never,
    C=never,
    D=never,
    E=never,
    F=never,
    G=never,
    H=never,
    I=never,
    J=never> =
    [B] extends [never] ? A :
    [C] extends [never] ? B :
    [D] extends [never] ? C :
    [E] extends [never] ? D :
    [F] extends [never] ? E :
    [G] extends [never] ? F :
    [H] extends [never] ? G :
    [I] extends [never] ? H :
    [J] extends [never] ? I :
    J;

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
): LastOf<A, B, C, D, E, F, G, H, I, J> {
    if (mapB === undefined) {
        return mapA(a()) as LastOf<A, B, C, D, E, F, G, H, I, J>;
    }
    if (mapC === undefined) {
        return mapB(mapA(a())) as LastOf<A, B, C, D, E, F, G, H, I, J>;
    }
    if (mapD === undefined) {
        return mapC(mapB(mapA(a()))) as LastOf<A, B, C, D, E, F, G, H, I, J>;
    }
    if (mapE === undefined) {
        return mapD(mapC(mapB(mapA(a())))) as LastOf<A, B, C, D, E, F, G, H, I, J>;
    }
    if (mapF === undefined) {
        return mapE(mapD(mapC(mapB(mapA(a()))))) as LastOf<A, B, C, D, E, F, G, H, I, J>;
    }
    if (mapG === undefined) {
        return mapF(mapE(mapD(mapC(mapB(mapA(a())))))) as LastOf<A, B, C, D, E, F, G, H, I, J>;
    }
    if (mapH === undefined) {
        return mapG(mapF(mapE(mapD(mapC(mapB(mapA(a()))))))) as LastOf<A, B, C, D, E, F, G, H, I, J>;
    }
    if (mapI === undefined) {
        return mapH(mapG(mapF(mapE(mapD(mapC(mapB(mapA(a())))))))) as LastOf<A, B, C, D, E, F, G, H, I, J>;
    }
    return mapI(mapH(mapG(mapF(mapE(mapD(mapC(mapB(mapA(a()))))))))) as LastOf<A, B, C, D, E, F, G, H, I, J>;
}