import React, {useEffect} from 'react';
import { View, SafeAreaView,Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Dimensions} from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = ({ user, isGuest }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width; 

  const handleMoodPress = (mood) => {
    console.log(`Mood selected: ${mood}`);
  };

    return (
      <ImageBackground source={require('../../assets/bg.png')} style={styles.backgroundImage} resizeMode='cover'>    
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.headerContainer}>
          <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate("Welcome")} />
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
              {['Happy', 'Sad', 'Angry', 'Calm'].map((mood) => (
                <TouchableOpacity key={mood} style={styles.moodButton} onPress={() => handleMoodPress(mood)}>
                  <Text style={styles.moodText}>{mood}</Text>
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
      fontSize: 22, 
      fontWeight: 'bold', 
      marginBottom: 20,
      paddingTop: 100,  
      justifyContent:'center',
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
    moodContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 2,
    },
    toolButtonText: {
      color: '#000',
      fontSize: 16,
      marginLeft: 5,
    },
  });

export default Home;