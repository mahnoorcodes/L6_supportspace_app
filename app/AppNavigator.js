import {React, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Entypo from '@expo/vector-icons/Entypo';

import Welcome from './screens/Welcome';
import Home from './screens/tabs/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Settings from './screens/tabs/Settings';
import Moods from './screens/Moods';
import Journal from './screens/tabs/Journal';
import Meditate from './screens/Meditate';
import Mindfulness from './screens/Mindfulness';
import NewJournalEntry from './screens/NewJournalEntry';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = ({user}) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        elevation: 0,
        shadowColor: "#000",
        height: 70,
      },
      tabBarIconStyle: {
        display: 'flex',
        marginTop: 10,
      },
      }}>
      <Tab.Screen 
        name="Home" 
        children={() => <Home user={user} />}  
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={24} color={focused ? "black" : "gray"} />
          ),
        }}
      />
      <Tab.Screen 
        name="Journal" 
        children={() => <Journal user={user} />} 
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="book" size={24} color={focused ? "black" : "gray"} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="cog" size={24} color={focused ? "black" : "gray"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [user, setUser] = useState(null);  // Manage user state
  const [isGuest, setIsGuest] = useState(true);  // Manage guest state

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Authentication Screens */}
        <Stack.Screen name="Welcome">
          {(props) => <Welcome {...props} setUser={setUser} setIsGuest={setIsGuest} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {(props) => <SignUp {...props} setUser={setUser} />}
        </Stack.Screen>

        {/* Main App Screens with Bottom Tabs */}
          <Stack.Screen name="HomeTabs">
            {(props) => <HomeTabs {...props} user={user} isGuest={isGuest} />}
          </Stack.Screen>
          <Stack.Screen name="Journal" >
          {(props) => <HomeTabs {...props} user={user} isGuest={isGuest} />}
          </Stack.Screen>

        {/* Additional Screens */}

        <Stack.Screen name="Meditate">
          {(props) => <Meditate {...props} user={user} isGuest={isGuest} />}
        </Stack.Screen>
        <Stack.Screen name="Mindfulness" component={Mindfulness} />
        <Stack.Screen name="Moods" component={Moods} />
        <Stack.Screen name="NewJournalEntry" component={NewJournalEntry}/>
      </Stack.Navigator>
  );
};

export default AppNavigator;
