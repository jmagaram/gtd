import * as Tagged from 'src/utility/tagged';
import { v1 } from 'uuid';

export type T = Tagged.T<string, "uniqueId">;

export function create(): T {
    return v1() as T;
}