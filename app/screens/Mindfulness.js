import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

const Mindfulness = () => {
  const navigation = useNavigation();
  const [apiResponse, setApiResponse] = useState('');
  const [textColor, setTextColor] = useState('#FF69B4');

  const fetchData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch('https://affirmations.dev', requestOptions);
      const data = await response.json();
      console.log('API Result:', data);
      setApiResponse(data.affirmation);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRandomColor = () => {
    const colors = ['#FF69B4', '#FFDDD2', '#D8B4E2', '#B5E48C', '#FFD700', '#00CED1', '#A8DADC'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  useEffect(() => {
    setTextColor(getRandomColor());
    fetchData();
  }, []);
  
  // Mindful tasks from https://www.mayoclinic.org/healthy-lifestyle/consumer-health/in-depth/mindfulness-exercises/art-20046356
  const mindfulTasks = [
    {
      id: '1',
      title: 'Deep Breathing Exercise',
      description: 'Take 5 deep breaths, focusing on each inhale and exhale',
      duration: '5 mins',
      icon: 'bicycle',
    },
    {
      id: '2',
      title: 'Mindful Walking',
      description: 'Walk slowly and focus on each step and your surroundings',
      duration: '10 mins',
      icon: 'walking',
    },
    {
      id: '3',
      title: 'Body Scan Meditation',
      description: 'Lie on your back and slowly focus on each part of your body from head to toe, observing sensations and emotions.',
      duration: '15 mins',
      icon: 'spa',
    },
    {
      id: '4',
      title: 'Sitting Meditation',
      description: 'Sit comfortably, focus on your breath, and gently return to your breathing when thoughts arise.',
      duration: '10 mins',
      icon: 'chair',
    },
    {
      id: '5',
      title: 'Walking Meditation',
      description: 'Walk slowly in a quiet space, paying attention to your balance and body movements with each step.',
      duration: '10 mins',
      icon: 'walking',
    },
    {
      id: '6',
      title: 'Mindful Walking',
      description: 'Walk slowly and focus on each step and your surroundings',
      duration: '10 mins',
      icon: 'walking',
    },
    {
      id: '7',
      title: 'Gratitude Journaling',
      description: 'Write down three things you are grateful for today. Reflect on the positive emotions they bring.',
      duration: '10 mins',
      icon: 'book',
    },
    {
      id: '8',
      title: 'Loving-Kindness Meditation',
      description: 'Sit quietly and silently repeat positive affirmations for yourself and others, such as "May I be happy, may I be healthy."',
      duration: '10 mins',
      icon: 'heart',
    },    
  ];

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <FontAwesome5 name={item.icon} size={24} color="gray" style={styles.taskIcon} />
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskDuration}>⏱ {item.duration}</Text>
      </View>
    </View>
  );

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
            <Text style={styles.headerText}>Mindful Practices</Text>
          </SafeAreaView>
        <FontAwesome5 name="wind" size={24} color="black" />
      </SafeAreaView>

      <Text style={styles.sectionTitle}>Positive Affirmations</Text>

      <TouchableOpacity onPress={fetchData} style={styles.apiContainer}>
      <Text style={[styles.apiText, { color: textColor }]}>{apiResponse || 'Loading...'}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle2}>Mindful Tasks</Text>

      <FlatList
        data={mindfulTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop:100,
    paddingLeft: 20, 
    paddingRight: 20, 
  },
  sectionTitle2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop:20,
    paddingLeft: 20, 
    paddingRight: 20, 
  },
  apiText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FF69B4',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  apiContainer: {
    padding:20,
    borderRadius: 10, 
  },  
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    marginRight: 20,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  taskDuration: {
    fontSize: 12,
    color: 'gray',
  },
});

export default Mindfulness;
