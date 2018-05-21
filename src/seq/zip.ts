import { append } from './append';
import { fromGenerator } from './fromGenerator';
import { map } from './map';

function foreverUndefined() {
    function* items() {
        while (true) {
            yield undefined;
        }
    }
    return fromGenerator(items);
}

export function zip2<T1, T2>(
    s1: Iterable<NonNullable<T1>>,
    s2: Iterable<NonNullable<T2>>) {
    return map(zip4Internal(s1, s2, foreverUndefined(), foreverUndefined()), i => [i[0], i[1]] as [T1, T2]);
}

export function zip3<T1, T2, T3>(
    s1: Iterable<NonNullable<T1>>,
    s2: Iterable<NonNullable<T2>>,
    s3: Iterable<NonNullable<T3>>) {
    return map(zip4Internal(s1, s2, s3, foreverUndefined()), i => [i[0], i[1], i[2]] as [T1, T2, T3]);
}

export function zip4<T1, T2, T3, T4>(
    s1: Iterable<NonNullable<T1>>,
    s2: Iterable<NonNullable<T2>>,
    s3: Iterable<NonNullable<T3>>,
    s4: Iterable<NonNullable<T4>>
) {
    return map(zip4Internal(s1, s2, s3, s4), i => [i[0], i[1], i[2], i[3]] as [T1, T2, T3, T4]);
}

function zip4Internal<T1, T2, T3, T4>(
    s1: Iterable<T1>,
    s2: Iterable<T2>,
    s3: Iterable<T3>,
    s4: Iterable<T4>) {
    function* items() {
        const s1Inf = append(s1, foreverUndefined());
        const s2Inf = append(s2, foreverUndefined());
        const s3Inf = append(s3, foreverUndefined());
        const s4Inf = append(s4, foreverUndefined());
        const iter1 = s1Inf[Symbol.iterator]();
        const iter2 = s2Inf[Symbol.iterator]();
        const iter3 = s3Inf[Symbol.iterator]();
        const iter4 = s4Inf[Symbol.iterator]();
        let isDone = false;
        do {
            const v1 = iter1.next().value;
            const v2 = iter2.next().value;
            const v3 = iter3.next().value;
            const v4 = iter4.next().value;
            isDone = (v1 === undefined && v2 === undefined && v3 === undefined && v4 === undefined);
            if (!isDone) {
                yield [v1, v2, v3, v4] as [T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined];
            }
        } while (!isDone);
    }
    return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const zip2_ = <T1, T2>(s2: Iterable<NonNullable<T2>>) =>
    (s1: Iterable<NonNullable<T1>>) => zip2(s1, s2);

// tslint:disable-next-line:variable-name
export const zip3_ = <T1, T2, T3>(s2: Iterable<NonNullable<T2>>, s3: Iterable<NonNullable<T2>>) =>
    (s1: Iterable<NonNullable<T1>>) => zip3(s1, s2, s3);

// tslint:disable-next-line:variable-name
export const zip4_ = <T1, T2, T3, T4>(s2: Iterable<NonNullable<T2>>, s3: Iterable<NonNullable<T2>>, s4: Iterable<NonNullable<T2>>) =>
    (s1: Iterable<NonNullable<T1>>) => zip4(s1, s2, s3, s4);