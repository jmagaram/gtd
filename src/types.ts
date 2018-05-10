import { T as UniqueId } from './uniqueId';
import * as Tagged from './tagged';

export type ActionItemTitle = Tagged.T<string, "actionItemTitle">;

export interface ActionItem {
    readonly uniqueId: UniqueId;
    readonly title: ActionItemTitle;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
}

export interface View {
    readonly onlyShowIncomplete: boolean;
    readonly onlyShowImportant: boolean;
}

export interface ApplicationState {
    readonly items: ReadonlyMap<UniqueId, ActionItem>;
    readonly view: View;
}