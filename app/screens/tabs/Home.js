import React, {createContext, useContext, useEffect, useState} from 'react';
import { View, SafeAreaView,Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Dimensions} from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addMoodToDB, getMoodHistory } from '../../MoodsDatabase'; 

const moods = [
  { icon: "smile", label: "Happy" },
  { icon: "meh", label: "Neutral" },
  { icon: "frown", label: "Sad" },
  { icon: "angry", label: "Angry" },
];

const Home = ({ user, isGuest }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width; 

  const handleMoodPress = async (mood) => {
    if (user) {
      const userId = user.uid;  
      console.log("Mood before navigating:", mood); 
      await addMoodToDB(mood.label, mood.icon);  
      console.log(`Mood (Home)'${mood.label}' added to the database!`);
      navigation.navigate("Moods", { mood });
    } else {
      console.log("User not logged in.");
      Alert.alert("Log in to save your moods!");
    }
  };

    return (
      <ImageBackground source={require('../../assets/bg.png')} style={styles.backgroundImage} resizeMode='cover'>    
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.headerContainer}>
          <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headerText}>Support Space</Text>
          </SafeAreaView>
          <FontAwesome5 name="heart" size={24} color="black" />
        </SafeAreaView>

          {user ? (
            <Text style={styles.greeting}>Welcome, {user.displayName}</Text>
          ) : (
            <Text style={styles.greeting}>Welcome, Guest</Text>
          )}
            
          <SafeAreaView style={styles.container}>
            <Text style={styles.header}>How are you feeling today?</Text>
            <SafeAreaView style={styles.moodContainer}>
            {moods.map((mood) => (
              <TouchableOpacity key={mood.label} style={styles.moodButton} onPress={() => handleMoodPress(mood)}>
                <FontAwesome5 name={mood.icon} size={28} color="#333" />
              </TouchableOpacity>
            ))}
          </SafeAreaView>

            <Text style={styles.header}>Wellness Tools</Text>
            <SafeAreaView style={styles.toolsContainer}>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Meditate')}>
                <FontAwesome5 name="music" size={20} />
                <Text style={styles.toolButtonText}>Meditate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Mindfulness')}>
                <FontAwesome5 name="wind" size={20} />
                <Text style={styles.toolButtonText}>Mindfulness</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Moods')}>
                <FontAwesome5 name="smile" size={20} />
                <Text style={styles.toolButtonText}>Moods</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
      </ImageBackground>
    );
  };

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1, 
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    container: {
      flex: 1,
      padding: 20,
    },
    greeting: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 20,
      marginTop: 100,  
      justifyContent:'center',
      color: '#4A4A4A', 
      textShadowRadius: 4,
      letterSpacing: 1.2, 
      borderWidth: 2, 
      borderColor: 'white', 
      borderRadius: 10, 
      backgroundColor:'white',
      paddingHorizontal: 15, 
      alignSelf: 'center', 
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 3,
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
      marginLeft: 10,
      
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      color: '#4A4A4A'
    },
    moodCard: {
      backgroundColor: '#FFF',
      padding: 20,
      borderRadius: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    moodLabel: {
      marginTop: 5,
      fontSize: 14,
      color: "#333",
      textAlign: "center",
    },
    moodContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom:60,
    },
    moodButton: {
      padding: 15,
      backgroundColor: '#FFF',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 2,
    },
    toolsCard: {
      backgroundColor: '#EAEAEA',
      padding: 20,
      borderRadius: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 3,
    },
    toolsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    toolButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#FFF',
      borderRadius: 10,
      width: '48%',
      marginBottom: 10,
      justifyContent: 'flex-start',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 2,
    },
    toolButtonText: {
      color: '#4A4A4A',
      fontSize: 16,
      marginLeft: 10,
      paddingLeft:3,
      textAlign:'center',
      alignSelf:'center'
    },
  });

export default Home;