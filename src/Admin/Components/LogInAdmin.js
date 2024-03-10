import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { RadioGroup } from "react-native-radio-buttons-group";

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firestore } from "../../config/firebase";
import { doc, getDoc, } from 'firebase/firestore'

import { Styles } from "../Styles/LogInAdminCss";
import { mobileRegex, passwordRegex } from '../../Others/Regex'
import basicsStrings from '../../Strings/basics.json'
import appColors from '../../Others/appColors.json'
import { checkInternetConnection } from "../../Others/InternetConnectionStatus";
import { passwordEncoder } from "../../Security/Encoder";
import { useDispatch, useSelector } from "react-redux";
import { PersonalDetailsFun } from "../../Redux/Slice/UserProfileSlice";
import { Provider } from "react-native-paper";

import CustomToast from "../../Components/Features/CustomToast";
import OverlayLoader from "../../Components/Features/OverlayLoader";
import { getSizeForScreen } from "../../Components/Features/responsiveSizeMaker";
import OverlayMainLoader from "../../Components/Features/Overlay/OverlayMainLoader";


const LogInAdmin = () => {
    const auth = getAuth();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
    console.log("login redux", userPersonalDataRedux);


    const [userID, setUserID] = useState('123456');
    const [userPassword, setUserPassword] = useState('123456');
    const [userKey, setUserKey] = useState('123456');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordEyeIcon, setPasswordEyeIcon] = useState('eye-off');
    const [keyVisible, setKeyVisible] = useState(false);
    const [keyEyeIcon, setKeyEyeIcon] = useState('eye-off');

    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState(false);

    const [showOvelayMainLoader, setShowOvelayMainLoader] = useState(false);


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

    useEffect(() => {
        if (keyVisible) {
            setKeyEyeIcon('eye');
        } else {
            setKeyEyeIcon('eye-off');
        }
    }, [keyVisible]);

    const Toast = (message, errorStatus = true, timeout = 2500, position = 'top') => {
        let content = { "message": message, "errorStatus": errorStatus, "timeout": timeout, "position": position };
        setToastContent(content);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
        }, timeout);
    }


    const LogInWithPhonePasswordFun = async () => {
        if (userID.length < 6) {
            Toast('UserID is Wrong.');
        } else if(userPassword.length < 6) {
                Toast('The password you entered is incorrect.')
        } else if(userKey.length <6){
            Toast('Key is Wrong.');
        } else {
            setShowOvelayMainLoader(true);
            getDoc(doc(firestore, "Admin", "Personal"))
                .then((result) => {
                    console.log(result.data());
                    if (result.data()) {
                        setShowOvelayMainLoader(false);
                        if (result.data().ID === userID && result.data().Password === userPassword && result.data().Key === userKey) {
                            // dispatch(PersonalDetailsFun(result.data()));
                            Toast('Sign-in successful...', false, undefined, 'top')
                            const timer = setTimeout(() => {
                                openIndexPage()
                            }, 1000);
                            return () => clearTimeout(timer);
                        } else {
                            Toast("Invalid credentials provided. Please check your information and try again.", undefined, 5000);
                        }
                    } else {
                        setShowOvelayMainLoader(false);
                        Toast("Oops! Unregistered mobile number. Verify or Create a new account.", true, 5000);
                    }
                })
                .catch((error) => {
                    setShowOvelayMainLoader(false);
                    Toast(error.message, true, 5000);
                    console.log(error);
                })

        }
    }

    const openIndexPage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Index Admin' }],
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
            <View style={Styles.contaier}>
                {isToastVisible && <CustomToast content={toastContent} handleToastVisible={() => setIsToastVisible(false)} />}
                {showOvelayMainLoader &&  <OverlayMainLoader/>}
                {/* <ScrollView> */}
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View>
                            <View style={Styles.signinTopView}></View>
                            <View style={Styles.signinContainer}>
                                <Input
                                    placeholder="ID..."
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    labelStyle={Styles.lableStyle}
                                    label='ID'
                                    onChangeText={(text) => setUserID(text)}
                                    value={userID}
                                    containerStyle={{ margin: 0, padding: 0 }}
                                    leftIcon={<Icon name='user' type='feather' color={appColors.basicRed} style={Styles.inputIcons} />}
                                />
                                <Input placeholder="Password..."
                                    style={Styles.input}
                                    secureTextEntry={!passwordVisible}
                                    inputContainerStyle={Styles.inputContainer}
                                    labelStyle={Styles.lableStyle}
                                    rightIcon={<Icon name={passwordEyeIcon} type="feather" color={appColors.basicRed}
                                        onPress={() => setPasswordVisible(!passwordVisible)} />}
                                    leftIcon={<Icon name='lock' type='feather' color={appColors.basicRed} />}
                                    onChangeText={(text) => setUserPassword(text)}
                                    value={userPassword}
                                    label='Password'
                                />

                                <Input placeholder="Secret Key..."
                                    style={Styles.input}
                                    secureTextEntry={!keyVisible}
                                    inputContainerStyle={Styles.inputContainer}
                                    labelStyle={Styles.lableStyle}
                                    rightIcon={<Icon name={keyEyeIcon} type="feather" color={appColors.basicRed}
                                        onPress={() => setKeyVisible(!keyVisible)} />}
                                    leftIcon={<Icon name='key' type='feather' color={appColors.basicRed} />}
                                    onChangeText={(text) => setUserKey(text)}
                                    value={userKey}
                                    label='Secret Key'
                                />

                                <Button title='Sign-In'
                                    icon={<Icon name='arrow-right' color='white' style={Styles.buttonIcon} />}
                                    iconPosition='right'
                                    loading={false}
                                    buttonStyle={Styles.button}
                                    titleStyle={Styles.buttonTitleStyle}
                                    onPress={LogInWithPhonePasswordFun}
                                />
                            </View>
                            <View style={Styles.signinBottomView}></View>

                        </View>
                    </TouchableWithoutFeedback>
                {/* </ScrollView> */}
            </View>
        </Provider>

    )

}

export default LogInAdmin;