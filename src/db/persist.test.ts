import Dexie from 'dexie'
import * as ConfigureDexie from './configureDexie'
import * as Persist from './persist'

beforeAll(() => {
    ConfigureDexie.forNode();
});

afterAll(() => {
    // not sure this works, especially if tests running in parallel
    ConfigureDexie.forBrowser();
})

test("can save and load with dexie", async () => {
    class MyAppDatabase extends Dexie {
        public contacts: Dexie.Table<IContact, string>;

        constructor() {
            super("testdatabase");

            this.version(1).stores({
                contacts: 'id, first, last',
            });
        }
    }

    interface IContact {
        id: string; // Primary key.
        first: string; // First name
        last: string; // Last name
    }

    const db = new MyAppDatabase();
    db.contacts.put({ id: "1", first: "justin", last: "magaram" });
    db.contacts.put({ id: "2", first: "amy", last: "schot" });
    const c = await db.contacts.get("2");
    expect(c!.first).toBe("amy");
});