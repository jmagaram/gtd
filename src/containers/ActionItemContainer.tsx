import * as React from 'react';
import * as Rx from 'rxjs'
import { map } from 'rxjs/operators';
import * as ActionItemActions from 'src/actionItem.actions'
import * as ActionItemMapActions from 'src/actionItemMap.actions'
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

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<ActionItemProperties> {
        const p = props.store.state$.pipe(
            map(i => {
                const source = i.actionItems.get(this.props.uniqueId)!;
                const result: ActionItemProperties = {
                    isComplete: source.isComplete,
                    isImportant: source.isImportant,
                    title: source.title,
                    key: source.uniqueId,
                    onDelete: () => ActionItemMapActions.factories.purge(source.uniqueId),
                    onToggleComplete: () => ActionItemActions.factories.toggleComplete(source.uniqueId),
                    onToggleImportant: () => ActionItemActions.factories.toggleImportant(source.uniqueId)
                };
                return result; // need distinct on changed I think otherwise state always updated
            }));
        return p;
    }
}