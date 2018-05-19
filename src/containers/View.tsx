import * as React from 'react';
import * as Rx from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as ImportantFilter from 'src/components/ImportantFilter'
import * as StatusFilter from 'src/components/StatusFilter'
import { T as ObservableStateComponent } from 'src/containers/ObservableStateContainer'
import * as Important from 'src/importantFilter'
import * as Status from 'src/statusFilter'
import * as Store from 'src/store'
import { T as View } from 'src/view'
import * as ViewActions from 'src/view.actions'

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
        const action = ViewActions.factories.setImportantFilter(i);
        this.props.store.dispatch(action);
    }

    protected SetStatus(i: Status.T) {
        const action = ViewActions.factories.setStatusFilter(i);
        this.props.store.dispatch(action);
    }

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<View> {
        return props.store.state$.pipe(
            map(i => i.view),
            distinctUntilChanged()
        );
    }
}