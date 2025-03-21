import React, { useState, useEffect } from 'react';
import {Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView , Alert} from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveJournalEntry, setupDatabase , updateJournalEntry, deleteJournalEntry} from '../JournalDatabase';

const NewJournalEntry = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState(existingEntry ? existingEntry.title : '');  
  const [entry, setEntry] = useState(existingEntry ? existingEntry.entry : '');  
  const [date, setDate] = useState(existingEntry?.date || '');
  const [time, setTime] = useState(existingEntry?.time || '');

  const route = useRoute();
  const { existingEntry, refreshEntries } = route.params || {}; 
  useEffect(() => {
    if (existingEntry) {
      console.log('Existing Entry:', existingEntry);  
      setTitle(existingEntry.title);
      setEntry(existingEntry.entry);
      setDate(existingEntry.date);
      setTime(existingEntry.time);
    }
  }, [existingEntry]);

  useEffect(() => {
    setupDatabase();
    const currentDate = new Date();
    setDate(currentDate.toLocaleDateString('en-GB'));
    setTime(currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const handleSave = async () => {
    if (!title || !entry) {
      Alert.alert("Error", "Title and entry cannot be empty.");
      return;
    }
    navigation.navigate("HomeTabs", { screen: "Journal" });

    try {
      const currentDate = new Date().toLocaleDateString('en-GB');
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (existingEntry) {
        await updateJournalEntry(existingEntry.id, title, entry, existingEntry.date, existingEntry.time);
        Alert.alert("Success", "Journal entry updated!");
      }else{
        await saveJournalEntry(title, entry, currentDate, currentTime);
        Alert.alert("Success", "Journal entry saved!");
      }

      navigation.navigate("HomeTabs", { screen: "Journal" })
    } 
    catch (error) {
      Alert.alert("Error", "There was an issue saving your entry.");
      console.error("Error saving journal entry:", error);
    }
  };
  
  useEffect(() => {
    if (existingEntry) {
      setDate(existingEntry.date); 
      setTime(existingEntry.time); 
    } else {
      const updateDateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        const formattedTime = now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
  
        setDate(formattedDate);
        setTime(formattedTime);
      };
  
      updateDateTime(); 
      const interval = setInterval(updateDateTime, 1000);  
      return () => clearInterval(interval); 
    }
  }, [existingEntry]); 
  

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
      <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate("HomeTabs", { screen: "Journal" })} />
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerText}>New Journal Entry</Text>
        </SafeAreaView>
      </SafeAreaView>

      <SafeAreaView style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.titleContainer}>
        <TextInput
          placeholder="Title..."
          value={title}
          onChangeText={setTitle}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.entryContainer}>
        <TextInput
          style={styles.entryInput}
          placeholder="What's on your mind?"
          value={entry}
          onChangeText={setEntry}
          multiline
        />
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic-outline" size={24} color="black" />
        </TouchableOpacity>
      </SafeAreaView>

      <TouchableOpacity style={styles.twoButtons} onPress={() => {handleSave(); navigation.navigate("HomeTabs", { screen: "Journal" })}}>
        <Text style={styles.twoButtonsText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.twoButtons} onPress={() => {
        Alert.alert("Delete Entry","Are you sure you want to delete this entry?",[
            {text: "Cancel",style: "cancel"},
            { text: "Yes", onPress: async () => {
              try {
                if (existingEntry) {
                  await deleteJournalEntry(existingEntry.id); 
                }
                setTitle('');setEntry('');setDate('');setTime('');
                Alert.alert("Success", "Entry deleted."); 
                navigation.navigate("HomeTabs", { screen: "Journal" })
              } catch (error) {
                Alert.alert("Error", "There was an issue deleting the entry.");
                console.error("Error deleting journal entry:", error);
              }
            }
          }
        ]);
      }}>

  <Text style={styles.twoButtonsText}>Delete All Data</Text>
  
</TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 120,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  headerContainer: {
    position: 'absolute',  // Ensures it sticks to the top
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
  backButton: {
    marginRight: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  titleContainer: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,    
  },

  entryContainer: {
    flexDirection: 'row',
    alignItems: 'top',
    marginBottom:30,
    backgroundColor: '#EDEDED',
    borderRadius: 15,
    padding: 10,
    height: 400,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  entryInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical:'top',
    paddingTop: 10,
  },
  micButton: {
    padding: 10,
  },
  twoButtons: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: 250,
    alignSelf: 'center',
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  twoButtonsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewJournalEntry;
