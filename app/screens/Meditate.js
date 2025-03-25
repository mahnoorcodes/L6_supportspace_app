import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const tracks = [
  {
    id: '1',
    title: 'Rainforest Sounds',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Deep Breathing Guide',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Ocean Waves',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

const Meditate = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound(track) {
    if (sound) {
      await sound.unloadAsync(); // Stop current track
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: true }
    );
    setSound(newSound);
    setCurrentTrack(track);
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  }

  const playPauseToggle = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const skipToPrevious = async () => {
    const currentIndex = tracks.findIndex((t) => t.title === currentTrack.title);
    if (currentIndex > 0) {
      playSound(tracks[currentIndex - 1]);
    }
  };
  
  const skipToNext = async () => {
    const currentIndex = tracks.findIndex((t) => t.title === currentTrack.title);
    if (currentIndex < tracks.length - 1) {
      playSound(tracks[currentIndex + 1]);
    }
  };
  
  const renderTrackItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.trackButton}
      onPress={() => playSound(item)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
  
useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

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
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={skipToPrevious}>
            <FontAwesome5 name="backward" style={styles.controlIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={playPauseToggle}>
            <FontAwesome5 name={isPlaying ? 'pause' : 'play'} style={styles.controlIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={skipToNext}>
            <FontAwesome5 name="forward" style={styles.controlIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar} />
            <FlatList
            data={tracks}
            keyExtractor={(item) => item.id} 
            renderItem={renderTrackItem} 
            style={styles.trackList}
          />
          {currentTrack && <Text>Now Playing: {currentTrack.title}</Text>}

      </SafeAreaView>
    </SafeAreaView>
  </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerContainer: {
    flex: 1,
    padding: 20,
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
 playerContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
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
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginVertical: 5,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  trackList: {
    marginBottom: 20,
  },
});

export default Meditate;