import React from 'react';
import { SafeAreaView,Text, StyleSheet, Button} from 'react-native';

const Home = ({ navigation, user, isGuest }) => {
    return (
      <SafeAreaView style={styles.container}>
        {user ? (
          <Text style={styles.text}>Welcome, {user.email}</Text>
        ) : (
          <Text style={styles.text}>Welcome, Guest</Text>
        )}
        <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    }
});

export default Home;