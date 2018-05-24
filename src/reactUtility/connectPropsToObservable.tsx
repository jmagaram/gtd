import * as React from 'react';
import { Observable, Subscription } from "rxjs";

/**
 * Creates a component that wraps an existing component and updates its properties each time a calculated 
 * rxjs observable emits a new value. Similar in purpose to the connect function in Redux.
 * 
 * @param Wrapped The component to wrap.
 * @template InternalProps The properties of the wrapped component.
 * @template ExternalProps The properties to be exposed by the higher-order component.
 * @param mapPropsToObservable Calculates a property stream to assign to the wrapped component. 
 * @returns A component that updates its properties based on an rxjs observable.
 * 
 * The property stream is automatically subscribed to when the component is mounted, and unsubscribed from 
 * when the component unmounts. To limit unnecessary rendering of the child component, make use of  
 * rxjs operators like distinctUntilChanged and do not generate new lamda functions on each render.
 */
export function connectPropsToObservable<InternalProps, ExternalProps>(
    Wrapped: React.ComponentClass<InternalProps> | React.StatelessComponent<InternalProps>,
    mapPropsToObservable: (h: ExternalProps) => Observable<InternalProps>
) {
    const PropsFromObservable = class extends React.Component<ExternalProps, InternalProps> {
        private subscription: Subscription;

        constructor(
            props: ExternalProps
        ) {
            super(props);
            mapPropsToObservable = mapPropsToObservable;
            this.handlePropsPublished = this.handlePropsPublished.bind(this);
        }

        public render() {
            return (this.subscription == null) ? <div /> : <Wrapped {...this.state} />;
        }

        public componentDidMount() {
            this.subscription = mapPropsToObservable(this.props).subscribe(p => this.handlePropsPublished(p))
        }

        public componentWillUnmount() {
            if (this.subscription != null) {
                this.subscription.unsubscribe();
            }
        }

        private handlePropsPublished(observableProps: InternalProps) {
            this.setState(observableProps);
        };
    }
    return PropsFromObservable;
}