import * as Action from 'src/action';
import * as ActionUnion from 'src/actionUnion';
import * as Seq from 'src/seq/index';
import * as ActionItem from 'src/store/actionItem';
import { T as UniqueId } from 'src/uniqueId';

// Store

export type T = ReadonlyMap<UniqueId, ActionItem.T>;

export function createSampleData(): T {
    return new Map(Seq.map(Seq.fromGenerator(sampleActionsGenerator), j => [j.uniqueId, j] as [UniqueId, ActionItem.T]));
}

function* sampleActionsGenerator() {
    yield ActionItem.create("Change the light bulbs", false, false);
    yield ActionItem.create("Empty the fridge", false, false);
    yield ActionItem.create("Work out in the gym", true, false);
    yield ActionItem.create("Check tire pressure", false, true);
}

// Actions

const purge = (id: UniqueId) => Action.create("actionItemMap/purge", id);

const create = (
    title: string,
    isImportant: boolean,
    isComplete: boolean) => Action.create("actionItemMap/create", { title, isImportant, isComplete });

const actions = {
    purge,
    create
}

export type Actions = ActionUnion.T<typeof actions>

// Reducers

export function reducer(i: T, a: Actions): T {
    switch (a.type) {
        case "actionItemMap/create": {
            const c = ActionItem.create(a.payload.title, a.payload.isImportant, a.payload.isComplete);
            const cKeyValue: [UniqueId, ActionItem.T] = [c.uniqueId, c];
            return new Map(Seq.append(i, [cKeyValue]));
        }
        case "actionItemMap/purge": return new Map(Seq.filter(i, j => j[0] === a.payload));
        default: return i;
    }
}