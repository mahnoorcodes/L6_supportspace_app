import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Settings from './screens/Settings';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();

const AppNavigator = ({ user, isGuest, setUser, setIsGuest }) => {
  return (
    <Stack.Navigator>
      {/* Common pages */}
      <Stack.Screen name="Welcome">
        {(props) => <Welcome {...props} setUser={setUser} setIsGuest={setIsGuest} />}
      </Stack.Screen>
      <Stack.Screen name="Home">
        {(props) => <Home {...props} user={user} isGuest={isGuest} />}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {(props) => <Login {...props} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {(props) => <SignUp {...props} setUser={setUser} />}
      </Stack.Screen>
      
      {/* AUTHENTICATED USERS ONLY*/}
      {user && !isGuest && (
        <>
          <Stack.Screen name="Settings" component={Settings} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
