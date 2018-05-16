import { create as createActionItem, T as ActionItem } from './actionItem';
import * as Seq from './seq/index';
import { T as UniqueId } from './uniqueId';
import { pipe } from './utility/pipe';
import { create as createView, T as View } from './view';

export interface T {
    readonly items: Map<UniqueId, ActionItem>;
    readonly view: View;
}

export function create(props: {
    items: Map<UniqueId, ActionItem> | undefined;
    view: View | undefined
}): T {
    return {
        items: props.items || sampleActions(),
        view: props.view || createView()
    };
}

const sampleActions = pipe(
    () => Seq.fromGenerator(sampleActionsGenerator),
    i => Seq.map(i, j => [j.uniqueId, j] as [UniqueId, ActionItem]),
    i => new Map(i));

function* sampleActionsGenerator() {
    yield createActionItem({ title: "Change the light bulbs" });
    yield createActionItem({ title: "Empty the fridge" });
    yield createActionItem({ title: "Work out in the gym", isImportant: true });
    yield createActionItem({ title: "Check tire pressure", isComplete: true });
}