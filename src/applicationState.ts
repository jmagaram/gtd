import { T as UniqueId } from './uniqueId';
import { T as ActionItem, create as createActionItem } from './actionItem';
import { T as View, create as createView } from './view';
import * as Linq from './linq';

export interface T {
    readonly items: Map<UniqueId, ActionItem>;
    readonly view: View;
}

export function create(props: {
    items: Map<UniqueId, ActionItem> | undefined;
    view: View | undefined
}): T {
    return {
        items: props.items || Linq.toMap(sampleActions(), i => [i.uniqueId, i]),
        view: props.view || createView()
    };
}

function* sampleActions() {
    yield createActionItem({ title: "Change the light bulbs" });
    yield createActionItem({ title: "Empty the fridge" });
    yield createActionItem({ title: "Work out in the gym", isImportant: true });
    yield createActionItem({ title: "Check tire pressure", isComplete: true });
}