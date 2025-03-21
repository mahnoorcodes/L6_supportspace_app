import * as SQLite from 'expo-sqlite';
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';


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
          userId TEXT NOT NULL,
          title TEXT, 
          entry TEXT, 
          date TEXT, 
          time TEXT
        );
      `);
      console.log("Table created successfully");
      const result = await dbInstance.getAllAsync("PRAGMA table_info(journal_entries);");
      console.log("Table schema:", result);
      
    } catch (error) {
      console.error("Error opening database", error);
    }
  }
  return dbInstance;
};

export const saveJournalEntry = async (title, entry, date, time) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Login to save your entries!');
      console.log('No user is logged in');
      return;
    }
  
    const userId = user.uid; // Get Firebase user ID
    const db = await setupDatabase();
    if (!db) return;
  
    try {
      await db.runAsync(
        `INSERT INTO journal_entries (userId, title, entry, date, time) VALUES (?, ?, ?, ?, ?);`,
        [userId, title, entry, date, time]
      );
      console.log("Journal entry saved!");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };
  
  export const getJournalEntry = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Login to save your entries!');
      console.error('No user is logged in');
      return [];
    }

    const userId = user.uid;
    const db = await setupDatabase();
    if (!db) return [];

    try {
        const result = await db.getAllAsync( `SELECT * FROM journal_entries WHERE userId = ? ORDER BY date DESC, time DESC;`,
        [userId]
        );
        console.log("Journal entries for user ${userId}:", result);
        
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
      const auth = getAuth();
      const user = auth.currentUser;
    
      if (!user) {
        console.error("No user is logged in");
        return;
      }    
      const userId = user.uid;
      const db = await setupDatabase(); 
      if (!db) {
        console.error("Database is not initialized!");
        return;
      }
    
      try {
        await db.runAsync(
          "UPDATE journal_entries SET title = ?, entry = ?, date = ?, time = ? WHERE id = ? AND userId = ?",
          [title, entry, date, time, id, userId]
        );
        console.log("Entry updated successfully!");
      } catch (error) {
        console.error("Error updating journal entry:", error);
      }
    };
    
  export const deleteJournalEntry = async (id) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('No user is logged in');
      return;
    }

    const userId = user.uid;
    const db = await setupDatabase();
    if (!db) return;
  
    try {
      await db.runAsync(`DELETE FROM journal_entries WHERE id = ? AND userId = ?;`, [id, userId]);
      console.log("Journal entry deleted!");
    } catch (error) {
      console.error("Error deleting journal:", error);
    }
  };
  
  