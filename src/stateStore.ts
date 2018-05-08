import { ConnectableObservable, Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { StateStore } from './types';

class StateStoreImpl<TState, TAction> implements StateStore<TState, TAction> {
    public state$: Observable<TState>;
    private command$: Subject<TAction>;

    constructor(initialState: TState, reducer: (state: TState, command: TAction) => TState) {
        this.command$ = new Subject<TAction>();
        this.state$ = this
            .command$
            .pipe(
                scan<TAction, TState>((accumulator, action, index) => reducer(accumulator, action), initialState),
                startWith(initialState));
    }

    public dispatch(command: TAction): void {
        this.command$.next(command);
    }
}

export function stateStore<TState, TAction>(
    initialState: TState,
    reducer: (previousState: TState, command: TAction) => TState): StateStore<TState, TAction> {
    return new StateStoreImpl<TState, TAction>(initialState, reducer);
}