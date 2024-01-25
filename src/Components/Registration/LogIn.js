import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, Icon, Image, Input, Overlay, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { RadioGroup } from "react-native-radio-buttons-group";

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firestore } from "../../config/firebase";
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { Styles } from "../../Styles/Registration/LogInCss";
import { mobileRegex, passwordRegex } from '../../Others/Regex'
import basicsStrings from '../../Strings/basics.json'
import { checkInternetConnection } from "../../Others/InternetConnectionStatus";
import { passwordEncoder } from "../../Security/Encoder";
import { useDispatch, useSelector } from "react-redux";
import { PersonalDetailsFun } from "../../Redux/Slice/UserProfileSlice";
import { Provider, overlay } from "react-native-paper";
import CustomToast from "../Features/CustomToast";


export default function LogIn(props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordEyeIcon, setPasswordEyeIcon] = useState('eye-off');
    const [isError, setIsError] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [showOvelay, setShowOverlay] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggedInSuccessful, setIsLoggedInSuccessful] = useState(false);
    const [isLoggedInSuccessFailure, setIsLoggedInSuccessFailure] = useState(false);
    const [loggeInStatusMsg, setLoggeInStatusMsg] = useState('');
    const [loggeInStatusIcon, setLoggeInStatusIcon] = useState(require('../../Images/icon-success.gif'));
    const [loggeInStatusButtonIcon, setLoggeInStatusButtonIcon] = useState('');
    const [loggeInStatusButtonTitle, setLoggeInStatusButtonTitle] = useState('');

    const [userPhone, setUserPhone] = useState('6379185147');
    const [userPassword, setUserPassword] = useState('9786@RArun');

    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState(false);

    const radioButtonsSignIn = useMemo(() => ([
        {
            id: "1",
            label: "Sign In",
            value: 'Sign In',
            labelStyle: { fontSize: 20, marginBottom: 10, },

            color: '#aba30a',
        }
    ]
    ), []);

    const radioButtonsSignUp = useMemo(() => ([
        {
            id: "1",
            label: "Create New Account",
            value: 'Create New Account',
            labelStyle: { fontSize: 18 },
            color: '#aba30a',
        }
    ]
    ), []);

    const radioButtonsForgotPassword = useMemo(() => ([
        {
            id: "1",
            label: "Forgot/Reset Password",
            value: 'Forgot/Reset Password',
            labelStyle: { fontSize: 18 },
            color: '#aba30a',
        }
    ]
    ), []);

    const auth = getAuth();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Login:Already signed In")
            } else {
                console.log('No user is signed in');
            }
        });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        if (passwordVisible) {
            setPasswordEyeIcon('eye');
        } else {
            setPasswordEyeIcon('eye-off');
        }
    }, [passwordVisible]);

    const openSignupPage = () => {
        navigation.navigate('SignUp');
    }

    const openForgotPasswordPage = () => {
        navigation.navigate('Forgot Password');
    }

    const Toast = (message, errorStatus = true, timeout = 2500,position='bottom') => {
        let content = { "visible": true, "message": message, "errorStatus": errorStatus, "timeout": timeout, "position":position };
        setToastContent(content);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
        }, timeout);
    }

    const LogInWithEmailFun = async () => {
        if (!mobileRegex.test(userPhone)) {
            setIsError(true);
            setErrorMsg('Please enter a valid phone number.');
            Toast('Please enter a valid phone number.');
        } else if (!passwordRegex.test(userPassword)) {
            setIsError(true);
            if (userPassword.length > 0) {
                setErrorMsg('The password you entered is incorrect.');
                Toast('The password you entered is incorrect.')
            } else {
                setErrorMsg('Please enter your password.');
                Toast('Please enter your password.');
            }
        } else {
            let networkStatus = await checkInternetConnection();
            if (networkStatus) {
                setIsError(false);
                setErrorMsg('');
                setShowOverlay(true);
                setIsLoggingIn(true);
                setIsLoggedInSuccessFailure(false);
                getDoc(doc(firestore, "Users", userPhone, "Personal Details", "Data"))
                    .then((result) => {
                        console.log(result.data());
                        if (result.data()) {
                            let encodedPassword = passwordEncoder(userPassword);
                            if (result.data().Password === encodedPassword) {
                                setIsLoggedInSuccessful(true);
                                setShowOverlay(false);
                                setIsLoggingIn(false);
                                // setIsLoggedInSuccessFailure(true);
                                // setLoggeInStatusMsg('Sign-in successfull...');
                                // setLoggeInStatusIcon(require('../../Images/icon-success.gif'));
                                // setLoggeInStatusButtonIcon('home');
                                // setLoggeInStatusButtonTitle('Home');
                                
                                dispatch(PersonalDetailsFun(result.data()));
                            } else {
                                setIsLoggedInSuccessful(false);
                                setIsLoggingIn(false);
                                setIsLoggedInSuccessFailure(true);
                                setLoggeInStatusMsg("Invalid Password...");
                                setLoggeInStatusIcon(require('../../Images/icon-error.gif'));
                                setLoggeInStatusButtonIcon('refresh-cw');
                                setLoggeInStatusButtonTitle('Retry');
                                console.log("Invalid User")
                            }
                        } else {
                            setShowOverlay(false);
                            setIsLoggingIn(false);
                            Toast("Oops! Unregistered mobile number. Verify or Create a new account.",  true,5000);
                            console.log("Invalid Mobile number")
                        }
                    })
                    .catch((error) => {
                        setShowOverlay(false);
                        setIsLoggingIn(false);
                        setIsLoggedInSuccessFailure(false);
                        setIsLoggedInSuccessFailure(true);
                        console.log(error);
                        Toast(error.message, true, 5000);
                    })
            }
        }
    }

    useEffect(()=>{
        if(isLoggedInSuccessful && !showOvelay && !isLoggingIn){
            Toast('Sign-in successful...',false)
            const timer = setTimeout(() => {
                openIndexPage()
            }, 2000);
            return () => clearTimeout(timer);
        }
        
    },[isLoggedInSuccessful, showOvelay, isLoggingIn])

    const openIndexPage =()=>{
        navigation.reset({
                    index: 0,
                    routes: [{ name: 'Index' }],
                });
    }
    const loginStatusFun = () => {
        setShowOverlay(false);
       
    }

    return (
        <Provider>
            <View>

                {isToastVisible && <CustomToast content={toastContent} handleToastVisible={() => setIsToastVisible(false)} />}
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={Styles.contaier}>
                            <Text style={Styles.pageWelcome}>
                                Welcome
                            </Text>
                            <View style={Styles.signupContainer}>
                                <RadioGroup
                                    radioButtons={radioButtonsSignUp}
                                    selectedId="2"
                                    onPress={() => openSignupPage()}
                                    containerStyle={{ alignItems: 'flex-start' }}
                                />
                            </View>
                            <View style={Styles.signinContainer}>
                                <RadioGroup
                                    radioButtons={radioButtonsSignIn}
                                    selectedId="1"
                                    containerStyle={{ alignItems: 'flex-start' }}
                                />
                                <Input
                                    placeholder="Phone..."
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    labelStyle={Styles.lableStyle}
                                    keyboardType='phone-pad'
                                    onChangeText={(text) => setUserPhone(text)}
                                    value={userPhone}
                                    containerStyle={{ margin: 0, padding: 0 }}
                                    leftIcon={<Icon name='phone' color='#8a8703' style={Styles.inputIcons} />}
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
                            <View style={Styles.forgotPasswordContainer}>
                                <RadioGroup
                                    radioButtons={radioButtonsForgotPassword}
                                    selectedId="2"
                                    onPress={() => openForgotPasswordPage()}
                                    containerStyle={{ alignItems: 'flex-start' }}
                                />
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
                                    style={Styles.overlaySuccessIcon} />
                                <Button title={loggeInStatusButtonTitle}
                                    icon={<Icon name={loggeInStatusButtonIcon} type='feather' color='white' style={Styles.overlaySuccessButtonIcon} />}
                                    onPress={loginStatusFun}
                                />
                            </View>
                        }


                    </Overlay>
                </ScrollView>
            </View>

        </Provider>

    )

}