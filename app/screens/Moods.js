import React, {useEffect, useState} from 'react';
import { View, SafeAreaView,Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMood } from "../MoodContext";
import { addMoodToDB, getMoodHistory } from '../MoodsDatabase';

const moods = [
  { icon: "smile", label: "Happy" },
  { icon: "meh", label: "Neutral" },
  { icon: "frown", label: "Sad" },
  { icon: "angry", label: "Angry" },
];

const Moods = () => {
  const navigation = useNavigation();
  const { moodHistory, addMood } = useMood(); 

  return (
    <LinearGradient
      colors={['lightyellow', '#B5FFFC','pink','#FFCB77']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>

    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
      <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate("HomeTabs")} />
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerText}>My Moods</Text>
        </SafeAreaView>
        <FontAwesome5 name="smile" size={24} color="black" />
      </SafeAreaView>

      <Text style={styles.sectionTitle}>How are you feeling today?</Text>
      <View>
        {moods.map((mood) => (
          <TouchableOpacity key={mood.label} onPress={() => addMood(mood)}>
            <FontAwesome5 name={mood.icon} size={28} color="#333" />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle2}>Your Mood History</Text>
      <FlatList
        data={moodHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <View style={styles.historyContent}>
              <FontAwesome5 name={item.icon} size={20} color="#555" style={styles.historyIcon} />
              <Text style={styles.historyMood}>{item.mood.label}</Text> 
            </View>
          </View>
        )}
      />
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',  
    top: 0,
    left: 0,
    right: 0,
    width: 'screenWidth', 
    height: 90, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:40, 
    paddingHorizontal: 20, 
    backgroundColor: '#FFF', 
    zIndex: 100, 
  },   
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop:100,
    paddingLeft: 20, 
    paddingRight: 20, 
  },
  sectionTitle2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop:20,
    paddingLeft: 20, 
    paddingRight: 20, 
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
  },
  moodButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 28,
  },
  selectedMood: {
    backgroundColor: "white",
  },
  historyItem: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },
  historyDate: {
    fontSize: 14,
    color: "#888",
  },
  historyContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyMood: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default Moods;