import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Moods = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Moods</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Moods;