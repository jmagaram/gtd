import { create as createActionItem, T as ActionItem } from './actionItem';
import { map } from './iter/map';
import { pipe } from './pipe';
import { T as UniqueId } from './uniqueId';
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
        items: props.items || sampleActionsMap,
        view: props.view || createView()
    };
}

const sampleActionsMap = pipe(
    () => sampleActions(),
    i => map(i, j => [j.uniqueId, j] as [UniqueId, ActionItem]),
    i => new Map(i)
);

function* sampleActions() {
    yield createActionItem({ title: "Change the light bulbs" });
    yield createActionItem({ title: "Empty the fridge" });
    yield createActionItem({ title: "Work out in the gym", isImportant: true });
    yield createActionItem({ title: "Check tire pressure", isComplete: true });
}