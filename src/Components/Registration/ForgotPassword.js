import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Input, Overlay, Text } from "react-native-elements";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import OTPTextView from "react-native-otp-textinput";

import { Styles } from "../../Styles/Registration/ForgotPasswordCss";
import { mobileRegex, passwordRegex } from '../../Others/Regex'
import appColors from '../../Others/appColors.json'

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { app } from '../../config/firebase'
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { passwordEncoder } from "../../Security/Encoder";
import { useNavigation } from "@react-navigation/native";

import CustomToast from "../Features/CustomToast";
import OverlayLoader from "../Features/OverlayLoader";
import OTPVerificationOverlay from "../Features/OTPVerificationOverlay";

export default function ForgotPassword() {

    const auth = getAuth();
    const navigation = useNavigation();
    const recaptchaVerifier = useRef(null);

    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');

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

    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState(false);

    const [showOvelayLoader, setShowOvelayLoader] = useState(false);
    const [ovelayLoaderContent, setOvelayLoaderContent] = useState('');

    const [showOTPOvelay, setShowOTPOvelay] = useState(false);
    const [entertedOtp, setEntertedOtp] = useState('');
    const [otpVerifyButtonDisabled, setOtpVerifyButtonDisabled] = useState(true);
    const [otpCredentials, setOtpCredentials] = useState(true);

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

    const Toast = (message, errorStatus = true, timeout = 2500, position = 'top') => {
        let content = { "message": message, "errorStatus": errorStatus, "timeout": timeout, "position": position };
        setToastContent(content);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
        }, timeout);
    }

    const handleSubmit = () => {
        if (!mobileRegex.test(userPhone)) {
            Toast("Enter valid mobile number");
        } else if (!passwordRegex.test(userPassword)) {
            Toast("Enter valid Password as per requirements");
        } else if (!passwordRegex.test(userConfirmPassword) || userPassword !== userConfirmPassword) {
            Toast("Both Password should be same");
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
        setShowOvelayLoader(true);
        setShowOTPOvelay(false);
        setOvelayLoaderContent('Checking user credentials...');
        getDoc(doc(firestore, "Users", userPhone, "Personal Details", "Data"))
            .then((result) => {
                if (result.data()) {
                    let encodedPassword = passwordEncoder(userPassword);
                    if (result.data().Password === encodedPassword) {
                        setShowOvelayLoader(false);
                        Toast('The given password appears to be same to the previous one.', undefined, 4000);
                    } else {
                        sendOTPtoUserMobile();
                    }
                    
                } else {
                    setShowOvelayLoader(false);
                    Toast("Oops! Unregistered mobile number. Verify or Create a new account.",undefined,5000);
                    console.log("Invalid Mobile number")
                }
            })
            .catch((error) => {
                setShowOvelayLoader(false);
                console.log(error);
                Toast(error.message, undefined, 5000);
            })
    }

    const sendOTPtoUserMobile = async () => {
        setShowOTPOvelay(false);
        setOvelayLoaderContent('Recaptcha Verifying...');
        setShowOvelayLoader(true);
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                '+91' + userPhone,
                recaptchaVerifier.current
            )
            setOvelayLoaderContent('Sending OTP...');
            console.log(verificationId);
            const timer = setTimeout(() => {
                Toast("OTP sent to your mobile",false);
                setOtpCredentials(verificationId);
                setShowOvelayLoader(false);
                setShowOTPOvelay(true);
            }, 1000);
            return () => clearTimeout(timer);
        } catch (error) {
            setShowOvelayLoader(false);
            Toast(error.message, undefined, 5000);
            console.log(error);
        }
    }

    const verifyOTP = () => {
        try {
            setOvelayLoaderContent('Verifying OTP...');
            setShowOvelayLoader(true);
            const credential = PhoneAuthProvider.credential(otpCredentials, entertedOtp);
            signInWithCredential(auth, credential)
                .then(() => {
                    Toast("OTP verified...", false);
                    updateUserPasswordInDatabase();
                })
                .catch((error) => {
                    setShowOvelayLoader(false);
                    Toast(error.message, undefined, 5000);
                })
        } catch (error) {
            setShowOvelayLoader(false);
            console.log(error.message)
            Toast(error.message, undefined, 5000);
        }
    }

    const updateUserPasswordInDatabase = async () => {
        setShowOTPOvelay(false);
        setOvelayLoaderContent('Updating your password...');
        setShowOvelayLoader(true);
        const encodedPassword = passwordEncoder(userPassword);

        updateDoc(doc(firestore, "Users", userPhone, "Personal Details", "Data"), {
            Password: encodedPassword
        })
            .then(() => {
                setShowOvelayLoader(false);
                Toast('Your password has been updated successfully.',false,3000);
                const timer = setTimeout(() => {
                    openLogInPage();
                }, 2000);
                return () => clearTimeout(timer);
            })
            .catch((e) => {
                setShowOvelayLoader(false);
                console.log(e);
                Toast("Error: Unable to update your password. Please try again later.");
            })
    }

    const openLogInPage = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LogIn' }],
        });
    }



    return (

        <View>
            {isToastVisible && <CustomToast content={toastContent} handleToastVisible={() => setIsToastVisible(false)} />}
            {showOvelayLoader && <OverlayLoader content={ovelayLoaderContent} />}
            {showOTPOvelay && <OTPVerificationOverlay setShowOTPOvelay={()=>setShowOTPOvelay(false)} phone={userPhone}
            otpVerifyButtonDisabled={otpVerifyButtonDisabled} setEntertedOtp={(text)=>setEntertedOtp(text)}
            verifyOTP={()=>verifyOTP()} sendOTPtoUserMobile={()=>sendOTPtoUserMobile()}/>}
            <ScrollView>
                <View>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={Styles.container}>
                            {/* <FirebaseRecaptchaVerifierModal
                                ref={recaptchaVerifier}
                                firebaseConfig={app.options}
                                attemptInvisibleVerification='true'
                            /> */}

                            <Input placeholder="Enter Mobile Number..."
                                style={Styles.input}
                                inputContainerStyle={Styles.inputContainer}
                                label='Phone'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name="phone" color={appColors.basicRed} />}
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
                                leftIcon={<Icon name='lock' color={appColors.basicRed} />}
                                rightIcon={
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name={userPasswordSuccessIcon} type="feather" color={userPasswordSuccessIconColor} />
                                        <Icon name={passwordEyeIcon} type="feather" color={appColors.basicRed}
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
                                leftIcon={<Icon name='lock' color={appColors.basicRed} />}
                                rightIcon={
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name={userPasswordConfirmSuccessIcon} type="feather" color={userPasswordConfirmSuccessIconColor} />
                                        <Icon name={passwordConfirmEyeIcon} type="feather" color={appColors.basicRed}
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

                    {/* <Overlay isVisible={showOTPOvelay} overlayStyle={Styles.otpOverlayStyle}>
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


                    </Overlay> */}
                </View>
            </ScrollView>
        </View>


    )
}