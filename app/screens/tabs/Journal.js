import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import { Entypo, AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getJournalEntry, saveJournalEntry } from '../../JournalDatabase';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';


const JournalScreen = () => {
  const navigation = useNavigation();
  const [journalEntries,setJournalEntries] = useState([]);
  
  const loadEntries = async () => {
    try {
      const data = await getJournalEntry(); 
      if (data && data.length > 0) {
        console.log("Fetched journal entries:", data);
        const validEntries = data.map((item, index) => ({
          ...item,
          id: item.id ? item.id.toString() : index.toString(), 
        }));
        setJournalEntries(validEntries);
      } else {
        console.log("No journal entries found.");
        setJournalEntries([]); 
      }
    } catch (error) {
      console.error("Error loading journal entries:", error);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <LinearGradient
      colors={['lightyellow', '#B5FFFC','pink','#FFCB77']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>

    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerText}>My Journal</Text>
        </SafeAreaView>
      <FontAwesome5 name="book" size={24} color="black" />
      </SafeAreaView>

      <SafeAreaView style={styles.contentContainer}>
        <TouchableOpacity style={styles.newEntryButton} onPress={() => navigation.navigate("NewJournalEntry")}>
          <Text style={styles.newEntryText}>Start a New Entry</Text>
          <AntDesign name="pluscircleo" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Journal Entries</Text>

        <FlatList
          data={journalEntries}
          keyExtractor={(item) => item.id.toString()}  
          renderItem={({ item }) => (

              <View style={styles.entryContainer}>
                <View style={styles.entryIcon} />
                <Text style={styles.entryText}>{item.date} | {item.title}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('NewJournalEntry', { existingEntry: item})}>
                  <FontAwesome name="pencil" size={18} color="black" />
                </TouchableOpacity>
              </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
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
  contentContainer: {
    flex: 1,
    paddingTop: 90, 
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
  },
  newEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 10,
    marginVertical: 15,
  },
  newEntryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  entryIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginRight: 10,
  },
  entryText: {
    flex: 1,
    fontSize: 16,
  },
});

export default JournalScreen;
