import React, { createContext, useState, useContext } from "react";

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([
    { id: "1", mood: "Happy", icon: "smile", date: "Today" },
    { id: "2", mood: "Sad", icon: "frown", date: "Yesterday" },
  ]);

  const addMood = (mood) => {
    const newMood = {
      id: Date.now().toString(),
      mood: mood.label,
      icon: mood.icon,
      date: "Just now",
    };

    setMoodHistory((prevHistory) => [newMood, ...prevHistory]);
    setSelectedMood(mood);
  };

  return (
    <MoodContext.Provider value={{ selectedMood, moodHistory, addMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => useContext(MoodContext);
