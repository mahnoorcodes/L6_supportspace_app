import React, {useEffect} from 'react';
import { View, SafeAreaView,Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Dimensions} from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Moods = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
      <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate("HomeTabs")} />
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerText}>Mood Tracker</Text>
        </SafeAreaView>
        <FontAwesome5 name="smile" size={24} color="black" />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
});

export default Moods;