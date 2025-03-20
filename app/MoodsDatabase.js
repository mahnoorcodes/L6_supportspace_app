import * as SQLite from 'expo-sqlite';
import { getAuth } from 'firebase/auth';
let dbInstance = null; // Global variable to store the database
  
export const setupDatabase = async () => {
  if (!dbInstance) {
    try {
    //await dropMoodsTable();
      console.log("Opening database...");
      dbInstance = await SQLite.openDatabaseAsync('moods.db');
      console.log("Database opened:", dbInstance);

      await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS moods (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT NOT NULL,
          mood TEXT,
          icon TEXT,
          date TEXT
        );
      `);
      console.log("Table created successfully");
    } catch (error) {
      console.error("Error opening database", error);
    }
  }
  return dbInstance;
};

export const addMoodToDB = async (mood, icon) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        console.error("User is not logged in!");
        return;
      }
    const userId = user.uid; // Get Firebase user ID
    const db = await setupDatabase();

  if (!db) return;
  const date = new Date().toLocaleString();
  
  try {
    await db.runAsync(
      'INSERT INTO moods (mood, icon, date, userId) VALUES (?, ?, ?, ?)', 
      [mood, icon, new Date().toLocaleString(), userId]
    );
    console.log(`Mood '${mood}' added to the database for user ${user.uid}!!`);

  } catch (error) {
    console.error("Error adding mood:", error);
  }
};

export const getMoodHistory = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        console.error("User is not logged in!");
        return;
      }
    const userId = user.uid; // Get Firebase user 
    const db = await setupDatabase();
    if (!db) return [];
  
    try {
      console.log("Executing SQL Query for user:", userId);
  
      const result = await dbInstance.getAllAsync(
        `SELECT mood, date FROM moods WHERE userId = ? ORDER BY id DESC;`,
        [userId]
    );    
      console.log("Mood history fetched:", result);
  
      if (!result || !Array.isArray(result)) {
        console.error("Unexpected result format:", result);
        return [];
      }
      return result;
    } catch (error) {
      console.error("Error fetching mood history:", error);
      return [];
    }
  };  
  

export const deleteMood = async (id) => {
  const db = await setupDatabase();
  if (!db) return;

  try {
    await dbInstance.runAsync(`DELETE FROM moods WHERE id = ?;`, [id]);
    console.log("Mood deleted!");
  } catch (error) {
    console.error("Error deleting mood:", error);
  }
};

export const dropMoodsTable = async () => {
    const db = await setupDatabase();
    if (!db) return;
  
    try {
      await dbInstance.execAsync(`DROP TABLE IF EXISTS moods;`);
      console.log("Moods table dropped successfully!");
    } catch (error) {
      console.error("Error dropping moods table:", error);
    }
  };
  