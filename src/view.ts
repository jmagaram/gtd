import * as ImportantFilter from 'src/importantFilter'
import * as Action from 'src/reactUtility/action';
import * as ActionsUnion from 'src/reactUtility/actionUnion';
import * as Reducer from 'src/reducer';
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