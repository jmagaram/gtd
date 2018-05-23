import * as React from 'react';
import { Observable, Subscription } from "rxjs";

/**
 * Creates a higher-order component that wraps an existing component and updates some or
 * all of its properties each time the specified rxjs observable emits a new value.
 * 
 * @param Wrapped The component to wrap.
 * @returns A component that gets its properties from an rxjs observable.
 * 
 * The property stream is automatically subscribed to when the component is mounted, and 
 * unsubscribed from when the component unmounts. To limit unnecessary rendering of the
 * child component, make use of the rxjs distinctUntilChanged operators.
 */

export function propsFromObservable<P, W extends React.Component<P>>(Wrapped: React.ComponentClass<P> | React.StatelessComponent<P>) {
    type HocProps = P & { props$: Observable<Partial<P>> }
    type HocState = Partial<P>
    const PropsFromObservable = class extends React.Component<HocProps, HocState> {
        private subscription: Subscription;

        constructor(props: HocProps) {
            super(props);
            this.handlePropsPublished = this.handlePropsPublished.bind(this);
        }

        public render() {
            return (this.subscription == null) ? <div /> : <Wrapped {...this.props} {...this.state} />;
        }

        public componentDidMount() {
            this.subscription = this.props.props$.subscribe(p => this.handlePropsPublished(p))
        }

        public componentWillUnmount() {
            if (this.subscription != null) {
                this.subscription.unsubscribe();
            }
        }

        private handlePropsPublished(observableProps: Partial<P>) {
            this.setState(observableProps);
        };
    }
    return PropsFromObservable;
}