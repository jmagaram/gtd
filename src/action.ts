// Strongly-typed actions implemented according to this article:
// https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575

export interface T<Type extends string> {
    readonly type: Type;
}

export interface TWithPayload<Type extends string, Payload> extends T<Type> {
    readonly payload: Payload;
}

export function create<Type extends string>(type: Type): T<Type>;

export function create<Type extends string, Payload>(type: Type, payload: Payload): TWithPayload<Type, Payload>;

export function create<Type extends string, Payload>(type: Type, payload?: Payload) {
    return (payload === undefined) ? { type } : { type, payload };
}