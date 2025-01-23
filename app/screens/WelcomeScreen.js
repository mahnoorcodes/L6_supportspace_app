import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';

function WelcomeScreen(props) {
    return (
        <View style={styles.background}>
            <Image 
            source={require('../assets/logo.png')} 
            style={{width: 300, height: 300}}
            />
            <Text style={{fontSize:20, color:'#D8B4E2', fontFamily:'Helvetica', fontWeight:'bold'}}> Support Space </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    }
});

export default WelcomeScreen;