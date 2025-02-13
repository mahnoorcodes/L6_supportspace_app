import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert, ImageBackground } from 'react-native';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Logged in succesfully');
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error logging in: ', error.message);
        Alert.alert('Error', error.message);
      }
    };

    return (
            <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={styles.container}>
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
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button title="Login" onPress={handleLogin} color="#3498db" />
                        </View>
                        <View style={styles.bottomContainer}>
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
    buttonContainer: {
        marginVertical: 16,
    },
    bottomContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    toggleText: {
        color: '#3498db',
        textDecorationLine: 'underline',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        marginBottom: 20,
        width: 250,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1, 
        height: 60,
        fontSize: 16,
    },
});

export default Login;