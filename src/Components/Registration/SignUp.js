import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";
import { BottomSheet, Button, ButtonGroup, FAB, Icon, Image, Input, ListItem, Overlay, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import ModalSelector from "react-native-modal-selector";
import OTPTextView from "react-native-otp-textinput";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios'

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, PhoneAuthProvider, signInWithPhoneNumber, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../config/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { firestore } from "../../config/firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { Styles } from "../../Styles/Registration/SignUpCss";
import { passwordEncoder } from "../../Security/Encoder";
import { passwordRegex } from '../../Others/Regex'

export default function SignUp(props) {

    const auth = getAuth();
    const navigation = useNavigation();
    const recaptchaVerifier = useRef(null);

    const [userFirstNameSuccessIcon, setUserFirstNameSuccessIcon] = useState('');
    const [userFirstNameSuccessIconColor, setUserFirstNameSuccessIconColor] = useState('');
    const [userLastNameSuccessIcon, setUserLastNameSuccessIcon] = useState('');
    const [userLastNameSuccessIconColor, setUserLastNameSuccessIconColor] = useState('');
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
    const [loggeInStatusIcon, setLoggeInStatusIcon] = useState(require('../../Images/icon-success.gif'));
    const [loggeInStatusButtonIcon, setLoggeInStatusButtonIcon] = useState('');
    const [loggeInStatusButtonTitle, setLoggeInStatusButtonTitle] = useState('');

    const [showOTPOvelay, setShowOTPOvelay] = useState(false);
    const [entertedOtp, setEntertedOtp] = useState('');
    const [otpVerifyButtonDisabled, setOtpVerifyButtonDisabled] = useState(true);
    const [otpCredentials, setOtpCredentials] = useState(true);

    const genderButtons = ['Male', 'Female'];
    const [genderSelectedIndex, setGenderSelectedIndex] = useState(0);

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userModifiedEmail, setUserModifiedEmail] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userMaskedPassword, setUserMaskedPassword] = useState('');
    const [userPlace, setUserPlace] = useState('');
    const [userPincode, setUserPincode] = useState('');
    const [userPost, setUserPost] = useState('');
    const [userTaluk, setUserTaluk] = useState('');
    const [userDistrict, setUserDistrict] = useState('');
    const [userState, setUserState] = useState('');
    const [userCountry, setUserCountry] = useState('');

    const [userPincodeAddressArr, setUserPincodeAddressArr] = useState([]);
    const [userPincodePostOfficeArr, setUserPostOfficeArr] = useState([]);
    const [userPostDisabled, setUserPostDisabled] = useState(true);
    const [otherAddressPlaceholderMsg, setOtherAddressPlaceholderMsg] = useState('Please Enter Pincode')

    const [userPincodeSuccessIcon, setUserPincodeSuccessIcon] = useState('');
    const [userPincodeSuccessIconColor, setUserPincodeSuccessIconColor] = useState('#8c0a1b');
    const [userPlaceSuccessIcon, setUserPlaceSuccessIcon] = useState('');
    const [userPlaceSuccessIconColor, setUserPlaceSuccessIconColor] = useState('#8c0a1b');
    const [userPostSuccessIcon, setUserPostSuccessIcon] = useState('');
    const [userPostSuccessIconColor, setUserPostSuccessIconColor] = useState('#8c0a1b');
    const [userTalukSuccessIcon, setUserTalukSuccessIcon] = useState('');
    const [userTalukSuccessIconColor, setUserTalukSuccessIconColor] = useState('#8c0a1b');
    const [userDistrictSuccessIcon, setUserDistrictSuccessIcon] = useState('');
    const [userDistrictSuccessIconColor, setUserDistrictSuccessIconColor] = useState('#8c0a1b');
    const [userStateSuccessIcon, setUserStateSuccessIcon] = useState('');
    const [userStateSuccessIconColor, setUserStateSuccessIconColor] = useState('#8c0a1b');
    const [userCountrySuccessIcon, setUserCountrySuccessIcon] = useState('');
    const [userCountrySuccessIconColor, setUserCountrySuccessIconColor] = useState('#8c0a1b');

    const [postSelectTextColor, setPostSelectTextColor] = useState('#ccc');
    const [userPincodeVerified, setUserPincodeVerified] = useState(false);
    const [pincodeVerifyOverlay, setPincodeVerifyOverlay] = useState(false);


    const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
    const pincodeRegex = /^\d{6}$/

    const list = [
        {
            title: ' Verify Your Details :)',
            containerStyle: Styles.bottomSheetTextTitleContainer,
            titleStyle: Styles.bottomSheetTextTitle,
            icon: 'alert-circle',
            iconColor: 'black'
        },
        {
            title: ' Name: ' + userFirstName + ' ' + userLastName + '\n Email Id: ' + userEmail + '\n Gender: ' + userGender + "\n Phone: " + userPhone + " \n Password: " + userMaskedPassword
                + "\n Address: " + (userPlace + ", " + userPost + ", " + userTaluk + ", " + userDistrict + ", " + userState + ", " + userCountry + "."),
            containerStyle: Styles.bottomSheetTextContentContainer,
            titleStyle: Styles.bottomSheetTextContent,
            icon: 'user',
            iconColor: 'black'
        },
        {
            title: 'Proceed',
            containerStyle: Styles.bottomSheetProceedButtonContainer,
            titleStyle: Styles.bottomSheetProceedButtonTitle,
            onPress: () => { setIsVisibleBottomSheet(false); sendOTPtoUserMobile() },
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
        if (userFirstName.length > 2) {
            setUserFirstNameSuccessIcon('check');
            setUserFirstNameSuccessIconColor('#238732');
        } else {
            setUserFirstNameSuccessIcon('x');
            setUserFirstNameSuccessIconColor('#8c0a1b');
        }
    }, [userFirstName]);

    useEffect(() => {
        if (userLastName.length > 0) {
            setUserLastNameSuccessIcon('check');
            setUserLastNameSuccessIconColor('#238732');
        } else {
            setUserLastNameSuccessIcon('x');
            setUserLastNameSuccessIconColor('#8c0a1b');
        }
    }, [userLastName]);

    useEffect(() => {
        if (emailRegex.test(userEmail)) {
            setUserEmailSuccessIcon('check');
            setUserEmailSuccessIconColor('#238732');
        } else {
            setUserEmailSuccessIcon('x');
            setUserEmailSuccessIconColor('#8c0a1b');
        }
    }, [userEmail]);

    useEffect(() => {
        if (mobileRegex.test(userPhone)) {
            setUserPhoneSuccessIcon('check');
            setUserPhoneSuccessIconColor('#238732');
        } else {
            setUserPhoneSuccessIcon('x');
            setUserPhoneSuccessIconColor('#8c0a1b');
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
            } else {
                setUserPasswordConfirmSuccessIcon('x');
                setUserPasswordConfirmSuccessIconColor('#8c0a1b');
            }
        } else if (userPassword.length > 0) {
            setUserPasswordSuccessIcon('x');
            setUserPasswordSuccessIconColor('#8c0a1b');
            setPasswordConfirmButtonVisible(false);
            setPasswordHint(true);
        } else {
            setUserPasswordSuccessIcon('x');
            setUserPasswordSuccessIconColor('#8c0a1b');
            setPasswordConfirmButtonVisible(false);
            setPasswordHint(false);
            setUserPasswordConfirmSuccessIcon('x');
            setUserPasswordConfirmSuccessIconColor('#8c0a1b');
        }
    }, [userPassword]);

    useEffect(() => {
        if (passwordRegex.test(userPassword) && userPassword === userConfirmPassword) {
            setUserPasswordConfirmSuccessIcon('check');
            setUserPasswordConfirmSuccessIconColor('#238732');
        } else {
            setUserPasswordConfirmSuccessIcon('x');
            setUserPasswordConfirmSuccessIconColor('#8c0a1b');
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
        if (userPlace.length > 3) {
            setUserPlaceSuccessIcon('check');
            setUserPlaceSuccessIconColor('#238732');
        } else {
            setUserPlaceSuccessIcon('x');
            setUserPlaceSuccessIconColor('#8c0a1b');
        }
    }, [userPlace]);

    useEffect(() => {
        setUserPostOfficeArr([]);
        setUserPostDisabled(true);
        setPostSelectTextColor('#ccc')
        setUserPost("Please Enter Pincode")
        setOtherAddressPlaceholderMsg('Please Enter Pincode');
        setUserTaluk('');
        setUserDistrict('');
        setUserState('');
        setUserCountry('');
        setUserPostSuccessIcon('x');
        setUserPostSuccessIconColor('#8c0a1b');
        setUserTalukSuccessIcon('x');
        setUserTalukSuccessIconColor('#8c0a1b');
        setUserDistrictSuccessIcon('x');
        setUserDistrictSuccessIconColor('#8c0a1b');
        setUserStateSuccessIcon('x');
        setUserStateSuccessIconColor('#8c0a1b');
        setUserCountrySuccessIcon('x');
        setUserCountrySuccessIconColor('#8c0a1b')
        if (!userPincodeVerified) {
            if (pincodeRegex.test(userPincode)) {
                checkGivenPincodeStatus();
            } else {
                setUserPincodeSuccessIcon('x');
                setUserPincodeSuccessIconColor('#8c0a1b');
            }
        } else if (!pincodeRegex.test(userPincode)) {
            setUserPincodeVerified(false);
            if (pincodeRegex.test(userPincode)) {
                checkGivenPincodeStatus();
            } else {
                setUserPincodeSuccessIcon('x');
                setUserPincodeSuccessIconColor('#8c0a1b');
            }
        }

    }, [userPincode]);

    useEffect(() => {
        console.log(userPost);
        if (userPost !== 'Please Enter Pincode' && userPost !== 'Please Select PostOffice') {
            setUserPostSuccessIcon('check');
            setUserPostSuccessIconColor('#238732');
        } else {
            setUserPostSuccessIcon('x');
            setUserPostSuccessIconColor('#8c0a1b');
        }
    }, [userPost]);

    useEffect(() => {
        if (userTaluk.length > 3) {
            setUserTalukSuccessIcon('check');
            setUserTalukSuccessIconColor('#238732');
        } else {
            setUserTalukSuccessIcon('x');
            setUserTalukSuccessIconColor('#8c0a1b');
        }
    }, [userTaluk]);

    useEffect(() => {
        if (userDistrict.length > 3) {
            setUserDistrictSuccessIcon('check');
            setUserDistrictSuccessIconColor('#238732');
        } else {
            setUserDistrictSuccessIcon('x');
            setUserDistrictSuccessIconColor('#8c0a1b');
        }
    }, [userDistrict]);

    useEffect(() => {
        if (userState.length > 3) {
            setUserStateSuccessIcon('check');
            setUserStateSuccessIconColor('#238732');
        } else {
            setUserStateSuccessIcon('x');
            setUserStateSuccessIconColor('#8c0a1b');
        }
    }, [userState]);

    useEffect(() => {
        if (userCountry.length > 3) {
            setUserCountrySuccessIcon('check');
            setUserCountrySuccessIconColor('#238732');
        } else {
            setUserCountrySuccessIcon('x');
            setUserStateSuccessIconColor('#8c0a1b');
        }
    }, [userCountry]);

    useEffect(() => {
        if (entertedOtp.length === 6) {
            setOtpVerifyButtonDisabled(false);
        } else {
            setOtpVerifyButtonDisabled(true);
        }
    }, [entertedOtp]);

    const checkGivenPincodeStatus = () => {
        setPincodeVerifyOverlay(true);
        axios.get('https://api.postalpincode.in/pincode/' + userPincode)
            .then((response) => {
                if (response.status === 200 && response.data && response.data[0].Status === 'Success') {
                    setUserPincodeAddressArr(response.data[0].PostOffice)
                    setUserPincodeSuccessIcon('check');
                    setUserPincodeSuccessIconColor('#238732');
                    setUserPincodeVerified(true);
                    setPincodeVerifyOverlay(false);

                    const data = response.data[0].PostOffice.map((obj) => {
                        return { key: obj.Name, label: obj.Name }
                    })
                    console.log(data);
                    setUserPostOfficeArr(data)
                    setUserPostDisabled(false);
                    setPostSelectTextColor('#000000')
                    setUserPost("Please Select PostOffice")
                    setOtherAddressPlaceholderMsg('Please Select PostOffice')
                } else {
                    setUserPincodeSuccessIcon('x');
                    setUserPincodeSuccessIconColor('#8c0a1b');
                    ToastAndroid.show("Invalid Pincode", ToastAndroid.LONG);
                    setUserPincodeVerified(false);
                    setPincodeVerifyOverlay(false);
                }
                console.log("response", response);
            })
            .catch((error) => {
                setUserPincodeSuccessIcon('x');
                setUserPincodeSuccessIconColor('#8c0a1b');
                setPincodeVerifyOverlay(false);
                ToastAndroid.show(error.message, ToastAndroid.LONG);
                setUserPincodeVerified(false);
                console.log("error", JSON.stringify(error.message));
            })
    }

    const postSelectedFromList = (option) => {
        setUserPost(option.label);
        for (let i = 0; i < userPincodeAddressArr.length; i++) {
            if (userPincodeAddressArr[i].Name === option.label) {
                setUserTaluk(userPincodeAddressArr[i].Block);
                setUserDistrict(userPincodeAddressArr[i].District);
                setUserState(userPincodeAddressArr[i].State);
                setUserCountry(userPincodeAddressArr[i].Country);
                setUserPostSuccessIcon('check');
                setUserPostSuccessIconColor('#238732');
                setUserTalukSuccessIcon('check');
                setUserTalukSuccessIconColor('#238732');
                setUserDistrictSuccessIcon('check');
                setUserDistrictSuccessIconColor('#238732');
                setUserStateSuccessIcon('check');
                setUserStateSuccessIconColor('#238732');
                setUserCountrySuccessIcon('check');
                setUserCountrySuccessIconColor('#238732');
            }
        }
    }

    const handleSubmit = async () => {
        setUserModifiedEmail(userEmail.replace(/\./g, "-"))
        if (userFirstName.length < 4) {
            ToastAndroid.show("Enter valid first name", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } if (userLastName.length < 1) {
            ToastAndroid.show("Enter valid last name", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!mobileRegex.test(userPhone)) {
            ToastAndroid.show("Enter valid mobile number", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!emailRegex.test(userEmail)) {
            ToastAndroid.show("Enter valid email id", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!passwordRegex.test(userPassword)) {
            ToastAndroid.show("Enter valid Password as per requirements", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!passwordRegex.test(userConfirmPassword) || userPassword !== userConfirmPassword) {
            ToastAndroid.show("Both Password should be same", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (userPlace.length < 4) {
            ToastAndroid.show("Enter Your Place name", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (!userPincodeVerified) {
            ToastAndroid.show("Please Verify Your Pincode", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            const len = userPassword.length;
            const firstTwoChars = userPassword.substring(0, 1);
            const lastTwoChars = userPassword.substring(len - 1);
            const mask = '*'.repeat(len - 4);
            setUserMaskedPassword(`${firstTwoChars}${mask}${lastTwoChars}`);
            setIsVisibleBottomSheet(true);
        }
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

    const signInWithPhoneNumberFun = async () => {
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
                    storeUserDetailsInFirebase();
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

    const storeUserDetailsInFirebase = async () => {
        setShowOTPOvelay(false);
        setOverlayStatusMsg('Storing your details in Database...');
        setShowOverlay(true);
        setIsLoggingIn(true);
        setIsLoggedInSuccessFailure(false);
        const encodedPassword = passwordEncoder(userPassword);
        try {
            setDoc(doc(firestore, "Users", userPhone, "Personal Details", "Data"), {
                FirstName: userFirstName,
                LastName: userLastName,
                Phone: userPhone,
                Gender: userGender,
                Mail: userEmail,
                Password: encodedPassword,
            });
            setDoc(doc(firestore, "Users", userPhone, "Address", "Data"), {
                Place: userPlace,
                Post: userPost,
                Taluk: userTaluk,
                District: userDistrict,
                State: userState,
                Country: userDistrict,
            });
            setIsLoggedInSuccessful(true);
            setIsLoggingIn(false);
            setIsLoggedInSuccessFailure(true);
            setLoggeInStatusMsg('Your account has been created successfully.');
            setLoggeInStatusIcon(require('../../Images/icon-success.gif'));
            setLoggeInStatusButtonIcon('home');
            setLoggeInStatusButtonTitle('Home');
        } catch (e) {
            console.log(e);
            setIsLoggedInSuccessful(false);
            setIsLoggingIn(false);
            setIsLoggedInSuccessFailure(true);
            setLoggeInStatusMsg("Error: Unable to save your information. Please try again later.");
            setLoggeInStatusIcon(require('../../Images/icon-error.gif'));
            setLoggeInStatusButtonIcon('refresh-cw');
            setLoggeInStatusButtonTitle('Retry');
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

    return (
        <View>
            <ScrollView>
                <View>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View>
                            <View style={Styles.contaier}>
                                <FirebaseRecaptchaVerifierModal
                                    ref={recaptchaVerifier}
                                    firebaseConfig={app.options}
                                    attemptInvisibleVerification='true'
                                />
                                <Input placeholder="Enter First Name..."
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='First Name'
                                    labelStyle={Styles.lableStyle}
                                    leftIcon={<Icon name="user" type='feather' color='#3156c4' />}
                                    onChangeText={(text) => setUserFirstName(text)}
                                    value={userFirstName}
                                    rightIcon={<Icon name={userFirstNameSuccessIcon} type="feather" color={userFirstNameSuccessIconColor} />}
                                />
                                <Input placeholder="Enter Last Name..."
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Last Name'
                                    labelStyle={Styles.lableStyle}
                                    leftIcon={<Icon name="user" type='feather' color='#3156c4' />}
                                    onChangeText={(text) => setUserLastName(text)}
                                    value={userLastName}
                                    rightIcon={<Icon name={userLastNameSuccessIcon} type="feather" color={userLastNameSuccessIconColor} />}
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
                                <Text style={Styles.textComponetStyle}>Gender</Text>
                                <ButtonGroup buttons={genderButtons}
                                    selectedIndex={genderSelectedIndex}
                                    onPress={(ind) => setGenderSelectedIndex(ind)}
                                    containerStyle={Styles.buttonGroupContainer}
                                    textStyle={Styles.textStyle}
                                    selectedButtonStyle={Styles.selectedButtonStyle}
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
                                <Input placeholder="Enter Password..."
                                    style={Styles.input}
                                    secureTextEntry={!passwordVisible}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Create Password'
                                    labelStyle={Styles.lableStyle}
                                    leftIcon={<Icon name='lock' color='#3156c4' />}
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name={passwordEyeIcon} type="feather" color='#3156c4'
                                                onPress={() => setPasswordVisible(!passwordVisible)} />
                                            <Icon name={userPasswordSuccessIcon} type="feather" color={userPasswordSuccessIconColor} />
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
                                            <Icon name={passwordConfirmEyeIcon} type="feather" color='#3156c4'
                                                onPress={() => setPasswordConfirmVisible(!passwordConfirmVisible)} />
                                            <Icon name={userPasswordConfirmSuccessIcon} type="feather" color={userPasswordConfirmSuccessIconColor} />
                                        </View>}
                                    onChangeText={(text) => setUserConfirmPassword(text)}
                                    value={userConfirmPassword}
                                />

                                <Input
                                    placeholder='Enter your place'
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Place'
                                    labelStyle={Styles.lableStyle}
                                    value={userPlace}
                                    onChangeText={(text) => setUserPlace(text)}
                                    rightIcon={<Icon name={userPlaceSuccessIcon} type="feather" color={userPlaceSuccessIconColor} />}
                                />

                                <Input
                                    placeholder='Enter 6 digit pincode'
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Pincode'
                                    keyboardType='numeric'
                                    labelStyle={Styles.lableStyle}
                                    value={userPincode}
                                    onChangeText={(text) => setUserPincode(text)}
                                    rightIcon={<Icon name={userPincodeSuccessIcon} type="feather" color={userPincodeSuccessIconColor} />}
                                />

                                <Text style={Styles.postText}>Post</Text>

                                <ModalSelector
                                    style={Styles.selectPost}
                                    data={userPincodePostOfficeArr}
                                    onChange={(option) => {
                                        postSelectedFromList(option)
                                    }}
                                    disabled={userPostDisabled}
                                >
                                    <TouchableOpacity style={Styles.selectPostInput}>
                                        <Text style={[Styles.selectPostOption, { color: postSelectTextColor }]}>
                                            {userPost}
                                        </Text>
                                        <Icon name={userPostSuccessIcon} type='feather' color={userPostSuccessIconColor} />
                                    </TouchableOpacity>

                                </ModalSelector>

                                <Input
                                    placeholder={otherAddressPlaceholderMsg}
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Taluk'
                                    labelStyle={Styles.lableStyle}
                                    value={userTaluk}
                                    disabled={true}
                                    rightIcon={<Icon name={userTalukSuccessIcon} type="feather" color={userTalukSuccessIconColor} />}
                                />

                                <Input
                                    placeholder={otherAddressPlaceholderMsg}
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='District'
                                    labelStyle={Styles.lableStyle}
                                    value={userDistrict}
                                    disabled={true}
                                    rightIcon={<Icon name={userDistrictSuccessIcon} type="feather" color={userDistrictSuccessIconColor} />}
                                />

                                <Input
                                    placeholder={otherAddressPlaceholderMsg}
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='State'
                                    labelStyle={Styles.lableStyle}
                                    value={userState}
                                    disabled={true}
                                    rightIcon={<Icon name={userStateSuccessIcon} type="feather" color={userStateSuccessIconColor} />}
                                />

                                <Input
                                    placeholder={otherAddressPlaceholderMsg}
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Country'
                                    labelStyle={Styles.lableStyle}
                                    value={userCountry}
                                    disabled={true}
                                    rightIcon={<Icon name={userCountrySuccessIcon} type="feather" color={userCountrySuccessIconColor} />}
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

                    <Overlay isVisible={pincodeVerifyOverlay}>
                        <View style={Styles.pincodeOverlayStyle}>
                            <Text style={Styles.pincodeOverlayTitle}>Please wait...</Text>
                            <Text style={Styles.pincodeOverlayMsg}>Verifying your pincode ({userPincode})</Text>
                            <ActivityIndicator size="large" style={Styles.overlayActivityIndicator}
                                color='#2e4dbf' />
                        </View>
                    </Overlay>

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
                                    onPress={() => signInWithPhoneNumberFun()}
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
            <FAB placement='right'
        buttonStyle={{ backgroundColor: '#211c9e' }}
        icon={<Icon name='arrow-right' type='feather' color='white' />}
        
      />
        </View>


    )
}