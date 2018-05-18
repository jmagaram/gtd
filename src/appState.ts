import * as ActionItemMap from 'src/actionItemMap';
import * as View from 'src/view'

export interface T {
    readonly view: View.T;
    readonly actionItems: ActionItemMap.T;
}

export function createDefault(): T {
    return {
        view: View.createDefault(),
        actionItems: ActionItemMap.createSampleData()
    };
}