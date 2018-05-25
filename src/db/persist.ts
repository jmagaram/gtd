import Dexie from 'dexie'

type RowState =
    "Inserted" |
    "Deleted" |
    "Modified" |
    "Unchanged"

interface TrackedRow {
    readonly rowState: RowState;
}

interface ActionItem extends TrackedRow {
    readonly uniqueId: string;
    readonly title: string;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
    readonly purgePercentComplete?: number;
}
