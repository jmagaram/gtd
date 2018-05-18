export type T<State, Action> = (previousState: State, action: Action) => State;
