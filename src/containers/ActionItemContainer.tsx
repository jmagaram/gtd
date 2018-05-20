import * as React from 'react';
import * as Rx from 'rxjs'
import { distinctUntilChanged, filter as rxFilter, map } from 'rxjs/operators';
import * as ActionItem from 'src/actionItem'
import { factory as actionFactory } from 'src/actions'
import { T as ActionItemListItem } from 'src/components/ActionItemListItem'
import { Properties as ActionItemProperties } from 'src/components/ActionItemListItem'
import { T as ObservableStateComponent } from 'src/containers/ObservableStateContainer'
import * as Store from 'src/store'
import { T as UniqueId } from 'src/uniqueId'

interface Props {
    uniqueId: UniqueId;
    store: Store.T
}

export class T extends ObservableStateComponent<Props, ActionItemProperties> {
    constructor(props: Props) {
        super(props);
    }

    public renderCore(): JSX.Element {
        return <ActionItemListItem {...this.state} />
    }

    public createProperties(source: ActionItem.T): ActionItemProperties {
        return {
            isComplete: source.isComplete,
            isImportant: source.isImportant,
            title: source.title,
            key: source.uniqueId,
            onDelete: () => this.props.store.dispatch(actionFactory.actionItem_purge(source.uniqueId)),
            onToggleComplete: () => this.props.store.dispatch(actionFactory.actionItem_toggleComplete(source.uniqueId)),
            onToggleImportant: () => this.props.store.dispatch(actionFactory.actionItem_toggleImportant(source.uniqueId))
        };
    }

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<ActionItemProperties> {
        return props.store.state$.pipe(
            map(i => i.actionItems.get(this.props.uniqueId)),
            rxFilter(i => i !== undefined),
            distinctUntilChanged(),
            map(i => this.createProperties(i!)));
    }
}