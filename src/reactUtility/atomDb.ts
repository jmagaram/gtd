import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface T<TState, TAction> {
    state$: Observable<TState>;
    action$: Observable<TAction>;
    dispatch(command: TAction): void;
}

export function create<TState, TAction>(
    initialState: TState, reducer: (previousState: TState, command: TAction) => TState): T<TState, TAction> {
    return new Store<TState, TAction>(initialState, reducer);
}

class Store<TState, TAction> implements T<TState, TAction> {
    public state$: Observable<TState>;
    public action$: Subject<TAction>;
    public dispatch: (command: TAction) => void;

    constructor(initialState: TState, reducer: (state: TState, command: TAction) => TState) {
        const state = new BehaviorSubject<TState>(initialState);
        const action = new Subject<TAction>();
        this.dispatch = (command: TAction) => {
            state.next(reducer(state.value, command));
            action.next(command);
        }
        this.state$ = state;
        this.action$ = action;
    }
}