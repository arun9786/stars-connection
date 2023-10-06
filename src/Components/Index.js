import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import { Button, Icon, Image } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function Index() {

  const [isProfileImageExist,setIsProfileImageExist]=useState(false);

  return (
    <Provider>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Add':
              iconName = 'plus-circle';
              break;
            case 'Network':
              iconName = 'grid';
              break;
            case 'Profile':
              iconName = 'users';
              break;

          }
          if (route.name === 'Profile' && isProfileImageExist) {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../Images/icon-error.gif')} style={{ width: 24, height: 24 }}/>
            </View>
          }else{
            return <Icon name={iconName} size={size} type='feather' color={color} />;
          }

        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{
          "display": "flex",
          "backgroundColor": "#1f1d1d",
          paddingBottom: 3,
          paddingTop: 3,
        },
        ]
      })}>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Add" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Network" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Tab.Navigator>
    </Provider>
  )
}