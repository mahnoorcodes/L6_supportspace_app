import * as SQLite from 'expo-sqlite';

let dbInstance = null; // Global variable to store the database

export const setupDatabase = async () => {
  if (!dbInstance) {
    try {
      console.log("Opening database...");
      dbInstance = await SQLite.openDatabaseAsync('moods.db');
      console.log("Database opened:", dbInstance);

      await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS moods (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT,
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

export const addMoodToDB = async (userId, mood, icon) => {
  const db = await setupDatabase();
  if (!db) return;

  const date = new Date().toLocaleString();
  
  try {
    await db.runAsync(
      `INSERT INTO moods (userId, mood, icon, date) VALUES (?, ?, ?, ?);`,
      [userId, mood, icon, date]
    );
    console.log("Mood added successfully!");
  } catch (error) {
    console.error("Error adding mood:", error);
  }
};

export const getMoodHistory = async (userId) => {
  const db = await setupDatabase();
  if (!db) return [];
  
  try {
    const result = await db.getAllAsync(`SELECT * FROM moods WHERE userId = ? ORDER BY id DESC;`, [userId]);
    console.log("Mood history:", result);
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
    await db.runAsync(`DELETE FROM moods WHERE id = ?;`, [id]);
    console.log("Mood deleted!");
  } catch (error) {
    console.error("Error deleting mood:", error);
  }
};

