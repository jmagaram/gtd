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
    a: A,
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
    const b = mapA(a);
    switch (mapB) {
        case undefined: return b as LastOf<A, B, C, D, E, F, G, H, I, J>;
        default: {
            const c = mapB(b);
            switch (mapC) {
                case undefined: return c as LastOf<A, B, C, D, E, F, G, H, I, J>;
                default: {
                    const d = mapC(c);
                    switch (mapD) {
                        case undefined: return d as LastOf<A, B, C, D, E, F, G, H, I, J>;
                        default: {
                            const e = mapD(d);
                            switch (mapE) {
                                case undefined: return e as LastOf<A, B, C, D, E, F, G, H, I, J>;
                                default: {
                                    const f = mapE(e);
                                    switch (mapF) {
                                        case undefined: return f as LastOf<A, B, C, D, E, F, G, H, I, J>;
                                        default: {
                                            const g = mapF(f);
                                            switch (mapG) {
                                                case undefined: return g as LastOf<A, B, C, D, E, F, G, H, I, J>;
                                                default: {
                                                    const h = mapG(g);
                                                    switch (mapH) {
                                                        case undefined: return h as LastOf<A, B, C, D, E, F, G, H, I, J>;
                                                        default: {
                                                            const i = mapH(h);
                                                            switch (mapI) {
                                                                case undefined: return i as LastOf<A, B, C, D, E, F, G, H, I, J>;
                                                                default: return mapI(i) as LastOf<A, B, C, D, E, F, G, H, I, J>;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
