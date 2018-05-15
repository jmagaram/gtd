import * as Action from './action';

enum Actions {
    OnlyShowImportant = "abc",
    OnlyShowIncomplete = "xyz"
}

const importantAction = (val: number) => Action.create(Actions.OnlyShowImportant, val);
type ImportantAction = ReturnType<typeof importantAction>;

const incompleteAction = () => Action.create(Actions.OnlyShowIncomplete);
type IncompleteAction = ReturnType<typeof incompleteAction>;

function reduce(a: (ImportantAction | IncompleteAction)) {
    switch (a.type) {
        case Actions.OnlyShowImportant: {
            return a.payload;
        }
        case Actions.OnlyShowIncomplete: {
            return a.type;
        }
    }
}