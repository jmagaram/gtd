import * as React from 'react';
import * as Rx from 'rxjs'
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import * as AppStateActions from 'src/appState.actions'
import { T as ObservableStateComponent } from 'src/components/ObservableStateComponent'
import * as Important from 'src/importantFilter'
import * as Seq from 'src/seq'
import * as Status from 'src/statusFilter'
import * as Store from 'src/store'
import { pipe } from 'src/utility/pipe'
import { T as View } from 'src/view'
import * as ViewActions from 'src/view.actions'

interface Props {
    store: Store.T
}

export class T extends ObservableStateComponent<Props, View> {

    private importantMap: ReadonlyMap<Important.T, number> = new Map<Important.T, number>([["Important", 1], ["NotImportant", 2], ["Both", 3]]);
    private statusMap: ReadonlyMap<Status.T, number> = new Map<Status.T, number>([["Incomplete", 1], ["Complete", 2], ["Both", 3]]);

    constructor(props: Props) {
        super(props);
        this.SetImportanceFilter = this.SetImportanceFilter.bind(this);
        this.SetStatusFilter = this.SetStatusFilter.bind(this);
    }

    public renderCore(): JSX.Element {
        return <div>
            <p>Important: <select value={this.importantMap.get(this.state.important)} onChange={this.SetImportanceFilter}>
                <option value={this.importantMap.get("Important")} >Important</option>
                <option value={this.importantMap.get("NotImportant")} >Not Important</option>
                <option value={this.importantMap.get("Both")} >All</option>
            </select></p>
            <p>Status: <select value={this.statusMap.get(this.state.status)} onChange={this.SetStatusFilter}>
                <option value={this.statusMap.get("Complete")}>Completed</option>
                <option value={this.statusMap.get("Incomplete")}>Not done yet</option>
                <option value={this.statusMap.get("Both")}>All</option>
            </select></p>
        </div>
    }

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<View> {
        return props.store.state$.pipe(
            map(i => i.view),
            distinctUntilChanged()
        );
    }

    private SetImportanceFilter(e: React.ChangeEvent<HTMLSelectElement>) {
        const f = pipe(
            () => this.importantMap.entries(),
            i => Seq.find(i, j => j[1] === Number.parseInt(e.target.value)),
            i => i![0])();
        const action = ViewActions.factories.setImportantFilter(f);
        this.props.store.dispatch(action);
    }

    private SetStatusFilter(e: React.ChangeEvent<HTMLSelectElement>) {
        const f = pipe(
            () => this.statusMap.entries(),
            i => Seq.find(i, j => j[1] === Number.parseInt(e.target.value)),
            i => i![0])();
        const action = ViewActions.factories.setStatusFilter(f);
        this.props.store.dispatch(action);
    }
}