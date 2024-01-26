import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from './src/config/firebase'
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

import React from "react";
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

const Stack = createStackNavigator();

export default function App() {

  return (
    <View style={{flex:1}}>
      <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen name="Index" component={Index} options={{ headerShown: false }}/>
          <Stack.Screen name="LogIn" component={LogIn} options={{ headerTitle: basicStrings.appName, headerStyle: { backgroundColor: appColors.basicRed}, headerTintColor:'white' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: 'Create New Account', headerStyle: { backgroundColor: appColors.basicRed } , headerTintColor:'white'}} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{ headerTitle: 'Reset Password', headerStyle: { backgroundColor: appColors.basicRed }, headerTintColor:'white' }} />
          <Stack.Screen name="UserProfileCreation" component={UserProfileCreation} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  </Provider>
    </View>
    


  );
}


