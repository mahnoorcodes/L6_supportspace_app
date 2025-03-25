import React, { useState, useEffect, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';  // Importing expo-av to use for audio recording
import * as FileSystem from 'expo-file-system'; // Import FileSystem
const NewJournalEntry = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState(existingEntry ? existingEntry.title : '');
  const [entry, setEntry] = useState(existingEntry ? existingEntry.entry : '');
  const [date, setDate] = useState(existingEntry?.date || '');
  const [time, setTime] = useState(existingEntry?.time || '');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const route = useRoute();
  const { existingEntry, refreshEntries } = route.params || {};

  const audio = useRef(new Audio.Sound());  // Reference to hold the audio object

  // Handle microphone recording
  const handleRecord = async () => {
    try {
      if (isRecording) {
        await stopRecording();
      } else {
        await startRecording();
      }
    } catch (error) {
      console.error("Error during recording:", error);
      Alert.alert("Error", "There was an issue with the recording.");
    }
  };

  // Start recording function
  const startRecording = async () => {
    try {
      // Request microphone permissions
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Denied", "You need to grant microphone access.");
        return;
      }
  
      // Stop any existing recording before starting a new one
      if (recording) {
        console.log("Stopping existing recording before starting a new one...");
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }
  
      // Create a new recording instance
      const newRecording = new Audio.Recording();
  
      // Prepare recording options
      const recordingOptions = {
        android: {
          extension: ".m4a",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
      };
  
      // Prepare and start recording
      await newRecording.prepareToRecordAsync(recordingOptions);
      await newRecording.startAsync();
  
      // Update state
      setRecording(newRecording);
      setIsRecording(true);
  
      console.log('Recording started');
    } catch (error) {
      console.error("Error starting recording:", error);
      Alert.alert("Error", "Failed to start recording.");
    }
  };
  

  // Stop recording function and send the audio to the API
  const stopRecording = async () => {
    try {
      if (!recording) return;
  
      console.log("Stopping recording...");
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
  
      const uri = recording.getURI();
      setRecording(null);  // Reset state
  
      sendToSpeechAPI(uri);
      console.log("Recorded file URI:", uri);

    } catch (error) {
      console.error("Error stopping recording:", error);
      Alert.alert("Error", "There was an issue stopping the recording.");
    }
  };
  
  // Send the audio to the Speech-to-Text API
  const sendToSpeechAPI = async (audioUri) => {
    try {
      if (!audioUri) {
        Alert.alert("Error", "No audio file found.");
        return;
      }
  
      // Read file as Base64
      const base64Audio = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const myHeaders = new Headers();
      myHeaders.append("x-apihub-key", "yaA23SgGkcidePIT5yaX8IVU4baVTSVRYqZpk5oyv77Co73QLg");
      myHeaders.append("x-apihub-host", "AI-Transcription-Speech-To-Text.allthingsdev.co");
      myHeaders.append("x-apihub-endpoint", "16ddfb89-e88e-4f1e-bbd4-0734e6fbbb75");
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        audioBase64: base64Audio, // ✅ Send Base64 encoded audio
        language: "en-US"
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const apiResponse = await fetch(
        "https://AI-Transcription-Speech-To-Text.proxy-production.allthingsdev.co/api/rapidapi/speechtotext", 
        requestOptions,
      );
  
      const result = await apiResponse.json();
      
      console.log("API Response:", result);
  
      if (result && result.transcription) {
        setEntry(result.transcription); // ✅ Set transcribed text as journal entry
      } else {
        Alert.alert("Error", "Failed to transcribe speech. API did not return a transcription.");
      }
    } catch (error) {
      console.error("Error with Speech-to-Text API:", error);
      Alert.alert("Error", "There was an issue with transcription.");
    }
  };

  // Save the journal entry
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
      } else {
        await saveJournalEntry(title, entry, currentDate, currentTime);
        Alert.alert("Success", "Journal entry saved!");
      }

      navigation.navigate("HomeTabs", { screen: "Journal" });
    } catch (error) {
      Alert.alert("Error", "There was an issue saving your entry.");
      console.error("Error saving journal entry:", error);
    }
  };

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
        <TouchableOpacity style={styles.micButton} onPress={handleRecord}>
          <Ionicons name={isRecording ? "mic" : "mic-outline"} size={24} color="black" />
        </TouchableOpacity>
      </SafeAreaView>

      <TouchableOpacity style={styles.twoButtons} onPress={handleSave}>
        <Text style={styles.twoButtonsText}>Save</Text>
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
