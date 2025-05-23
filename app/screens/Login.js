import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import {signInWithEmailAndPassword, getAuth, sendPasswordResetEmail , onAuthStateChanged} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './tabs/Home';
import { Entypo} from '@expo/vector-icons';

const Login = ({ navigation, setUser, setIsGuest }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is logged in: ", user);
          setUser(user); 
        } else {
          console.log("User is logged out");
          setUser(null);
        }
      });
  
      Alert.alert("Success", "Logged in successfully");
      navigation.navigate("HomeTabs"); 
    } catch (error) {
      console.error("Error logging in: ", error.message);
      Alert.alert("Error", error.message);
    }
  };
    const handlePasswordReset = () => {
        const auth = getAuth();

        if (!email) {
          Alert.alert('Please enter your email address');
          return;
        }
        sendPasswordResetEmail(auth, email)
          .then(() => {
            Alert.alert('Password reset email sent!', 'Please check your inbox.');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/invalid-email') {
              Alert.alert('Invalid email address');
            } else if (errorCode === 'auth/user-not-found') {
              Alert.alert('No account found with this email');
            } else {
              Alert.alert(errorMessage);
            }
          });
      };

    return (
            <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={styles.container}>
                <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate('Welcome')} style={styles.backButton} />
                    <View>            
                        <Text style={styles.login}>Login</Text>                        
                        <View style={styles.inputContainer}>
                            <Icon name="email" size={20} color="#aaa" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputContainer}> 
                            <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Password"
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    style={styles.icon}>
                                <Entypo name={isPasswordVisible ? 'eye' : 'eye-with-line'} size={24} color="gray" />  
                            </TouchableOpacity>  
                        </View>
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
                            <Text style={styles.buttonLogin}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.bottomContainer}>
                        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                            <Text style={styles.toggleText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <Text style={styles.toggleText} onPress={() => navigation.navigate('SignUp')}>
                            Don't have an account? Sign up
                        </Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    };
const styles = StyleSheet.create({
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        fontSize:25, 
        color:'#4A4A4A', 
        fontFamily:'Helvetica', 
        fontWeight:'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        height:60,
        width:250,
        padding:10,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingLeft: 50,
        marginBottom: 20,
    },
    buttonLogin:{
        fontSize:16, 
        fontFamily:'Helvetica', 
        fontWeight:'bold',
        color: '#4A4A4A',
        textAlign: 'center',
        
    },
    buttonContainer: {
        backgroundColor: '#ffd1dc', 
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginBottom: 20,
        marginVertical: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,        
    },
    bottomContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    toggleText: {
        color: '#3498db',
        textDecorationLine: 'underline',
        paddingTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        marginBottom: 20,
        width: 250,
        paddingHorizontal: 10,
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
        height: 60,
        fontSize: 16,
    },
    backButton:{
        position: 'absolute',
        top: 50,
        left: 20,
        padding:10,
    }
});

export default Login;