import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

const Mindfulness = () => {
  const navigation = useNavigation();
  const [apiResponse, setApiResponse] = useState('');

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
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate("HomeTabs")} />
          <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headerText}>Mindful Practices</Text>
          </SafeAreaView>
      </SafeAreaView>

      <Text style={styles.sectionTitle}>Positive Affirmations</Text>
      <Text style={styles.apiText}>{apiResponse || 'Loading...'}</Text>
      <Text style={styles.sectionTitle2}>Mindful Tasks</Text>
      <FlatList
        data={mindfulTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 10,
    paddingTop:80,
  },
  sectionTitle2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop:20,
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
