import * as React from 'react';
import * as Rx from 'rxjs'
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { factory as actionFactory } from 'src/actions'
import { Properties as ActionItemProperties, T as ActionItemListItem } from 'src/components/ActionItemListItemComponent'
import { connectPropsToObservable } from 'src/reactUtility/connectPropsToObservable'
import { T as UniqueId } from 'src/state/uniqueId'
import * as Store from 'src/store'

interface ExternalProps {
    uniqueId: UniqueId;
    store: Store.T
}

function mapStateToProps(store: Store.T, id: UniqueId): Rx.Observable<ActionItemProperties> {
    const onDelete = () => store.dispatch(actionFactory.actionItem_startPurge(id));
    const onCancelDelete = () => store.dispatch(actionFactory.actionItem_cancelPurge(id));
    const onToggleComplete = () => store.dispatch(actionFactory.actionItem_toggleComplete(id));
    const onToggleImportant = () => store.dispatch(actionFactory.actionItem_toggleImportant(id));
    return store.state$.pipe(
        map(i => i.actionItems.find(j => j.uniqueId === id)),
        filter(i => i !== undefined),
        map(i => i!),
        distinctUntilChanged(),
        map(i => ({
            isComplete: i.isComplete,
            isImportant: i.isImportant,
            title: i.title,
            key: i.uniqueId,
            purgePercentComplete: i.purgePercentComplete,
            onDelete: i.purgePercentComplete === undefined ? onDelete : undefined,
            onCancelDelete: i.purgePercentComplete !== undefined ? onCancelDelete : undefined,
            onToggleComplete,
            onToggleImportant
        })));
}

export const T = connectPropsToObservable(ActionItemListItem, (i: ExternalProps) => mapStateToProps(i.store, i.uniqueId));