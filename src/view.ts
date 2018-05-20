import { ActionTypes } from 'src/actions'
import * as ImportantFilter from 'src/importantFilter'
import * as StatusFilter from 'src/statusFilter'

export interface T {
    readonly important: ImportantFilter.T;
    readonly status: StatusFilter.T;
}

export function createDefault(): T {
    return {
        important: "Both",
        status: "Incomplete"
    };
}

export const reducer = (s: T, a: ActionTypes): T => {
    switch (a.type) {
        case "view_setImportantFilter": return { ...s, important: a.payload };
        case "view_setStatusFilter": return { ...s, status: a.payload };
        default: return s;
    }
}