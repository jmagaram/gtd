import * as Rx from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as ActionItemList from 'src/components/ActionItemListComponent'
import * as Seq from 'src/seq/index'
import * as ActionItem from 'src/state/actionItem'
import { T as AppState } from 'src/state/appState'
import { T as UniqueId } from 'src/state/uniqueId'
import * as View from 'src/state/view'
import * as Store from 'src/store'
import { connectPropsToObservable } from '../reactUtility/connectPropsToObservable';

interface Props {
    store: Store.T
}

function mapPropsToObservable(p: Props): Rx.Observable<ActionItemList.Properties> {
    const isImportantMatch = (item: ActionItem.T, view: View.T) => view.important === "Both" || (view.important === "Important" && item.isImportant) || (view.important === "NotImportant" && !item.isImportant);
    const isStatusMatch = (item: ActionItem.T, view: View.T) => view.status === "Both" || (view.status === "Complete" && item.isComplete) || (view.status === "Incomplete" && !item.isComplete);
    const visibleActions = (state: AppState) => Seq.choose(state.actionItems, i => isStatusMatch(i, state.view) && isImportantMatch(i, state.view) ? i.uniqueId : undefined);
    return p.store.state$.pipe(
        map(i => visibleActions(i)),
        distinctUntilChanged((x, y) => Seq.all(Seq.zip2<UniqueId, UniqueId>(x, y), j => j[0] === j[1])),
        map(i => ({
            visibleIds: Array.from(i),
            store: p.store
        })));
}

export const T = connectPropsToObservable(ActionItemList.T, mapPropsToObservable);