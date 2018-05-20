import * as React from 'react';
import * as Rx from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ActionTypes, factory as actionFactory } from 'src/actions'
import { T as ObservableStateComponent } from 'src/containers/ObservableStateContainer'
import { T as CreateForm } from 'src/state/createForm'

import * as Store from 'src/store'

interface Props {
    store: Store.T
}

export class T extends ObservableStateComponent<Props, CreateForm> {
    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        this.props.store.dispatch(actionFactory.createForm_submit());
        e.preventDefault();
    }

    public handleTextChange(e: React.FormEvent<HTMLInputElement>): void {
        this.props.store.dispatch(actionFactory.createForm_updateText(e.currentTarget.value));
    }

    public renderCore(): JSX.Element {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>

                    <input placeholder="new to do" type="text" value={this.state.text} onChange={this.handleTextChange} />
                </label>
                <input type="submit" disabled={!this.state.canSubmit} value="Submit" />
            </form>
        );
    }

    protected stateFactory(props: { store: Store.T; }): Rx.Observable<CreateForm> {
        return props.store.state$.pipe(
            map(i => i.createForm),
            distinctUntilChanged()
        );
    }
}