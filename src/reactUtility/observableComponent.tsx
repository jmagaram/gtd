import * as React from 'react';
import { Observable, Subscription } from "rxjs";

// tslint:disable:max-classes-per-file

class M extends React.Component<{ color: string, priority: number }, { data: { color: string } }> {
    public render() {
        return <div />;
    }
}

// Should props$ be passed as a prop to the outer component?

function ObservableComponent2<P, S extends { data: Partial<P> }, Wrapped extends React.Component<P, S>>(
    Wrapped: { new(props: P, context?: any): Wrapped },
    props$: Observable<Partial<P>>) { // Only some props dynamically updated via observable!

    return class extends React.Component<P, S> {
        private subscription: Subscription;

        constructor(props: P) {
            super(props);
            this.handlePropsPublished = this.handlePropsPublished.bind(this);
            // maybe should initialize state here, but how?
            // this.state = { data: {...}}
        }

        public render() {
            if (this.subscription == null) {
                return <div />;
            }
            else {
                return (<Wrapped {...this.props} {...this.state.data} />);
            }
        }

        public componentDidMount() {
            if (this.subscription != null) {
                return;
            }
            else {
                this.subscription = props$.subscribe(p => this.handlePropsPublished(p))
            }
        }

        public componentWillUnmount() {
            if (this.subscription != null) {
                this.subscription.unsubscribe();
            }
        }

        private handlePropsPublished(observableProps: Partial<P>) {
            this.setState({ data: observableProps });
        };

    }
}

let z: Observable<{ color: string, priority: number }>;
const FFF = ObservableComponent2(M, z);
const HHH = "xx";

class TT extends React.Component {
    public render() {
        return <FFF color="tt" priority={1} />;
    }
}

// some fixed props AND some calculated from the observable?
function ObservableComponent<P, S, Wrapped extends React.Component<P, S>>(
    Wrapped: { new(props: P, context?: any): Wrapped },
    props$: Observable<P>) {

    // the Wrapped component might have some real state other than the props that are populated via
    // observable
    const result = class extends React.Component<P, S> {
        private subscription: Subscription;

        constructor(props: P) {
            super(props);
            this.handlePropsPublished = this.handlePropsPublished.bind(this);
            // maybe should initialize state here, but how?
        }

        public render() {
            if (this.subscription == null) {
                return <div />;
            }
            else {
                return (<Wrapped {...this.props} {...this.state} />);
            }
        }

        public componentDidMount() {
            if (this.subscription != null) {
                return;
            }
            else {
                this.subscription = props$.subscribe(p => this.handlePropsPublished(p))
            }
        }

        public componentWillUnmount() {
            if (this.subscription != null) {
                this.subscription.unsubscribe();
            }
        }

        private handlePropsPublished(state: P) {
            this.setState(state);
        };

    }
    return result;
}

// This function takes a component...
// function withSubscription(WrappedComponent, selectData) {
//     // ...and returns another component...
//     return class extends React.Component {
//       constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//         this.state = {
//           data: selectData(DataSource, props)
//         };
//       }

//       componentDidMount() {
//         // ... that takes care of the subscription...
//         DataSource.addChangeListener(this.handleChange);
//       }

//       componentWillUnmount() {
//         DataSource.removeChangeListener(this.handleChange);
//       }

//       handleChange() {
//         this.setState({
//           data: selectData(DataSource, this.props)
//         });
//       }

//       render() {
//         // ... and renders the wrapped component with the fresh data!
//         // Notice that we pass through any additional props
//         return <WrappedComponent data={this.state.data} {...this.props} />;
//       }
//     };
//   }

