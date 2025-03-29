import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useRoute } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';

const tracks = [
  {
    id: '1',
    title: 'Rainforest Sounds',
    url: require('../sounds/rainforest.mp3'), //https://www.youtube.com/watch?v=Uv7AHRSX08c&ab_channel=RelaxingNatureSounds
  },
  {
    id: '2',
    title: 'Waterfall Sounds',
    url: require('../sounds/waterfall.mp3'),
  },
  {
    id: '3',
    title: 'Mindfulness Meditation',
    url: require('../sounds/mindfulnessmeditation.mp3'), //https://www.youtube.com/watch?v=ZToicYcHIOU&ab_channel=Calm
  },
  {
    id: '4',
    title: 'Ocean Waves',
    url: require('../sounds/oceanwaves.mp3'), //https://www.youtube.com/watch?v=mxXV7pKD3nk&ab_channel=EpidemicAmbience
  },
  {
    id: '5',
    title: 'Calm Rain',
    url: require('../sounds/calmrain.mp3'), //https://www.youtube.com/watch?v=HbVYuPogyP0
  },
  {
    id: '6',
    title: 'Relaxing Piano',
    url: require('../sounds/relaxingpiano.mp3'), //https://www.youtube.com/watch?v=t6chiIXXAxg&ab_channel=Wawa
  },
];

const Meditate = ({user, isGuest}) => {
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //timer
  const [timeRemaining, setTimeRemaining] = useState(0); 
  const [timerInterval, setTimerInterval] = useState(null); 
  const [isTimePlaying, setIsTimePlaying] = useState(false); 
  const [selectedTime, setSelectedTime] = useState(null); 

  async function playSound(track) {
    if (!user && isGuest) {
      Alert.alert("Login Required", "You need to log in to play sounds!");
      return; 
    }

    console.log(`Playing track: ${track.title}`);
    setIsLoading(true);

    if (sound && currentTrack.title !== track.title) {
      await sound.stopAsync(); // Stop current track
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      track.url,
      { shouldPlay: true }
    );
    setSound(newSound);
    setCurrentTrack(track);
    setIsPlaying(true);
    setIsLoading(false);

    newSound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        console.log(`Track finished: ${track.title}`);
        setIsPlaying(false);
      }
    });
    console.log(`Track started: ${track.title}`);
  }

  const playPauseToggle = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        console.log(`Track paused: ${currentTrack.title}`);
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        console.log(`Track resumed: ${currentTrack.title}`);
        setIsPlaying(true);
      }
    }
  };

  const skipToPrevious = async () => {
    const currentIndex = tracks.findIndex((t) => t.title === currentTrack.title);
    if (currentIndex > 0) {
      const playSound = tracks[currentIndex - 1];
      console.log(`Skipping to previous track: ${prevTrack.title}`); 
      playSound(prevTrack);
    }
  };
  
  const skipToNext = async () => {
    const currentIndex = tracks.findIndex((t) => t.title === currentTrack.title);
    const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    const nextTrack = tracks[nextIndex];
    console.log(`Skipping to next track: ${nextTrack.title}`); 
    playSound(nextTrack);   
  };
  
  const renderTrackItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.trackButton}
      onPress={() => playSound(item)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
  
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.stopAsync();  
          sound.unloadAsync(); 
          setSound(null); 
          setIsPlaying(false);
          console.log("Track Ended as Screen exited");
        }
      };
    }, [sound]),
  );
  

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

//timer
  const startTimer = (time) => {
    if (selectedTime > 0) {
      setIsTimePlaying(true);
      setTimeRemaining(time);

      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsTimePlaying(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setTimerInterval(interval);
    }
  };

  const handleTimeButtonPress = (timeInMinutes) => {
    const timeInSeconds = timeInMinutes * 60;
    setSelectedTime(timeInSeconds);
    startTimer(timeInSeconds);  
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setIsTimePlaying(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval); 
    };
  }, [timerInterval]);

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
            <Text style={styles.headerText}>Meditation Zone</Text>
          </SafeAreaView>
        <FontAwesome5 name="music" size={24} color="black" />
      </SafeAreaView>

      <Text style={styles.sectionTitle}>Sound Player</Text>
      <SafeAreaView style={styles.playerContainer}>
        <SafeAreaView style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={skipToPrevious}>
            <FontAwesome5 name="backward" style={styles.controlIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={playPauseToggle}>
            <FontAwesome5 name={isPlaying ? 'pause' : 'play'} style={styles.controlIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={skipToNext}>
            <FontAwesome5 name="forward" style={styles.controlIcon} />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.progressBar} />

          <FlatList
            data={tracks}
            keyExtractor={(item) => item.id} 
            renderItem={renderTrackItem} 
            style={styles.trackList}
          />
          {isLoading ? (
              <Text>Loading sound...</Text>
          ) : (
              currentTrack && <Text>Now Playing: {currentTrack.title}</Text>
          )}
      </SafeAreaView>

      <SafeAreaView style={styles.playerContainer}>
        <Text style={styles.headerText}>Meditation Timer</Text>
        <SafeAreaView style={styles.timeButtons}>
          <TouchableOpacity onPress={() => handleTimeButtonPress(5)} style={styles.timeButton}>
            <Text style={styles.timeButtonText}>5 Mins</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeButtonPress(10)} style={styles.timeButton}>
            <Text style={styles.timeButtonText}>10 Mins</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeButtonPress(15)} style={styles.timeButton}>
            <Text style={styles.timeButtonText}>15 Mins</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView style={styles.timerContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={isTimePlaying ? pauseTimer : startTimer}>
          <FontAwesome5 name={isTimePlaying ? 'pause' : 'play'} style={styles.controlIcon} />
        </TouchableOpacity>
        
        <SafeAreaView style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </SafeAreaView>
      </SafeAreaView>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  playerContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  timerContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop:100,
    paddingLeft: 20, 
    paddingRight: 20, 
    color: '#4A4A4A', 
  },

  nowPlaying: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  musicIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  progressBar: {
    height: 3,
    width: '80%',
    backgroundColor: '#000',
    marginVertical: 8,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    backgroundColor: '#E6ECF0',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  controlButton: {
    padding: 15,
  },
  controlIcon: {
    fontSize: 24,
    color: '#000',
  },
  trackListContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  trackButton: {
    backgroundColor: '#E6ECF0',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  trackList: { 
    marginBottom: 5,
  },
  timeButtons: {
    flexDirection: 'row',  
    justifyContent: 'space-evenly',  
    alignItems: 'center',  
    width: '100%',  
    marginBottom: 10,  
  },
  timeButton: {
    width: 70,  
    height: 70,  
    backgroundColor: 'lightblue',  
    borderRadius: 35,  
    justifyContent: 'center',  
    alignItems: 'center',  
    marginTop:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  timeButtonText: {
    fontSize: 12,
    color: '#000',
  },
  
});

export default Meditate;