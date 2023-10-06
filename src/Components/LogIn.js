import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, Icon, Image, Input, Overlay, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

import { Styles } from "../Styles/LogInCss";

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth'

export default function LogIn(props) {

    const [passwordVisible, setPasswordVisible] = useState(true);
    const [passwordEyeIcon, setPasswordEyeIcon] = useState('eye');
    const [isError, setIsError] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [showOvelay,setShowOverlay]=useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggedInSuccessful, setIsLoggedInSuccessful] = useState(false);
    const [isLoggedInSuccessFailure, setIsLoggedInSuccessFailure] = useState(false);
    const [loggeInStatusMsg,setLoggeInStatusMsg]=useState('');
    const [loggeInStatusIcon,setLoggeInStatusIcon]=useState(require('../Images/icon-success.gif'));
    const [loggeInStatusButtonIcon,setLoggeInStatusButtonIcon]=useState('');
    const [loggeInStatusButtonTitle,setLoggeInStatusButtonTitle]=useState('');

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const auth = getAuth();
    const navigation = useNavigation();

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
      
      
      

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Already signed In")
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Index' }],
                  });
            } else {
                console.log('No user is signed in');
            }
        });
        return () => unsubscribe();
    }, [])


    useEffect(() => {
        setPasswordVisible(true);
        setPasswordEyeIcon('eye');
        setIsError(false);
        setErrorMsg('');
        setShowOverlay(false);
        setIsLoggingIn(false);
        setIsLoggedInSuccessful(false);
        setIsLoggedInSuccessFailure(false);
        setLoggeInStatusMsg('');
        setLoggeInStatusIcon(require('../Images/icon-success.gif'));
        setLoggeInStatusButtonIcon('');
        setLoggeInStatusButtonTitle('');
        setUserEmail('');
        setUserPassword('');
    }, [props])

    useEffect(() => {
        if (passwordVisible) {
            setPasswordEyeIcon('eye');
        } else {
            setPasswordEyeIcon('eye-off');
        }
    }, [passwordVisible]);

    const LogInWithEmailFun = async() => {
        if (!emailRegex.test(userEmail)) {
            setIsError(true);
            setErrorMsg('Please enter a valid email address.')
        } else if (!passwordRegex.test(userPassword)) {
            setIsError(true);
            if (userPassword.length > 0) {
                setErrorMsg('The password you entered is incorrect.')
            } else {
                setErrorMsg('Please enter your password.');
            }
        } else {
            setIsError(false);
            setErrorMsg('');
            setShowOverlay(true);
            setIsLoggingIn(true);
            setIsLoggedInSuccessFailure(false);
            signInWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedInSuccessful(true);
                    setIsLoggingIn(false);
                    setIsLoggedInSuccessFailure(true);
                    setLoggeInStatusMsg('Sign-in successfull...');
                    setLoggeInStatusIcon(require('../Images/icon-success.gif'));
                    setLoggeInStatusButtonIcon('home');
                    setLoggeInStatusButtonTitle('Home');
                })
                .catch((error) => {
                    setIsLoggedInSuccessful(false);
                    setIsLoggingIn(false);
                    setIsLoggedInSuccessFailure(true);
                    setLoggeInStatusMsg(error.code);
                    setLoggeInStatusIcon(require('../Images/icon-error.gif'));
                    setLoggeInStatusButtonIcon('refresh-cw');
                    setLoggeInStatusButtonTitle('Retry');
                })
        }
    }

    const loginStatusFun=()=>{
        setShowOverlay(false);
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={Styles.contaier}>
                    <Input placeholder="Enter Email"
                        style={Styles.input}
                        inputContainerStyle={Styles.inputContainer}
                        label='Email'
                        labelStyle={Styles.lableStyle}
                        leftIcon={<Icon name="email" color='#87888a' />}
                        keyboardType='email-address'
                        onChangeText={(text) => setUserEmail(text.toLocaleLowerCase())}
                        value={userEmail}
                        containerStyle={{ margin: 0, padding: 0 }}
                    />
                    <Input placeholder="Enter Password"
                        style={Styles.input}
                        secureTextEntry={!passwordVisible}
                        inputContainerStyle={Styles.inputContainer}
                        label='Password'
                        labelStyle={Styles.lableStyle}
                        leftIcon={<Icon name='lock' color='#87888a' />}
                        rightIcon={<Icon name={passwordEyeIcon} type="feather" color='#737475'
                            onPress={() => setPasswordVisible(!passwordVisible)} />}
                        onChangeText={(text) => setUserPassword(text)}
                        value={userPassword}
                    />

                    {
                        isError && <Text style={Styles.errorMsg}>{errorMsg}</Text>
                    }

                    <Button title='LOGIN'
                        icon={<Icon name='arrow-right' color='white' style={Styles.buttonIcon} />}
                        iconPosition='right'
                        loading={false} buttonStyle={Styles.button}
                        onPress={LogInWithEmailFun}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Overlay isVisible={showOvelay} overlayStyle={Styles.overlayStyle}>
                {
                    isLoggingIn &&
                    <View>
                        <Text style={Styles.overlayPleaseWait}>
                            Please Wait...
                        </Text>
                        <Text style={Styles.overlayVerifingCredentials}>
                            While we verifying your credentials...
                        </Text>
                        <ActivityIndicator size="large" style={Styles.overlayActivityIndicator}
                            color='#2e4dbf' animating={true} />
                    </View>
                }
                {
                    isLoggedInSuccessFailure && 
                    <View style={Styles.overlayViewLoginSuccess}>
                        <Text style={Styles.overlaySignInSuccess}>
                            {loggeInStatusMsg}
                        </Text>
                        <Image source={loggeInStatusIcon}
                            style={Styles.overlaySuccessIcon}/>
                        <Button title={loggeInStatusButtonTitle}
                             icon={<Icon name={loggeInStatusButtonIcon} type='feather' color='white' style={Styles.overlaySuccessButtonIcon}/>}
                             onPress={loginStatusFun}
                             />
                    </View>
                }
                

            </Overlay>
        </ScrollView>
    )

}