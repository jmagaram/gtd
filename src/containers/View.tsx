import * as React from 'react';
import * as Rx from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ActionTypes, factory as actionFactory } from 'src/actions'
import * as ImportantFilter from 'src/components/ImportantFilter'
import * as StatusFilter from 'src/components/StatusFilter'
import { T as ObservableStateComponent } from 'src/containers/ObservableStateContainer'
import * as Important from 'src/state/importantFilter'
import * as Status from 'src/state/statusFilter'
import { T as View } from 'src/state/view'
import * as Store from 'src/store'

interface Props {
    store: Store.T
}

export class T extends ObservableStateComponent<Props, View> {
    constructor(props: Props) {
        super(props);
        this.SetImportance = this.SetImportance.bind(this);
        this.SetStatus = this.SetStatus.bind(this);
    }

    public renderCore(): JSX.Element {
        return <div>
            <ImportantFilter.T currentFilter={this.state.important} onSet={this.SetImportance} />
            <StatusFilter.T currentFilter={this.state.status} onSet={this.SetStatus} />
        </div >
    }

    protected SetImportance(i: Important.T) {
        const action = actionFactory.view_setImportantFilter(i);
        this.props.store.dispatch(action);
    }

    protected SetStatus(i: Status.T) {
        const action = actionFactory.view_setStatusFilter(i);
        this.props.store.dispatch(action);
    }

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<View> {
        return props.store.state$.pipe(
            map(i => i.view),
            distinctUntilChanged()
        );
    }
}