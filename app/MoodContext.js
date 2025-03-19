import React, { createContext, useState, useContext, useEffect } from "react";
import { setupDatabase, addMoodToDB, getMoodHistory } from "./MoodsDatabase";
import { Alert } from "react-native";

const MoodContext = createContext();

export const MoodProvider = ({ children, user, isGuest }) => {
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      await setupDatabase();
      const userId = isGuest ? "guest" : user?.uid;
      if (userId) {
        getMoodHistory(userId, setMoodHistory);
      } else {
        setMoodHistory([]); // Clear if no user
      }
    };
    fetchMoods();
  }, [user, isGuest]);

  const addMood = (mood) => {
    if (!user) {
      Alert.alert("Sign In Required", "Please sign in to track your moods.");
      console.log("No user logged in!");
      return;
    }
    const newMood = {
      id: Date.now().toString(),
      mood: mood.label,
      icon: mood.icon,
      date: new Date().toLocaleString(),
    };

    setMoodHistory((prevHistory) => [newMood, ...prevHistory]);
  };

  return (
    <MoodContext.Provider value={{ moodHistory, addMood }}> 
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};
