import { Observable, BehaviorSubject } from 'rxjs';

interface T<TState, TAction> {
    state$: Observable<TState>;
    dispatch(command: TAction): void;
}

export function create<TState, TAction>(
    initialState: TState, reducer: (previousState: TState, command: TAction) => TState): T<TState, TAction> {
    return new Store<TState, TAction>(initialState, reducer);
}

class Store<TState, TAction> implements T<TState, TAction> {
    public state$: Observable<TState>;

    constructor(initialState: TState, reducer: (state: TState, command: TAction) => TState) {
        const state = new BehaviorSubject<TState>(initialState);
        this.dispatch = (command: TAction) => state.next(reducer(state.value, command));
        this.state$ = state;
    }

    public dispatch: (command: TAction) => void;
}