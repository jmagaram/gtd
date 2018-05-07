import { Observable, Subject } from 'rxjs';
import { publishBehavior, scan } from 'rxjs/operators';
import { StateStore } from './types';

class StateStoreImpl<TState, TAction> implements StateStore<TState, TAction> {
    public state$: Observable<TState>;
    private command$: Subject<TAction>;

    constructor(initialState: TState, reducer: (state: TState, command: TAction) => TState) {
        this.command$ = new Subject<TAction>();
        this.state$ = this
            .command$
            .pipe(
                scan<TAction, TState>((accumulator, value, index) => reducer(accumulator, value)),
                publishBehavior(initialState));
    }

    public dispatch(command: TAction): void {
        this.command$.next(command);
    }
}

export default function stateStore<TState, TCommand>(
    initialState: TState,
    reducer: (previousState: TState, command: TCommand) => TState): StateStore<TState, TCommand> {
    return new StateStoreImpl<TState, TCommand>(initialState, reducer);
}