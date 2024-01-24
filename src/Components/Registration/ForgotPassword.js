import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Input, Overlay, Text } from "react-native-elements";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import OTPTextView from "react-native-otp-textinput";

import { Styles } from "../../Styles/Registration/ForgotPasswordCss";
import { mobileRegex, passwordRegex } from '../../Others/Regex'

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { app } from '../../config/firebase'
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { passwordEncoder } from "../../Security/Encoder";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {

    const auth = getAuth();
    const navigation = useNavigation();
    const recaptchaVerifier = useRef(null);

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
    const [loggeInStatusIcon, setLoggeInStatusIcon] = useState(require('../../Images/icon-success.gif'));
    const [loggeInStatusButtonIcon, setLoggeInStatusButtonIcon] = useState('');
    const [loggeInStatusButtonTitle, setLoggeInStatusButtonTitle] = useState('');

    const [showOTPOvelay, setShowOTPOvelay] = useState(false);
    const [entertedOtp, setEntertedOtp] = useState('');
    const [otpVerifyButtonDisabled, setOtpVerifyButtonDisabled] = useState(true);
    const [otpCredentials, setOtpCredentials] = useState(true);

    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');

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
        if (entertedOtp.length === 6) {
            setOtpVerifyButtonDisabled(false);
        } else {
            setOtpVerifyButtonDisabled(true);
        }
    }, [entertedOtp]);

    const handleSubmit = () => {
        if (!mobileRegex.test(userPhone)) {
            ToastAndroid.show("Enter valid mobile number", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!passwordRegex.test(userPassword)) {
            ToastAndroid.show("Enter valid Password as per requirements", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!passwordRegex.test(userConfirmPassword) || userPassword !== userConfirmPassword) {
            ToastAndroid.show("Both Password should be same", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            Alert.alert(
                'Confirm!',
                'Do you really want to change your password?',
                [
                    { text: 'Yes', onPress: () => checkUserMobileAccountFun() },
                    { text: 'No' }
                ],
                { cancelable: true }
            )
        }
    }

    const checkUserMobileAccountFun = () => {
        setShowOTPOvelay(false);
        setOverlayStatusMsg('Checking user credentials...');
        setShowOverlay(true);
        setIsLoggingIn(true);
        setIsLoggedInSuccessFailure(false);
        getDoc(doc(firestore, "Users", userPhone, "Personal Details", "Data"))
            .then((result) => {
                if (result.data()) {
                    sendOTPtoUserMobile();
                } else {
                    setShowOverlay(false);
                    setIsLoggingIn(false);
                    ToastAndroid.show("Oops! Unregistered mobile number. Verify or Create a new account.", ToastAndroid.LONG, ToastAndroid.CENTER);
                    console.log("Invalid Mobile number")
                }
            })
            .catch((error) => {
                setShowOverlay(false);
                setIsLoggingIn(false);
                setIsLoggedInSuccessFailure(true);
                console.log(error);
                ToastAndroid.show(error.message, ToastAndroid.LONG, ToastAndroid.CENTER);
            })
    }

    const sendOTPtoUserMobile = async () => {
        setShowOTPOvelay(false);
        setOverlayStatusMsg('Recaptcha Verifying...');
        setShowOverlay(true);
        setIsLoggingIn(true);
        setIsLoggedInSuccessFailure(false);
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                '+91' + userPhone,
                recaptchaVerifier.current
            )
            setOverlayStatusMsg('Sending OTP...');
            console.log(verificationId);
            const timer = setTimeout(() => {
                ToastAndroid.show("OTP sent to your mobile", ToastAndroid.SHORT, ToastAndroid.CENTER);
                setOtpCredentials(verificationId);
                setShowOverlay(false);
                setIsLoggingIn(false);
                setIsLoggedInSuccessFailure(false);
                setShowOTPOvelay(true);
            }, 1000);
            return () => clearTimeout(timer);
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG, ToastAndroid.CENTER);
            setShowOverlay(false);
            setIsLoggingIn(false);
            setIsLoggedInSuccessFailure(false);
            console.log(error);
        }
    }

    const verifyOTP = () => {
        try {
            setShowOTPOvelay(false);
            setOverlayStatusMsg('Verifying OTP...');
            setShowOverlay(true);
            setIsLoggingIn(true);
            setIsLoggedInSuccessFailure(false);
            const credential = PhoneAuthProvider.credential(otpCredentials, entertedOtp);
            signInWithCredential(auth, credential)
                .then(() => {
                    ToastAndroid.show("OTP verified...", ToastAndroid.SHORT, ToastAndroid.CENTER);
                    updateUserPasswordInDatabase();
                })
                .catch((error) => {
                    setShowOTPOvelay(true);
                    setShowOverlay(false);
                    setIsLoggingIn(false);
                    console.log(error.message)
                    ToastAndroid.show(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                })
        } catch (error) {
            setShowOverlay(false);
            setIsLoggedInSuccessful(false);
            setIsLoggingIn(false);
            setIsLoggedInSuccessFailure(true);
            setLoggeInStatusMsg("Error:" + error.message + ". Please try again later.");
            setLoggeInStatusIcon(require('../../Images/icon-error.gif'));
            setLoggeInStatusButtonIcon('refresh-cw');
            setLoggeInStatusButtonTitle('Retry');
            console.log(error.message)
            ToastAndroid.show(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    const updateUserPasswordInDatabase = async () => {
        setShowOTPOvelay(false);
        setOverlayStatusMsg('Updating your password...');
        setShowOverlay(true);
        setIsLoggingIn(true);
        setIsLoggedInSuccessFailure(false);
        const encodedPassword = passwordEncoder(userPassword);

        updateDoc(doc(firestore, "Users", userPhone, "Personal Details", "Data"), {
            Password: encodedPassword
        })
            .then(() => {
                setIsLoggedInSuccessful(true);
                setIsLoggingIn(false);
                setIsLoggedInSuccessFailure(true);
                setLoggeInStatusMsg('Your password has been updated successfully.');
                setLoggeInStatusIcon(require('../../Images/icon-success.gif'));
                setLoggeInStatusButtonIcon('log-in');
                setLoggeInStatusButtonTitle('LogIn');
                const timer = setTimeout(() => {
                    loginStatusFun();
                }, 5000);
                return () => clearTimeout(timer);
            })
            .catch((e) => {
                console.log(e);
                setIsLoggedInSuccessful(false);
                setIsLoggingIn(false);
                setIsLoggedInSuccessFailure(true);
                setLoggeInStatusMsg("Error: Unable to update your password. Please try again later.");
                setLoggeInStatusIcon(require('../../Images/icon-error.gif'));
                setLoggeInStatusButtonIcon('refresh-cw');
                setLoggeInStatusButtonTitle('Retry');
            })
    }

    const loginStatusFun = () => {
        setShowOverlay(false);
        if (isLoggedInSuccessful) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LogIn' }],
            });
        }
    }



    return (
        <ScrollView>
            <View>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={Styles.container}>
                        <FirebaseRecaptchaVerifierModal
                                ref={recaptchaVerifier}
                                firebaseConfig={app.options}
                                attemptInvisibleVerification='true'
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

                        <Input placeholder="Enter New Password..."
                            style={Styles.input}
                            secureTextEntry={!passwordVisible}
                            inputContainerStyle={Styles.inputContainer}
                            label='New Password'
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
                            label='Confirm New Password'
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

                        <Button
                            title='Update Password'
                            icon={<Icon name='arrow-right' type='feather' color='white' style={Styles.buttonIcon} />}
                            iconPosition='right'
                            loading={false} buttonStyle={Styles.button}
                            onPress={handleSubmit}
                        // onPress={StoreCompanyinFirestore} 
                        />
                    </View>
                </TouchableWithoutFeedback>

                <Overlay isVisible={showOTPOvelay} overlayStyle={Styles.otpOverlayStyle}>
                    <Text onPress={() => setShowOTPOvelay(false)} style={Styles.cancelButtonText}>x</Text>

                    <View style={Styles.otpOverlayContainerStyle}>
                        <Text style={Styles.otpOverlayTitle}>Mobile Verification</Text>
                        <Text style={Styles.otpOverlayTitleHint}>OTP has sent to {userPhone}</Text>
                        <View style={Styles.otpInputContainerStyle}>
                            <OTPTextView
                                autoFocus
                                inputCount={6}
                                tintColor='#670d94'
                                containerStyle={Styles.otpContainerStyle}
                                textInputStyle={Styles.otpTextInputStyle}
                                handleTextChange={(text) => setEntertedOtp(text)} />

                            <Button
                                disabled={otpVerifyButtonDisabled}
                                title='Verify OTP'
                                buttonStyle={Styles.otpContainerVerifyButton}
                                onPress={() => verifyOTP()}
                            />
                        </View>
                        <Text style={Styles.otpOverlayResendOTPHint} >Didn't you receive any code?</Text>
                        <TouchableOpacity>
                            <Text style={Styles.otpOverlayResendOTP} onPress={() => sendOTPtoUserMobile()}>Resend New Code</Text>
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