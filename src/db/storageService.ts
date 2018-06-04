import Dexie from "dexie";
import "dexie-observable";
import { Observable, Subject } from "rxjs";
import * as UniqueId from "src/state/uniqueId";
import * as Option from "src/utility/option";

interface ActionItem {
  readonly id: string;
  readonly title: string;
  readonly isImportant: boolean;
  readonly isComplete: boolean;
}

type RowChangeType = "Inserted" | "Updated" | "Deleted";

type TableName = "ActionItem";

const insertedRow = <Change extends RowChangeType & "Inserted", Table extends TableName, Row extends Option.Some>(
  type: Change,
  table: Table,
  current: Row
) => ({ type, table, current });
const deletedRow = <Change extends RowChangeType & "Deleted", Table extends TableName, Row extends Option.Some>(
  type: Change,
  table: Table,
  deleted: Row
) => ({ type, table, deleted });
const modifiedRow = <Change extends RowChangeType & "Updated", Table extends TableName, Row extends Option.Some>(
  type: Change,
  table: Table,
  current: Row,
  previous: Row
) => ({ type, table, current, previous });

type RowChangeTypeUnion<Map extends { [actionKey: string]: (...args: any[]) => any }> = ReturnType<Map[keyof Map]>;

const rowChangeFactory = {
  actionItem_insert: (item: ActionItem) => insertedRow("Inserted", "ActionItem", item),
  actionItem_delete: (item: ActionItem) => deletedRow("Deleted", "ActionItem", item),
  actionItem_update: (current: ActionItem, previous: ActionItem) =>
    modifiedRow("Updated", "ActionItem", current, previous)
};

export type RowChange = RowChangeTypeUnion<typeof rowChangeFactory>;

export interface StorageService {
  changes$: Observable<ReadonlyArray<RowChange>>;
  saveActionItem(actionItem: ActionItem): Promise<void>;
  toggleCompleted(id: UniqueId.T): Promise<void>;
  toggleImportant(id: UniqueId.T): Promise<void>;
  getAllActionItems(): Promise<ReadonlyArray<ActionItem>>;
  deleteActionItem(id: string): Promise<void>;
  clearAll(): Promise<void>;
}

export function createStorageService(): StorageService {
  const rowChanges = new Subject<ReadonlyArray<RowChange>>();
  const db = new LocalIndexedDatabase();
  db.on("changes", (changes: any) => {
    const result = changes.map((change: any) => {
      const table: TableName | undefined = change.table === "actionItems" ? "ActionItem" : undefined;
      if (table === undefined) {
        throw new Error("Did not recognize the table name.");
      }
      const changeType: RowChangeType | undefined =
        change.type === 1 ? "Inserted" : change.type === 2 ? "Updated" : change.type === 3 ? "Deleted" : undefined;
      if (changeType === undefined) {
        throw new Error("Did not recognize the type of row change.");
      }
      const current: any = changeType === "Inserted" || changeType === "Updated" ? change.obj : undefined;
      const previous: any = changeType === "Updated" || changeType === "Deleted" ? change.oldObj : undefined;
      switch (table) {
        case "ActionItem": {
          switch (changeType) {
            case "Inserted":
              return rowChangeFactory.actionItem_insert(current);
            case "Updated":
              return rowChangeFactory.actionItem_update(current, previous);
            case "Deleted":
              return rowChangeFactory.actionItem_delete(previous);
          }
        }
        default:
          throw new Error("Could not convert the database change to a strongly typed object.");
      }
    });
    rowChanges.next(result);
  });

  return {
    changes$: rowChanges,
    saveActionItem: async (actionItem: ActionItem) => {
      await db.transaction("rw", db.actionItems, async () => {
        await db.actionItems.put(actionItem);
      });
    },
    toggleCompleted: async (id: UniqueId.T) => {
      const current = await db.actionItems.get(id);
      if (current !== undefined) {
        const updated = { ...current, isComplete: !current.isComplete };
        await db.actionItems.put(updated);
      }
    },
    toggleImportant: async (id: UniqueId.T) => {
      const current = await db.actionItems.get(id);
      if (current !== undefined) {
        const updated = { ...current, isImportant: !current.isImportant };
        await db.actionItems.put(updated);
      }
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
    super("gtdlocaldatabase6");
    this.version(1).stores({
      actionItems: "id, title, isImportant, isComplete"
    });
    this.version(2).stores({});
  }
}
