import { create, T as ActionItem } from 'src/actionItem';
import * as Seq from 'src/seq/index';
import { T as UniqueId } from 'src/uniqueId';

export type T = ReadonlyMap<UniqueId, ActionItem>;

export function createSampleData(): T {
    return new Map(Seq.map(Seq.fromGenerator(sampleActionsGenerator), j => [j.uniqueId, j] as [UniqueId, ActionItem]));
}

function* sampleActionsGenerator() {
    yield create("Change the light bulbs", false, false);
    yield create("Empty the fridge", false, false);
    yield create("Work out in the gym", true, false);
    yield create("Check tire pressure", false, true);
}
