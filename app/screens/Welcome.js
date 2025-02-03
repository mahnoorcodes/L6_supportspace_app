import React from 'react';
import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Welcome(props) {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.background}>
            <Image 
                source={require('../assets/logo.png')} 
                style={{width: 150, height: 150, position:'absolute', top: 100}}
            />
            <Text style={styles.text}>Welcome</Text>
            <SafeAreaView style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGuest} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonTextGuest}>Continue as Guest</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'white',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    text:{
        fontSize:25, 
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
        marginVertical:20
    },
    buttonText:{
        fontSize:20, 
        fontFamily:'Helvetica', 
        fontWeight:'bold',
        color: '#000'
    },
    buttonGuest:{
        backgroundColor:'black', 
        justifyContent:'center',
        alignItems:'center',
        height:60,
        width:250,
        padding:10,
        borderRadius:30,
        marginVertical:20
    },
    buttonTextGuest:{
        fontSize:20, 
        fontFamily:'Helvetica', 
        fontWeight:'bold',
        color: 'white'
    }
});

export default Welcome;