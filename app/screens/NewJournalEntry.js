import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NewJournalEntry = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
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
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleSave = () => {
    console.log('Saving:', { title, entry });
    // You can add API call or AsyncStorage save logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
      <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.goBack()} />
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerText}>New Journal Entry</Text>
        </SafeAreaView>
      </SafeAreaView>

      <SafeAreaView style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </SafeAreaView>

      <TextInput
        style={styles.titleInput}
        placeholder="Title..."
        value={title}
        onChangeText={setTitle}
      />

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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
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
  titleInput: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'top',
    backgroundColor: '#EDEDED',
    borderRadius: 15,
    padding: 10,
    height: 200,
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
  saveButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewJournalEntry;
