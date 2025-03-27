import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome';
import SplashScreen from './screens/SplashScreen';
import SignUp from './screens/SignUp'; 
import Login from './screens/Login';
import Home from './screens/tabs/Home';
import Moods from './screens/Moods';
import AppNavigator from './AppNavigator'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null); 
  const [isGuest, setIsGuest] = useState(false); 
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, username: firebaseUser.displayName || firebaseUser.email });
        setIsGuest(false);
      } else {
        setUser(null);
        setIsGuest(true);
      }
    });
    return () => unsubscribe();
  }, []);

  
  return (
      <NavigationContainer>
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <AppNavigator user={user} isGuest={isGuest} setUser={setUser} setIsGuest={setIsGuest} />
        )}
      </NavigationContainer>
  );
};

export default App;
