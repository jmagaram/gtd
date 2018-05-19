import * as React from 'react';
import * as Rx from 'rxjs'
import { map } from 'rxjs/operators';
import * as ActionItem from 'src/actionItem'
import * as ActionItemActions from 'src/actionItem.actions'
import { T as ActionItemMap } from 'src/actionItemMap'
import * as ActionItemMapActions from 'src/actionItemMap.actions'
import * as AList from 'src/components/ActionItemList'
import { Properties as ActionItemProperties } from 'src/components/ActionItemListItem'
import { T as ObservableStateComponent } from 'src/containers/ObservableStateContainer'
import { T as Important } from 'src/importantFilter'
import * as Seq from 'src/seq/index'
import { T as Status } from 'src/statusFilter'
import * as Store from 'src/store'
import { T as UniqueId } from 'src/uniqueId'
import { pipe as myPipe } from 'src/utility/pipe'
import { T as View } from 'src/view'

interface Props {
    store: Store.T
}

interface State {
    items: ActionItemProperties[]
}

export class T extends ObservableStateComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    public renderCore(): JSX.Element {
        return <AList.T items={this.state.items} />
    }

    private isImportantMatch(f: Important, a: ActionItem.T) {
        return f === "Both" || (f === "Important" && a.isImportant) || (f === "NotImportant" && !a.isImportant);
    }

    private isStatusMatch(s: Status, a: ActionItem.T) {
        return s === "Both" || (s === "Complete" && a.isComplete) || (s === "Incomplete" && !a.isComplete);
    }

    private createPropItem(a: ActionItem.T): ActionItemProperties {
        return {
            title: a.title,
            isComplete: a.isComplete,
            isImportant: a.isImportant,
            key: a.uniqueId as string,
            onDelete: this.purge(a.uniqueId),
            onToggleComplete: this.toggleComplete(a.uniqueId),
            onToggleImportant: this.toggleImportant(a.uniqueId)
        };
    }

    private purge(id: UniqueId) {
        return () => {
            const a = ActionItemMapActions.factories.purge(id);
            this.props.store.dispatch(a);
        };
    }

    private toggleComplete(id: UniqueId) {
        return () => {
            const a = ActionItemActions.factories.toggleComplete(id);
            this.props.store.dispatch(a);
        };
    }

    private toggleImportant(id: UniqueId) {
        return () => {
            const a = ActionItemActions.factories.toggleImportant(id);
            this.props.store.dispatch(a);
        };
    }

    private CreateProps(view: View, items: ActionItemMap) {
        return myPipe(
            () => items.values(),
            i => Seq.filter(i, j => this.isStatusMatch(view.status, j) && this.isImportantMatch(view.important, j)),
            i => Seq.map<ActionItem.T, ActionItemProperties>(i, j => this.createPropItem(j)),
            i => Array.from(i))();
    }

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<State> {
        const p = props.store.state$.pipe(
            map(j => this.CreateProps(j.view, j.actionItems)), // bad on dups
            map(i => ({ items: i })));
        return p;
    }
}