import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Firebase User Object:", user); 
      if (user) {
        if (user.isAnonymous) {
          setUsername('Guest User');
          setEmail('Not available');
        } else {
          setUsername(user.displayName || 'No Name');
          setEmail(user.email || 'No Email');
        }
      } else {
        setUsername('');
        setEmail('');
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      Alert.alert(
        "Confirm",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            onPress: async () => {
              try {
                await deleteUser(user);
                console.log("User deleted successfully");
                Alert.alert("Account Deleted", "Your account has been successfully deleted.");
                navigation.navigate('Welcome');
              } catch (error) {
                console.error("Error deleting user:", error.message);
              }
            }, 
            style: "destructive" 
          }
        ]
      );
    } else {
      console.log("No user is signed in");
    }
  };

  const handleSignOut = () => {
    getAuth().signOut().then(() => {
      navigation.navigate('Welcome');
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <LinearGradient
      colors={['lightyellow', '#B5FFFC','pink','#FFCB77']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>

      <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.headerContainer}>
          <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headerText}>Settings</Text>
          </SafeAreaView>
          <FontAwesome5 name="cog" size={24} color="black" />
        </SafeAreaView>

      
      <SafeAreaView style={[styles.profileContainer, {alignItems:'center'}]}>
      <Text style={styles.header}>Profile</Text>
        <Icon name="user" size={60} color="white" style={styles.profileIcon} />
      </SafeAreaView>

      <SafeAreaView style={styles.inputContainer}>
        <Icon name="user" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={username}
          editable={false}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.labe}
          value={email}
          editable={false}
        />
      </SafeAreaView>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
          <Text style={styles.footerText}>App developed by Mahnoor Faisal | Version 1.0</Text>
        </View>
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
    marginVertical: 20 ,
    color: '#4A4A4A',
  },  
  headerContainer: {
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
  profileContainer: {
    padding: 10,
    alignItems: 'center',
    textAlign : 'center', 
    
  },
  profileIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 250,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  buttonContainer: {
    backgroundColor: '#ffd1dc',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 16,
    width:200,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'darkred',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 16, 
    width:200,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3, 
  },
  
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    
  },  
  footerContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});

export default Settings;
