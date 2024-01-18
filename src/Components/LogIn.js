import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, Icon, Image, Input, Overlay, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

import { Styles } from "../Styles/LogInCss";

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithCredential, signOut,
        PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth'

import {app} from '../config/firebase'

import basicsStrings from '../Strings/basics.json'
import { RadioGroup } from "react-native-radio-buttons-group";




export default function LogIn(props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordEyeIcon, setPasswordEyeIcon] = useState('eye-off');
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

    const radioButtons=useMemo(()=>([
        {
            id:"1",
            label:"Sign In",
            value:'Sign In',
            labelStyle:{fontSize:20},
        }
    ]
    ),[])

    const auth = getAuth();
    const navigation = useNavigation();

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;

    const recaptchaVerifier = useRef(null);
      
    const handleVerification = (verificationId) => {
        // Handle the verification ID (e.g., send it to the next screen for user input)
        console.log('Verification ID:', verificationId);
      };
    
      const recaptchaRef=useRef();

      useEffect(() => {
        setUpRecaptcha();
        }, []);

      const setUpRecaptcha = async() => {
      };

    //   const attemptInvisibleVerification = false;

    
      
      

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
        setPasswordVisible(false);
        setPasswordEyeIcon('eye-off');
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
        // try{
        //     console.log("insided");
        // const phoneProvider = new PhoneAuthProvider(auth);
        // const verificationId= await phoneProvider.verifyPhoneNumber(
        //     '+916379185147',
        //     recaptchaVerifier.current
        // )
        // console.log(verificationId);
        // }catch(error){
        //     console.log(error);
        // }
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
                    <Text style={Styles.pageWelcome}>
                        Welcome
                    </Text>
                    <View style={Styles.innerContainer}>
                        <RadioGroup
                        radioButtons={radioButtons}
                        selectedId="1"
                        containerStyle={{alignItems:'flex-start'}}
                        />
                        <Input
                            placeholder="Phone..."
                            style={Styles.input}
                            inputContainerStyle={Styles.inputContainer}
                            labelStyle={Styles.lableStyle}
                            keyboardType='phone-pad'
                            onChangeText={(text) => setUserEmail(text.toLocaleLowerCase())}
                            value={userEmail}
                            containerStyle={{ margin: 0, padding: 0 }}
                            leftIcon={<Icon name='phone' color='#8a8703' style={Styles.inputIcons}/>}
                        />
                        <Input placeholder="Password..."
                            style={Styles.input}
                            secureTextEntry={!passwordVisible}
                            inputContainerStyle={Styles.inputContainer}
                            labelStyle={Styles.lableStyle}
                            rightIcon={<Icon name={passwordEyeIcon} type="feather" color='#8a8703'
                                onPress={() => setPasswordVisible(!passwordVisible)} />}
                            leftIcon={<Icon name='lock' color='#8a8703' />}
                            onChangeText={(text) => setUserPassword(text)}
                            value={userPassword}
                        />

                        {
                            isError && <Text style={Styles.errorMsg}>{errorMsg}</Text>
                        }

                        <Button title='Sign-In'
                            icon={<Icon name='arrow-right' color='white' style={Styles.buttonIcon} />}
                            iconPosition='right'
                            loading={false} 
                            buttonStyle={Styles.button}
                            titleStyle={Styles.buttonTitleStyle}
                            onPress={LogInWithEmailFun}
                        />

                        <Text style={Styles.privacyPolicy}>
                            By continuing, you agree to {basicsStrings.appName}'s conditions of Use and Privacy notice.
                        </Text>
                    </View>
                    
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