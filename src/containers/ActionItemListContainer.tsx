import * as React from 'react';
import * as Rx from 'rxjs'
import { map } from 'rxjs/operators';
import { T as ActionItemContainer } from 'src/containers/ActionItemContainer'
import { T as ObservableStateComponent } from 'src/containers/ObservableStateContainer'
import * as Seq from 'src/seq/index'
import * as ActionItem from 'src/state/actionItem'
import { T as AppState } from 'src/state/appState'
import { T as UniqueId } from 'src/state/uniqueId'
import * as Store from 'src/store'
import { pipe } from 'src/utility/pipe'

interface Props {
    store: Store.T
}

interface State {
    items: UniqueId[]
}

export class T extends ObservableStateComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    public renderCore(): JSX.Element {
        return <ul>
            {this.state.items.map(j => (<li key={j as string}><ActionItemContainer store={this.props.store} uniqueId={j} /></li>))}
        </ul>;
    }

    private createState(store: AppState): State {
        const isImportantMatch = (item: ActionItem.T) => store.view.important === "Both" || (store.view.important === "Important" && item.isImportant) || (store.view.important === "NotImportant" && !item.isImportant);
        const isStatusMatch = (item: ActionItem.T) => store.view.status === "Both" || (store.view.status === "Complete" && item.isComplete) || (store.view.status === "Incomplete" && !item.isComplete);
        const items = pipe(
            () => store.actionItems.values(),
            i => Seq.choose<ActionItem.T, UniqueId>(i, j => (isImportantMatch(j) && isStatusMatch(j)) ? j.uniqueId : undefined),
            i => Array.from(i));
        return { items: items() };
    }

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<State> {
        return props.store.state$.pipe(map(i => this.createState(i)));
    }
}