import React, { useEffect } from 'react';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView, Text, StyleSheet, BackHandler, Alert } from 'react-native';

const Settings = ({ navigation }) => {
  const handleBackPress = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp(), 
          },
          {
            text: 'Cancel',
            onPress: () => null, 
            style: 'cancel',
          },
  
        ],
        { cancelable: false } 
      );
      return true; 
    };
  

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <Entypo name="chevron-left" size={24} color="black" onPress={handleBackPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Settings;