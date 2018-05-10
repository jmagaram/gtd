import { Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

interface T<TState, TAction> {
    state$: Observable<TState>;
    dispatch(command: TAction): void;
}

export function create<TState, TAction>(
    initialState: TState, reducer: (previousState: TState, command: TAction) => TState): T<TState, TAction> {
    return new StateStore<TState, TAction>(initialState, reducer);
}

class StateStore<TState, TAction> implements T<TState, TAction> {
    public state$: Observable<TState>;
    private command$: Subject<TAction>;

    constructor(initialState: TState, reducer: (state: TState, command: TAction) => TState) {
        this.command$ = new Subject<TAction>();
        this.state$ = this
            .command$
            .pipe(
                scan<TAction, TState>((accumulator, action) => reducer(accumulator, action), initialState),
                startWith(initialState));
    }

    public dispatch(command: TAction): void {
        this.command$.next(command);
    }
}