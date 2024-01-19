import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";
import { BottomSheet, Button, ButtonGroup, Icon, Image, Input, ListItem, Overlay, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

import { Styles } from "../Styles/SignUpCss";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database'
import { setDoc, doc } from 'firebase/firestore'
import { firestore } from "../config/firebase";
import { async } from "@firebase/util";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Clipboard from "@react-native-community/clipboard";
import OTPTextView from "react-native-otp-textinput";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignUp(props) {

    const auth = getAuth();
    const navigation = useNavigation();

    const [currentUserID, setCurrentUserId] = useState('');
    const [isUserProfileVerified, setIsUserProfileVerified] = useState(false);

    const [userNameSuccessIcon, setUserNameSuccessIcon] = useState('');
    const [userNameSuccessIconColor, setUserNameSuccessIconColor] = useState('');
    const [userEmailSuccessIcon, setUserEmailSuccessIcon] = useState('');
    const [userEmailSuccessIconColor, setUserEmailSuccessIconColor] = useState('');
    const [userPhoneSuccessIcon, setUserPhoneSuccessIcon] = useState('');
    const [userPhoneSuccessIconColor, setUserPhoneSuccessIconColor] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [passwordEyeIcon, setPasswordEyeIcon] = useState('eye');
    const [userPasswordSuccessIcon, setUserPasswordSuccessIcon] = useState('');
    const [userPasswordSuccessIconColor, setUserPasswordSuccessIconColor] = useState('');
    const [passwordConfirmButtonVisible, setPasswordConfirmButtonVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(true);
    const [passwordConfirmEyeIcon, setPasswordConfirmEyeIcon] = useState('eye');
    const [userPasswordConfirmSuccessIcon, setUserPasswordConfirmSuccessIcon] = useState('');
    const [userPasswordConfirmSuccessIconColor, setUserPasswordConfirmSuccessIconColor] = useState('');
    const [passwordHint, setPasswordHint] = useState(false);

    const [showOvelay, setShowOverlay] = useState(false);
    const [overlayStatusMsg, setOverlayStatusMsg] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggedInSuccessful, setIsLoggedInSuccessful] = useState(false);
    const [isLoggedInSuccessFailure, setIsLoggedInSuccessFailure] = useState(false);
    const [loggeInStatusMsg, setLoggeInStatusMsg] = useState('');
    const [loggeInStatusIcon, setLoggeInStatusIcon] = useState(require('../Images/icon-success.gif'));
    const [loggeInStatusButtonIcon, setLoggeInStatusButtonIcon] = useState('');
    const [loggeInStatusButtonTitle, setLoggeInStatusButtonTitle] = useState('');
    const [showOTPOvelay, setShowOTPOvelay] = useState(false);

    const genderButtons = ['Male', 'Female'];
    const [genderSelectedIndex, setGenderSelectedIndex] = useState(0);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userModifiedEmail, setUserModifiedEmail] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhone, setUserPhone] = useState('6356726534');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userMaskedPassword, setUserMaskedPassword] = useState('');

    const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;

    const list = [
        {
            title: ' Verify Your Details :)',
            containerStyle: Styles.bottomSheetTextTitleContainer,
            titleStyle: Styles.bottomSheetTextTitle,
            icon: 'alert-circle',
            iconColor: 'black'
        },
        {
            title: ' Name: ' + userName + '\n Email Id: ' + userEmail + '\n Gender: ' + userGender + "\n Phone: " + userPhone + " \n Password: " + userMaskedPassword,
            containerStyle: Styles.bottomSheetTextContentContainer,
            titleStyle: Styles.bottomSheetTextContent,
            icon: 'user',
            iconColor: 'black'
        },
        {
            title: 'Proceed',
            containerStyle: Styles.bottomSheetProceedButtonContainer,
            titleStyle: Styles.bottomSheetProceedButtonTitle,
            onPress: () => { setIsVisibleBottomSheet(false); registerUserAccountFun() },
            icon: 'check-circle',
            iconColor: 'white'
        },
        {
            title: 'Cancel',
            containerStyle: Styles.bottomSheetCancelButtonContainer,
            titleStyle: Styles.bottomSheetCancelButtonTitle,
            onPress: () => setIsVisibleBottomSheet(false),
            icon: 'x',
            iconColor: 'white'
        },
    ];

    useEffect(() => {
        setUserNameSuccessIcon('');
        setUserNameSuccessIconColor('');
        setUserEmailSuccessIcon('');
        setUserEmailSuccessIconColor('');
        setUserPhoneSuccessIcon('');
        setUserPhoneSuccessIconColor('');
        setPasswordVisible(true);
        setPasswordEyeIcon('eye');
        setUserPasswordSuccessIcon('');
        setUserPasswordSuccessIconColor('');
        setPasswordConfirmButtonVisible(false);
        setPasswordConfirmVisible(true);
        setPasswordConfirmEyeIcon('eye');
        setUserPasswordConfirmSuccessIcon('');
        setUserPasswordConfirmSuccessIconColor('');
        setPasswordHint(false);

        setShowOverlay(false);
        setOverlayStatusMsg('');
        setIsLoggingIn(false);
        setIsLoggedInSuccessful(false);
        setIsLoggedInSuccessFailure(false);
        setLoggeInStatusMsg('');
        setLoggeInStatusIcon(require('../Images/icon-success.gif'));
        setLoggeInStatusButtonIcon('');
        setLoggeInStatusButtonTitle('');

        setUserName('');
        setUserEmail('');
        setUserModifiedEmail('');
        setUserPhone('6356726534');
        setUserPassword('');
        setUserConfirmPassword('');
        setUserMaskedPassword('');

        setIsVisibleBottomSheet(false);

    }, [props])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserId(user.uid);
            }
        });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        if (userName.length > 3) {
            setUserNameSuccessIcon('check');
            setUserNameSuccessIconColor('#238732');
        } else if ((userName.length > 0)) {
            setUserNameSuccessIcon('x');
            setUserNameSuccessIconColor('#8c0a1b');
        } else {
            setUserNameSuccessIcon('');
            setUserNameSuccessIconColor('');
        }
    }, [userName]);

    useEffect(() => {
        if (emailRegex.test(userEmail)) {
            setUserEmailSuccessIcon('check');
            setUserEmailSuccessIconColor('#238732');
        } else if ((userEmail.length > 0)) {
            setUserEmailSuccessIcon('x');
            setUserEmailSuccessIconColor('#8c0a1b');
        } else {
            setUserEmailSuccessIcon('');
            setUserEmailSuccessIconColor('');
        }
    }, [userEmail]);

    useEffect(() => {
        if (mobileRegex.test(userPhone)) {
            setUserPhoneSuccessIcon('check');
            setUserPhoneSuccessIconColor('#238732');
        } else if (userPhone.length > 0) {
            setUserPhoneSuccessIcon('x');
            setUserPhoneSuccessIconColor('#8c0a1b');
        } else {
            setUserPhoneSuccessIcon('');
            setUserPhoneSuccessIconColor('');
        }
    }, [userPhone]);

    useEffect(() => {
        if (passwordRegex.test(userPassword)) {
            setUserPasswordSuccessIcon('check');
            setUserPasswordSuccessIconColor('#238732');
            setPasswordConfirmButtonVisible(true);
            setPasswordHint(false);
            if (userPassword === userConfirmPassword) {
                setUserPasswordConfirmSuccessIcon('check');
                setUserPasswordConfirmSuccessIconColor('#238732');
            } else if (userPassword.length > 0) {
                setUserPasswordConfirmSuccessIcon('x');
                setUserPasswordConfirmSuccessIconColor('#8c0a1b');
            } else {
                setUserPasswordConfirmSuccessIcon('');
                setUserPasswordConfirmSuccessIconColor('');
            }
        } else if (userPassword.length > 0) {
            setUserPasswordSuccessIcon('x');
            setUserPasswordSuccessIconColor('#8c0a1b');
            setPasswordConfirmButtonVisible(false);
            setPasswordHint(true);
        } else {
            setUserPasswordSuccessIcon('');
            setUserPasswordSuccessIconColor('');
            setPasswordConfirmButtonVisible(false);
            setPasswordHint(false);
            setUserPasswordConfirmSuccessIcon('');
            setUserPasswordConfirmSuccessIconColor('');
        }
    }, [userPassword]);

    useEffect(() => {
        if (passwordRegex.test(userPassword) && userPassword === userConfirmPassword) {
            setUserPasswordConfirmSuccessIcon('check');
            setUserPasswordConfirmSuccessIconColor('#238732');
        } else if (userPassword.length > 0) {
            setUserPasswordConfirmSuccessIcon('x');
            setUserPasswordConfirmSuccessIconColor('#8c0a1b');
        } else {
            setUserPasswordConfirmSuccessIcon('');
            setUserPasswordConfirmSuccessIconColor('');
        }
    }, [userConfirmPassword]);

    useEffect(() => {
        if (passwordVisible) {
            setPasswordEyeIcon('eye');
        } else {
            setPasswordEyeIcon('eye-off');
        }
    }, [passwordVisible]);

    useEffect(() => {
        if (passwordConfirmVisible) {
            setPasswordConfirmEyeIcon('eye');
        } else {
            setPasswordConfirmEyeIcon('eye-off');
        }
    }, [passwordConfirmVisible]);

    useEffect(() => {
        setUserGender(genderButtons[genderSelectedIndex])
    }, [genderSelectedIndex])

    useEffect(() => {
        storeUserDetailsInFirebase();
    }, [currentUserID])


    const handleSubmit = async () => {
        setUserModifiedEmail(userEmail.replace(/\./g, "-"))
        setIsUserProfileVerified(false);
        if (userName.length < 4) {
            ToastAndroid.show("Enter valid name", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!emailRegex.test(userEmail)) {
            ToastAndroid.show("Enter valid email id", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!mobileRegex.test(userPhone)) {
            ToastAndroid.show("Enter valid mobile number", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!passwordRegex.test(userPassword)) {
            ToastAndroid.show("Enter valid Password as per requirements", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!passwordRegex.test(userConfirmPassword) || userPassword !== userConfirmPassword) {
            ToastAndroid.show("Both Password should be same", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            const len = userPassword.length;
            const firstTwoChars = userPassword.substring(0, 1);
            const lastTwoChars = userPassword.substring(len - 1);
            const mask = '*'.repeat(len - 4);
            setUserMaskedPassword(`${firstTwoChars}${mask}${lastTwoChars}`);
            setIsVisibleBottomSheet(true);
            setIsUserProfileVerified(true);
        }
    }

    const registerUserAccountFun = () => {
        setShowOverlay(true);
        setIsLoggingIn(true);
        setIsLoggedInSuccessFailure(false);
        setOverlayStatusMsg('Creating your account...');
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                setOverlayStatusMsg('Storing your details in our database...')
            })
            .catch((error) => {
                setIsLoggedInSuccessful(false);
                setIsLoggingIn(false);
                setIsLoggedInSuccessFailure(true);
                setLoggeInStatusMsg(error.code);
                setLoggeInStatusIcon(require('../Images/icon-error.gif'));
                setLoggeInStatusButtonIcon('refresh-cw');
                setLoggeInStatusButtonTitle('Retry');
            });
    }

    const storeUserDetailsInFirebase = async () => {
        console.log("hi")
        if (currentUserID && isUserProfileVerified) {
            console.log("hello");
            try {
                setDoc(doc(firestore, "Users", currentUserID.toString(), "Personal Details", "Data"), {
                    Name: userName,
                    Mail: userEmail,
                    Gender: userGender,
                    Phone: userPhone,
                    Password: userMaskedPassword
                });
                setIsLoggedInSuccessful(true);
                setIsLoggingIn(false);
                setIsLoggedInSuccessFailure(true);
                setLoggeInStatusMsg('Your account has been created successfully.');
                setLoggeInStatusIcon(require('../Images/icon-success.gif'));
                setLoggeInStatusButtonIcon('home');
                setLoggeInStatusButtonTitle('Home');
            } catch (e) {
                setIsLoggedInSuccessful(false);
                setIsLoggingIn(false);
                setIsLoggedInSuccessFailure(true);
                setLoggeInStatusMsg("Error: Unable to save your information. Please try again later.");
                setLoggeInStatusIcon(require('../Images/icon-error.gif'));
                setLoggeInStatusButtonIcon('refresh-cw');
                setLoggeInStatusButtonTitle('Retry');
            }
        }
    }




    const StoreCompanyinFirestore = async () => {
        console.log("hello pop")
        try {
            setDoc(doc(firestore, "Others", "Cities"), { "data": cities });
            console.log("Success")
        } catch (e) {
            console.log(e);
        }
    }

    const loginStatusFun = () => {
        setShowOverlay(false);
        if (isLoggedInSuccessful) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Index' }],
            });
        }
    }

    let otpInput = useRef(null);

    // const clearText = () => {
    //     otpInput.current.clear();
    // }

    // const setText = () => {
    //     otpInput.current.setValue("123456");
    // }

    return (
        <ScrollView>
            <View>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View>
                        <View style={Styles.contaier}>
                            <Input placeholder="Enter Full Name..."
                                style={Styles.input}
                                inputContainerStyle={Styles.inputContainer}
                                label='Full Name'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name="user" type='feather' color='#3156c4' />}
                                onChangeText={(text) => setUserName(text)}
                                value={userName}
                                rightIcon={<Icon name={userNameSuccessIcon} type="feather" color={userNameSuccessIconColor} />}
                            />
                            <Input placeholder="Enter Email ID..."
                                style={Styles.input}
                                inputContainerStyle={Styles.inputContainer}
                                label='Email'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name="email" color='#3156c4' />}
                                keyboardType='email-address'
                                onChangeText={(text) => setUserEmail(text.toLocaleLowerCase())}
                                value={userEmail}
                                rightIcon={<Icon name={userEmailSuccessIcon} type="feather" color={userEmailSuccessIconColor} />}
                            />
                            <Text style={Styles.textComponetStyle}>Gender</Text>
                            <ButtonGroup buttons={genderButtons}
                                selectedIndex={genderSelectedIndex}
                                onPress={(ind) => setGenderSelectedIndex(ind)}
                                containerStyle={Styles.buttonGroupContainer}
                                textStyle={Styles.textStyle}
                                selectedButtonStyle={Styles.selectedButtonStyle}
                            />
                            <Input placeholder="Enter Mobile Number..."
                                style={Styles.input}
                                inputContainerStyle={Styles.inputContainer}
                                label='Phone'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name="phone" color='#3156c4' />}
                                keyboardType='numeric'
                                onChangeText={(text) => setUserPhone(text)}
                                value={userPhone}
                                rightIcon={<Icon name={userPhoneSuccessIcon} type="feather" color={userPhoneSuccessIconColor} />}
                            />
                            <Input placeholder="Enter Password..."
                                style={Styles.input}
                                secureTextEntry={!passwordVisible}
                                inputContainerStyle={Styles.inputContainer}
                                label='Create Password'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name='lock' color='#3156c4' />}
                                rightIcon={
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name={userPasswordSuccessIcon} type="feather" color={userPasswordSuccessIconColor} />
                                        <Icon name={passwordEyeIcon} type="feather" color='#3156c4'
                                            onPress={() => setPasswordVisible(!passwordVisible)} />
                                    </View>}
                                onChangeText={(text) => setUserPassword(text)}
                                value={userPassword}
                            />
                            {passwordHint && <Text style={[Styles.passwordHintText]}>
                                Your password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one symbol.
                            </Text>}
                            <Input placeholder="Confirm Password..."
                                style={Styles.input}
                                disabled={!passwordConfirmButtonVisible}
                                secureTextEntry={!passwordConfirmVisible}
                                inputContainerStyle={Styles.inputContainer}
                                label='Confirm Password'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name='lock' color='#3156c4' />}
                                rightIcon={
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name={userPasswordConfirmSuccessIcon} type="feather" color={userPasswordConfirmSuccessIconColor} />
                                        <Icon name={passwordConfirmEyeIcon} type="feather" color='#3156c4'
                                            onPress={() => setPasswordConfirmVisible(!passwordConfirmVisible)} />
                                    </View>}
                                onChangeText={(text) => setUserConfirmPassword(text)}
                                value={userConfirmPassword}
                            />
                            <Button title='REGISTER'
                                icon={<Icon name='arrow-right' type='feather' color='white' style={Styles.buttonIcon} />}
                                iconPosition='right'
                                loading={false} buttonStyle={Styles.button}
                                onPress={handleSubmit}
                            // onPress={StoreCompanyinFirestore} 
                            />


                        </View>
                        <BottomSheet isVisible={isVisibleBottomSheet}>
                            {list.map((l, i) => (
                                <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                    <Icon name={l.icon} type='feather' color={l.iconColor}></ Icon>
                                    <ListItem.Content con={{ display: 'flex', alignContent: 'flex-end' }}>
                                        <ListItem.Title style={[l.titleStyle]}>{l.title}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            ))}
                        </BottomSheet>
                    </View>
                </TouchableWithoutFeedback>

                <Overlay isVisible={!showOTPOvelay} overlayStyle={Styles.otpOverlayStyle}>
                    <Text onPress={()=>setShowOTPOvelay(true)} style={Styles.cancelButtonText}>x</Text>
                    
                    <View style={Styles.otpOverlayContainerStyle}>
                        <Text style={Styles.otpOverlayTitle}>Mobile Verification</Text>
                        <Text style={Styles.otpOverlayTitleHint}>OTP has sent to {userPhone}</Text>
                        <View style={Styles.otpInputContainerStyle}>
                            <OTPTextView
                                autoFocus
                                inputCount={6}
                                tintColor='#670d94'
                                containerStyle={Styles.otpContainerStyle}
                                textInputStyle={Styles.otpTextInputStyle} />

                            <Button
                                title='Verify OTP'
                                buttonStyle={Styles.otpContainerVerifyButton}
                            />
                        </View>
                        <Text style={Styles.otpOverlayResendOTPHint} >Didn't you receive any code?</Text>
                        <TouchableOpacity>
                            <Text style={Styles.otpOverlayResendOTP}>Resend New Code</Text>
                        </TouchableOpacity>
                    </View>


                </Overlay>

                <Overlay isVisible={showOvelay} overlayStyle={Styles.overlayStyle}>
                    {
                        isLoggingIn &&
                        <View>
                            <Text style={Styles.overlayPleaseWait}>
                                Please Wait...
                            </Text>
                            <Text style={Styles.overlayVerifingCredentials}>
                                {overlayStatusMsg}
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
            </View>
        </ScrollView>

    )
}