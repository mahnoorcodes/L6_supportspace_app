import React, { useEffect, useState} from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth} from '../config/firebaseConfig'; 
import { onAuthStateChanged, getAuth } from 'firebase/auth'; 
import { addMoodToDB, getMoodHistory } from '../MoodsDatabase'; 

const Moods = ({mood}) => {
  const navigation = useNavigation();
  const [moodHistory, setMoodHistory] = useState([]);
  const [user, setUser] = useState(null); 

    useEffect(() => {
      console.log("Mood History Updated:", moodHistory);
    }, [moodHistory]);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = auth.currentUser;
        console.log("Current User:", currentUser); 
        if (currentUser) {
          setUser(currentUser); 
        } else {
          setUser(null); 
          console.log("User not logged in.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);  

  const fetchMoodHistory = async () => {
      try {
        const data = await getMoodHistory(); 
        if (data && data.length > 0) {
          console.log("Mood History:", data);
          const history = data.map((item, index) => ({
            mood: item.mood,
            date: item.date,
            id: item.id ? item.id.toString() : index.toString(),  // Ensure id is a string
        }));
        setMoodHistory(history);
        } else {
          console.log("No mood history found.");
          setMoodHistory([]); 
        }
      } catch (error) {
        console.error("Error mood history:", error);
      }
    };
  
    useEffect(() => {
      fetchMoodHistory();
    }, []);

  return (
    <LinearGradient
      colors={['lightyellow', '#B5FFFC', 'pink', '#FFCB77']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.headerContainer}>
          <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate("HomeTabs")} />
          <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headerText}>My Moods</Text>
          </SafeAreaView>
          <FontAwesome5 name="smile" size={24} color="black" />
        </SafeAreaView>

        <Text style={styles.sectionTitle}>Your Mood History </Text>
        <SafeAreaView style={styles.moodHistory}>
          {moodHistory.length === 0 ? (
          <Text style={{padding:10, textAlign:'center', backgroundColor:"white", color: '#4A4A4A'}}>No mood history found</Text>
        ) : (
          <FlatList
          data={moodHistory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, backgroundColor:'white' }}>
              <Text style={{ fontSize: 16 }}>Mood: {item.mood}</Text>
              <Text style={{ color: "gray" }}>Date: {item.date}</Text>
            </View>
          )}/>    
        )}
        </SafeAreaView>
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
    color: '#4A4A4A', 
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop:100,
    paddingLeft: 20, 
    paddingRight: 20, 
    color: '#4A4A4A', 
  },
  moodHistory:{
    backgroundColor: "white", 
    padding: 20, 
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
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