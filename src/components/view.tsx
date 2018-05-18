import * as React from 'react';
import * as Rx from 'rxjs'
import { distinctUntilChanged, filter, map, scan, switchMap } from 'rxjs/operators';
import { T as ObservableStateComponent } from 'src/components/ObservableStateComponent'
import * as Store from 'src/store'
import { T as View } from 'src/view'

export class T extends ObservableStateComponent<{ store: Store.T }, View> {
    public renderCore(): JSX.Element {
        return <div>
            Important! {this.state.important}, Status {this.state.status}
        </div>
    }

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<View> {
        return props.store.state$.pipe(
            map(i => i.view),
            distinctUntilChanged()
        );
    }
}