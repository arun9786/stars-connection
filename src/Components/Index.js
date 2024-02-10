import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import { Button, Icon, Image } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './IndexScreens/Home';
import Invite from './IndexScreens/Invite/Invite';
import Profile from './Profile';
import Network from './IndexScreens/Network/Network';

import appColors from '../Others/appColors.json'
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { ConnectionsFun } from '../Redux/Slice/ConnectionsSlice';

const Tab = createBottomTabNavigator();

export default function Index() {
  const [isProfileImageExist,setIsProfileImageExist]=useState(false);

  const dispatch = useDispatch();
  const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
  const connectionsDataRedux = useSelector((state) => state.ConnectionsReducer.connections_array)

  useEffect(()=>{
    if(!connectionsDataRedux){
      getDoc(doc(firestore,"Connections","Data"))
      .then((response)=>{
        dispatch(ConnectionsFun(response.data()[0]))
      })
      .catch((error)=>{
        console.log(error.message)
      })
    }
    console.log("from index:connection", JSON.stringify(connectionsDataRedux))
  },[]);
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
            case 'Refer & Earn':
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
            return <Icon name={iconName} size={size} type='feather' color={color} style={{padding:1}}/>;
          }

        },
        tabBarActiveTintColor: appColors.basicRed,
        tabBarInactiveTintColor: '#363738',
        tabBarStyle: [{
          "display": "flex",
          "backgroundColor": "white",
          paddingBottom: 2,
          borderTopColor:'#d4d5d6'
        },
        ],
        tabBarLabelStyle: {
          fontWeight:'bold' 
        },
        tabBarActiveBackgroundColor:'#ebedeb'
      })}
      >
        <Tab.Screen name="Network" component={Network} initialParams={{"name":"resetPage"}} options={{ headerShown: false }} />
        <Tab.Screen name="Refer & Earn" component={Invite} initialParams={{"name":"resetPage"}} options={{ headerShown: false }} />
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false}} />
        <Tab.Screen name="Search" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Tab.Navigator>
    </Provider>
  )
}