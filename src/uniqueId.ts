import { v1 } from 'uuid';
import * as Tagged from './tagged';

export type T = Tagged.T<string, "uniqueId">;

export function create(): T {
    return v1() as T;
}