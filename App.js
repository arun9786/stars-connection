import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from './src/config/firebase'
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

import React, { createContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from "react-redux";
import { Store } from "./src/Redux/Store/Store";

import LogInSignUp from './src/Components/LogInSignUp'
import Index from "./src/Components/Index";
import UserProfileCreation from "./src/Components/UserProfileCreation";
import LogIn from "./src/Components/Registration/LogIn";
import SignUp from "./src/Components/Registration/SignUp";
import ForgotPassword from "./src/Components/Registration/ForgotPassword";
import basicStrings from './src/Strings/basics.json'
import { View } from "react-native";
import appColors from './src/Others/appColors.json'
import AddConnection from "./src/Components/IndexScreens/Invite/AddConnection";
import NoInternetOverlay from "./src/Components/Features/NoInternetOverlay";
import NetworkTree from "./src/Components/IndexScreens/Network/NetworkTree";

import { checkInternetConnection } from "./src/Others/InternetConnectionStatus";

const Stack = createStackNavigator();

const App=()=> {

  const [isInternetAvailable, setIsInternetAvailable]=useState(false);

  // useEffect(()=>{

  //   const interval= setInterval( async()=>{
  //     let networkStatus = await checkInternetConnection();
  //     if (!networkStatus) {
  //       setIsInternetAvailable(true); 
  //     }else{
  //       setIsInternetAvailable(false); 
  //     }
  //   },3000);

  //   return ()=>{
  //     clearInterval(interval);
  //   }

  // },[]);


  return (
    <View style={{flex:1}}>
      <Provider store={Store}>
      <NavigationContainer>
      { isInternetAvailable && <NoInternetOverlay closeInternetOverlay={()=>setIsInternetAvailable(false)}/> }
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen name="Index" component={Index} options={({ navigation})=>({ title:"Arun", headerShown:false, Toast:()=>Toast()})}/>
          <Stack.Screen name="LogIn" component={LogIn} options={{ headerTitle: basicStrings.appName, headerStyle: { backgroundColor: appColors.basicRed}, headerTintColor:'white' }}  />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: 'Create New Account', headerStyle: { backgroundColor: appColors.basicRed } , headerTintColor:'white'}} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{ headerTitle: 'Reset Password', headerStyle: { backgroundColor: appColors.basicRed }, headerTintColor:'white' }} />
          <Stack.Screen name="Invite Add Connection" component={AddConnection} options={{ headerTitle: 'Add Connection', headerStyle: { backgroundColor: appColors.basicRed }, headerTintColor:'white' }}/>
          <Stack.Screen name="Network Network Tree" component={NetworkTree} options={{ headerTitle: 'Connection Tree', headerStyle: { backgroundColor: appColors.basicRed }, headerTintColor:'white' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </View>
  );
};


export {App as default}
