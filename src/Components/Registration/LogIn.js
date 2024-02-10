import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { RadioGroup } from "react-native-radio-buttons-group";

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firestore } from "../../config/firebase";
import { doc, getDoc, } from 'firebase/firestore'

import { Styles } from "../../Styles/Registration/LogInCss";
import { mobileRegex, passwordRegex } from '../../Others/Regex'
import basicsStrings from '../../Strings/basics.json'
import appColors from '../../Others/appColors.json'
import { checkInternetConnection } from "../../Others/InternetConnectionStatus";
import { passwordEncoder } from "../../Security/Encoder";
import { useDispatch, useSelector } from "react-redux";
import { PersonalDetailsFun } from "../../Redux/Slice/UserProfileSlice";
import { Provider } from "react-native-paper";

import CustomToast from "../Features/CustomToast";
import OverlayLoader from "../Features/OverlayLoader";
import { getSizeForScreen } from "../Features/responsiveSizeMaker";


const LogIn = () => {
    const auth = getAuth();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
    console.log("login redux", userPersonalDataRedux);


    const [userPhone, setUserPhone] = useState('6379185147');
    const [userPassword, setUserPassword] = useState('9786@RArun');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordEyeIcon, setPasswordEyeIcon] = useState('eye-off');

    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState(false);

    const [showOvelayLoader, setShowOvelayLoader] = useState(false);
    const [ovelayLoaderContent, setOvelayLoaderContent] = useState('');


    const radioButtonsSignIn = useMemo(() => ([
        {
            id: "1",
            label: "Sign In",
            value: 'Sign In',
            labelStyle: { fontSize: getSizeForScreen(19), marginBottom: 10, },
            color: appColors.basicRed,
        }
    ]
    ), []);

    const radioButtonsSignUp = useMemo(() => ([
        {
            id: "1",
            label: "Create New Account",
            value: 'Create New Account',
            labelStyle: { fontSize: getSizeForScreen(18) },
            color: appColors.basicRed,
        }
    ]
    ), []);

    const radioButtonsForgotPassword = useMemo(() => ([
        {
            id: "1",
            label: "Reset Password",
            value: 'Reset Password',
            labelStyle: { fontSize: getSizeForScreen(18) },
            color: appColors.basicRed,
        }
    ]
    ), []);

    useEffect(() => {
        if (passwordVisible) {
            setPasswordEyeIcon('eye');
        } else {
            setPasswordEyeIcon('eye-off');
        }
    }, [passwordVisible]);

    const Toast = (message, errorStatus = true, timeout = 2500, position = 'top') => {
        let content = { "message": message, "errorStatus": errorStatus, "timeout": timeout, "position": position };
        setToastContent(content);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
        }, timeout);
    }


    const LogInWithPhonePasswordFun = async () => {
        if (!mobileRegex.test(userPhone)) {
            Toast('Please enter a valid phone number.');
        } else if (!passwordRegex.test(userPassword)) {
            if (userPassword.length > 0) {
                Toast('The password you entered is incorrect.')
            } else {
                Toast('Please enter your password.');
            }
        } else {
            setShowOvelayLoader(true);
            setOvelayLoaderContent("While we verifying your credentials...");
            getDoc(doc(firestore, "Users", userPhone, "Personal Details", "Data"))
                .then((result) => {
                    console.log(result.data());
                    setShowOvelayLoader(false);
                    if (result.data()) {
                        setShowOvelayLoader(false);
                        let encodedPassword = passwordEncoder(userPassword);
                        if (result.data().Password === encodedPassword) {
                            dispatch(PersonalDetailsFun(result.data()));
                            Toast('Sign-in successful...', false, undefined, 'top')
                            const timer = setTimeout(() => {
                                openIndexPage()
                            }, 1000);
                            return () => clearTimeout(timer);
                        } else {
                            Toast("Invalid credentials provided. Please check your information and try again.", undefined, 5000);
                        }
                    } else {
                        setShowOvelayLoader(false);
                        Toast("Oops! Unregistered mobile number. Verify or Create a new account.", true, 5000);
                    }
                })
                .catch((error) => {
                    setShowOvelayLoader(false);
                    Toast(error.message, true, 5000);
                    console.log(error);
                })

        }
    }

    const openIndexPage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Index' }],
        });
    }

    const openSignupPage = () => {
        navigation.navigate('SignUp');
    }

    const openForgotPasswordPage = () => {
        navigation.navigate('Forgot Password');
    }

    return (
        <Provider>
            <View>
                {isToastVisible && <CustomToast content={toastContent} handleToastVisible={() => setIsToastVisible(false)} />}
                {showOvelayLoader && <OverlayLoader content={ovelayLoaderContent} />}
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
                                    leftIcon={<Icon name='phone' color={appColors.basicRed} style={Styles.inputIcons} />}
                                />
                                <Input placeholder="Password..."
                                    style={Styles.input}
                                    secureTextEntry={!passwordVisible}
                                    inputContainerStyle={Styles.inputContainer}
                                    labelStyle={Styles.lableStyle}
                                    rightIcon={<Icon name={passwordEyeIcon} type="feather" color={appColors.basicRed}
                                        onPress={() => setPasswordVisible(!passwordVisible)} />}
                                    leftIcon={<Icon name='lock' color={appColors.basicRed} />}
                                    onChangeText={(text) => setUserPassword(text)}
                                    value={userPassword}
                                />

                                <Button title='Sign-In'
                                    icon={<Icon name='arrow-right' color='white' style={Styles.buttonIcon} />}
                                    iconPosition='right'
                                    loading={false}
                                    buttonStyle={Styles.button}
                                    titleStyle={Styles.buttonTitleStyle}
                                    onPress={LogInWithPhonePasswordFun}
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

                </ScrollView>
            </View>
        </Provider>

    )

}

export default LogIn;