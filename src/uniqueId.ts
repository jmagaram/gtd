import { v1 } from 'uuid';

export type T = string & { _type: "uniqueId" };

export function create(): T {
    return v1() as T;
}