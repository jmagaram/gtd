// Strongly-typed actions implemented according to this article:
// https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575
// https://gist.github.com/deptno/f0ec5364d18823ff3f17854826a0673b

export interface Action<Type extends string> {
    readonly type: Type;
}

export interface ActionWithPayload<Type extends string, Payload> extends Action<Type> {
    readonly payload: Payload;
}

export type ActionTypeUnion<Map extends { [actionKey: string]: (...args: any[]) => any }> = ReturnType<Map[keyof Map]>

export function createAction<Type extends string>(type: Type): Action<Type>;

export function createAction<Type extends string, Payload>(type: Type, payload: Payload): ActionWithPayload<Type, Payload>;

export function createAction<Type extends string, Payload>(type: Type, payload?: Payload) {
    return (payload === undefined) ? { type } : { type, payload };
}