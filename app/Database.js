import * as SQLite from 'expo-sqlite';

let dbInstance = null; // Global variable to store the database

export const setupDatabase = async () => {
  if (!dbInstance) {
    try {
      console.log("Opening database...");
      dbInstance = await SQLite.openDatabaseAsync('journal.db');
      console.log("Database opened:", dbInstance);

      await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS journal_entries (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title TEXT, 
          entry TEXT, 
          date TEXT, 
          time TEXT
        );
      `);
      console.log("Table created successfully");
    } catch (error) {
      console.error("Error opening database", error);
    }
  }
  return dbInstance;
};

export const saveJournalEntry = async (title, entry, date, time) => {
    const db = await setupDatabase();
    if (!db) return;
  
    try {
      await db.runAsync(
        `INSERT INTO journal_entries (title, entry, date, time) VALUES (?, ?, ?, ?);`,
        [title, entry, date, time]
      );
      console.log("Journal entry saved!");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };
  
  export const getJournalEntry = async () => {
    const db = await setupDatabase();
    if (!db) return [];
    try {
        const result = await db.getAllAsync(`SELECT * FROM journal_entries;`);
        console.log("Journal entries:", result);
        
        if (!result || !Array.isArray(result)) {
          console.error("Unexpected result format:", result);
          return [];
        }        
        return result;
      } catch (error) {
        console.error("Error fetching journals:", error);
        return [];
      }
    };

    export const updateJournalEntry = async (id, title, entry, date, time) => {
        try {
          await db.transactionAsync(async (tx) => {
            await tx.executeSql(
              'UPDATE journal_entries SET title = ?, entry = ?, date = ?, time = ? WHERE id = ?',
                [title, entry, date, time, id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Entry updated successfully');
                    } else {
                        console.error('Failed to update the entry');
                    }
                }
            );
        });
          console.log("Journal entry updated successfully.");
        } catch (error) {
          console.error("Error updating journal entry:", error);
        }
      }; 

  export const deleteJournalEntry = async (id) => {
    const db = await setupDatabase();
    if (!db) return;
  
    try {
      await db.runAsync(`DELETE FROM journal_entries WHERE id = ?;`, [id]);
      console.log("Journal entry deleted!");
    } catch (error) {
      console.error("Error deleting journal:", error);
    }
  };
  