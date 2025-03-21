import React, {useState} from 'react';
import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity,Alert} from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Welcome = ({ navigation, setUser, setIsGuest }) => {
    const auth = getAuth();

    const handleContinueAsGuest = () => {
        signInAnonymously(auth)
        .then(() => console.log("Signed in as guest"))
        .catch((error) => console.error("Error signing in anonymously:", error));
            
        setUser(null);
        setIsGuest(true); 
        Alert.alert("Guest Access", "You are continuing as a guest.");
        navigation.navigate("HomeTabs");
    };

    return (
        <SafeAreaView style={styles.background}>
            <Image 
                source={require('../assets/logo.png')} 
                style={{width: 150, height: 150, position:'absolute', top: 100}}
            />
            <Text style={styles.text}>SupportSpace</Text>
            <SafeAreaView style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGuest} onPress={handleContinueAsGuest}>
                    <Text style={styles.buttonTextGuest}>Continue as Guest</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'white',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    text:{
        fontSize:30, 
        color:'#D8B4E2', 
        fontFamily:'Helvetica', 
        fontWeight:'bold',
        position:'absolute',
        top: 250,
        
    },
    buttonContainer: {
        marginTop: 250, 
        alignItems: 'center', 
    },
    button:{
        backgroundColor:'#F5F5F5', 
        alignItems:'center',
        justifyContent:'center',
        height:60,
        width:250,
        padding:10,
        borderRadius:20,
        marginVertical:20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText:{
        fontSize:20, 
        fontFamily:'Helvetica', 
        fontWeight:'bold',
        color: '#4A4A4A'
    },
    buttonGuest:{
        backgroundColor:'black', 
        justifyContent:'center',
        alignItems:'center',
        height:60,
        width:250,
        padding:10,
        borderRadius:30,
        marginVertical:20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },
    buttonTextGuest:{
        fontSize:20, 
        fontFamily:'Helvetica', 
        fontWeight:'bold',
        color: 'white'
    }
});

export default Welcome;