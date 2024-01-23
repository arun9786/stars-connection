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

import LogInSignUp from './src/Components/LogInSignUp'
import Index from "./src/Components/Index";
import UserProfileCreation from "./src/Components/UserProfileCreation";
import LogIn from "./src/Components/LogIn";
import { Provider } from "react-redux";
import SignUp from "./src/Components/SignUp";
import { Store } from "./src/Redux/Store/Store";

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="UserProfileCreation" component={UserProfileCreation} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


