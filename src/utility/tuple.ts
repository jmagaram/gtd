export function tuple<T1, T2, T3, T4, T5>(t: [T1, T2, T3, T4, T5]): [T1, T2, T3, T4, T5]
export function tuple<T1, T2, T3, T4>(t: [T1, T2, T3, T4]): [T1, T2, T3, T4]
export function tuple<T1, T2, T3>(t: [T1, T2, T3]): [T1, T2, T3]
export function tuple<T1, T2>(t: [T1, T2]): [T1, T2]
export function tuple(t: any): any { return t }