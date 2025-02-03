import React from 'react';
import { SafeAreaView,Text, StyleSheet} from 'react-native';

function Home(props) {
    return (
        <SafeAreaView style={styles.background}>
            <Text>Home</Text>
        </SafeAreaView>
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

export default Home;