import Dexie from 'dexie'

export interface ActionItem {
    readonly id: string;
    readonly title: string;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
}

export interface StorageService {
    SaveActionItem(actionItem: ActionItem): Promise<void>;
    GetAllActionItems(): Promise<ReadonlyArray<ActionItem>>;
    ClearAll(): Promise<void>;
}

export function createStorageService(): StorageService {
    const db = new LocalIndexedDatabase();
    return {
        SaveActionItem: async (actionItem: ActionItem) => {
            await db.actionItems.put(actionItem);
        },
        GetAllActionItems: async () => {
            return db.actionItems.toArray();
        },
        ClearAll: async () => {
            await db.transaction("rw", db.actionItems, async () => {
                await db.actionItems.clear();
            });
        }
    };
}

class LocalIndexedDatabase extends Dexie {
    public actionItems: Dexie.Table<ActionItem, string>;

    constructor() {
        super("gtdlocaldatabase");

        this.version(1).stores({
            actionItems: 'id, title, isImportant, isComplete'
        });
    }
}