import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import {createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

const SignUp = ({ navigation, setUser }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    const handleSignUp = async () => {
      const auth = getAuth(); 
      if (!username) {
        Alert.alert('Error', 'Please provide a username');
        return;
      }  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: username,  
        });
        const updatedUser = getAuth().currentUser;
        console.log('User after updateProfile:', updatedUser);

        if (updatedUser && updatedUser.displayName) {
          setUser(updatedUser); 
          Alert.alert('Success', 'User account created successfully');
          navigation.navigate('HomeTabs');
        } else {
          Alert.alert('Error', 'Display name not set correctly');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
 

    return (
        <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
            <ScrollView contentContainerStyle={styles.container}>
            <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate('Welcome')} style={styles.backButton} />
                <View>
                    <Text style={styles.signUp}>Sign Up</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="person" size={20} color="#aaa" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Username"
                        />
                    </View>
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
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
                        <Text style={styles.buttonSignup}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomContainer}>
                    <Text style={styles.toggleText} onPress={() => navigation.navigate('Login')}>
                        Already have an account? Log in
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
        alignItems: 'center'
    },
    signUp: {
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
        paddingLeft: 60,
        marginBottom: 20,
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
    buttonSignup:{
        fontSize:16, 
        fontFamily:'Helvetica', 
        fontWeight:'bold',
        color: '#4A4A4A',
        textAlign: 'center',
        
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

export default SignUp;