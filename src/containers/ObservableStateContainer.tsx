import * as React from 'react';
import { Observable, Subscription } from "rxjs";
import { filter } from 'rxjs/operators';

export abstract class T<TProps, TState> extends React.Component<TProps, TState> {
    private subscription: Subscription;
    private state$: Observable<TState | undefined>;

    constructor(props: TProps) {
        super(props);
        this.state$ = this.stateFactory(props);
    }

    public abstract renderCore(): JSX.Element;

    public render() {
        if (this.subscription == null) {
            return <div />;
        }
        else {
            return this.renderCore();
        }
    }

    // Should use static getStateFromProps instead; couldn't get it to work
    public componentDidMount() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        this.subscription = this
            .state$
            .subscribe(s => {
                if (s !== undefined) {
                    this.setState(s);
                }
            })
    }

    public componentWillUnmount() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
    }

    protected abstract stateFactory(props: TProps): Observable<TState | undefined>;
}
