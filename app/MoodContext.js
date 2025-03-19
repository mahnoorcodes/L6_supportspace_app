import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMoodHistory, addMoodToDB } from './MoodsDatabase';

// Define the context
export const MoodContext = createContext();

// Custom hook to use the MoodContext
export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodContext.Provider');
  }
  return context;
};

// MoodProvider to wrap around components that need access to mood data
export const MoodProvider = ({ children }) => {
  const [moodHistory, setMoodHistory] = useState([]);

  // Fetch mood history when the component mounts
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const moods = await getMoodHistory();
        setMoodHistory(moods);
      } catch (error) {
        console.log('Error fetching moods:', error);
      }
    };

    fetchMoods();
  }, []);

  // Add a new mood to the history and update the state
  const addMood = async (mood) => {
    await addMoodToDB(mood);
    const updatedMoods = await getMoodHistory();
    setMoodHistory(updatedMoods);
  };

  return (
    <MoodContext.Provider value={{ moodHistory, addMood }}>
      {children}
    </MoodContext.Provider>
  );
};
