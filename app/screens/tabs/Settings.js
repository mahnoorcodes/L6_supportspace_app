import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
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