import Dexie from 'dexie'

export interface ActionItem {
    readonly id: string;
    readonly title: string;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
}

export interface StorageService {
    saveActionItem(actionItem: ActionItem): Promise<void>;
    getAllActionItems(): Promise<ReadonlyArray<ActionItem>>;
    deleteActionItem(id: string): Promise<void>;
    clearAll(): Promise<void>;
}

export function createStorageService(): StorageService {
    const db = new LocalIndexedDatabase();
    return {
        saveActionItem: async (actionItem: ActionItem) => {
            await db.actionItems.put(actionItem);
        },
        getAllActionItems: async () => {
            return db.actionItems.toArray();
        },
        clearAll: async () => {
            await db.transaction("rw", db.actionItems, async () => {
                await db.actionItems.clear();
            });
        },
        deleteActionItem: async (id: string) => {
            await db.actionItems.delete(id);
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