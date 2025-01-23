import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

function WelcomeScreen(props) {
    return (
        <ImageBackground 
            style={styles.background}
            source={require('../assets/logo.png')}
        > 
        </ImageBackground>   
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor: '#A8DADC' ,
        flex:1,
    },
});

export default WelcomeScreen;