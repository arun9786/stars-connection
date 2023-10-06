import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, ScrollView, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";
import { BottomSheet, Button, ButtonGroup, Icon, Image, Input, ListItem, Overlay, Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

import { Styles } from "../Styles/SignUpCss";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database'
import { setDoc, doc } from 'firebase/firestore'
import { firestore } from "../config/firebase";
import { async } from "@firebase/util";

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

    const genderButtons = ['Male', 'Female'];
    const [genderSelectedIndex, setGenderSelectedIndex] = useState(0);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userModifiedEmail, setUserModifiedEmail] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhone, setUserPhone] = useState('');
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
        setUserPhone('');
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


    const handleSubmit = async() => {
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
                setDoc(doc(firestore, "Users",currentUserID.toString() ,"Personal Details","Data"),{
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


    // const StoreCompanyinFirestore= async ()=>{
    //     console.log("hello")
    //     try{
    //         const indianCompanies = [
    //             "Reliance Industries Limited",
    //             "Tata Consultancy Services Limited",
    //             "HDFC Bank Limited",
    //             "ICICI Bank Limited",
    //             "Hindustan Unilever Limited",
    //             "Infosys Limited",
    //             "Housing Development Finance Corporation Limited",
    //             "ITC Limited",
    //             "State Bank of India",
    //             "Bharti Airtel Limited",
    //             "Kotak Mahindra Bank Limited",
    //             "Bajaj Finance Limited",
    //             "Life Insurance Corporation Of India",
    //             "Larsen & Toubro Limited",
    //             "HCL Technologies Limited",
    //             "Asian Paints Limited",
    //             "Axis Bank Limited",
    //             "Maruti Suzuki India Limited",
    //             "Sun Pharmaceutical Industries Limited",
    //             "Titan Company Limited",
    //             "Avenue Supermarts Limited",
    //             "UltraTech Cement Limited",
    //             "Bajaj Finserv Limited",
    //             "Wipro Limited",
    //             "Adani Enterprises Limited",
    //             "Oil & Natural Gas Corporation Limited",
    //             "NTPC Limited",
    //             "JSW Steel Limited",
    //             "Power Grid Corporation of India Limited",
    //             "Mahindra & Mahindra Limited",
    //             "LTIMindtree Limited",
    //             "Tata Motors Limited",
    //             "Adani Green Energy Limited",
    //             "Adani Ports and Special Economic Zone Limited",
    //             "Coal India Limited",
    //             "Tata Steel Limited",
    //             "Hindustan Zinc Limited",
    //             "Pidilite Industries Limited",
    //             "Siemens Limited",
    //             "Adani Transmission Limited",
    //             "SBI Life Insurance Company Limited",
    //             "Indian Oil Corporation Limited",
    //             "Bajaj Auto Limited",
    //             "Grasim Industries Limited",
    //             "Tech Mahindra Limited",
    //             "HDFC Life Insurance Company Limited",
    //             "Britannia Industries Limited",
    //             "Vedanta Limited",
    //             "Godrej Consumer Products Limited",
    //             "Dabur India Limited",
    //             "Adani Total Gas Limited",
    //             "SHREE CEMENT LIMITED",
    //             "Hindustan Aeronautics Limited",
    //             "Hindalco Industries Limited",
    //             "Varun Beverages Limited",
    //             "DLF Limited",
    //             "Bank of Baroda",
    //             "IndusInd Bank Limited",
    //             "Eicher Motors Limited",
    //             "Dr. Reddy's Laboratories Limited",
    //             "Divi's Laboratories Limited",
    //             "Bharat Petroleum Corporation Limited",
    //             "Havells India Limited",
    //             "Adani Power Limited",
    //             "InterGlobe Aviation Limited",
    //             "Cipla Limited",
    //             "Ambuja Cements Limited",
    //             "SRF Limited",
    //             "ABB India Limited",
    //             "Bharat Electronics Limited",
    //             "SBI Cards and Payment Services Limited",
    //             "GAIL (India) Limited",
    //             "Bajaj Holdings & Investment Limited",
    //             "TATA CONSUMER PRODUCTS LIMITED",
    //             "ICICI Prudential Life Insurance Company Limited",
    //             "Cholamandalam Investment and Finance Company Limited",
    //             "Marico Limited",
    //             "Apollo Hospitals Enterprise Limited",
    //             "Tata Power Company Limited",
    //             "Bosch Limited",
    //             "Berger Paints (I) Limited",
    //             "Jindal Steel & Power Limited",
    //             "United Spirits Limited",
    //             "UPL Limited",
    //             "Adani Wilmar Limited",
    //             "ICICI Lombard General Insurance Company Limited",
    //             "Torrent Pharmaceuticals Limited",
    //             "Canara Bank",
    //             "Punjab National Bank",
    //             "TVS Motor Company Limited",
    //             "Zydus Lifesciences Limited",
    //             "Tube Investments of India Limited",
    //             "Trent Limited",
    //             "IDBI Bank Limited",
    //             "Info Edge (India) Limited",
    //             "Shriram Finance Limited",
    //             "Hero MotoCorp Limited",
    //             "The Indian Hotels Company Limited",
    //             "PI Industries Limited",
    //             "Indian Railway Catering And Tourism Corporation Limited",
    //             "CG Power and Industrial Solutions Limited",
    //             "Union Bank of India",
    //             "Samvardhana Motherson International Limited",
    //             "Cummins India Limited",
    //             "Schaeffler India Limited",
    //             "Macrotech Developers Limited",
    //             "Zomato Limited",
    //             "Procter & Gamble Hygiene and Health Care Limited",
    //             "Yes Bank Limited",
    //             "Polycab India Limited",
    //             "Max Healthcare Institute Limited",
    //             "Indian Overseas Bank",
    //             "Page Industries Limited",
    //             "Colgate Palmolive (India) Limited",
    //             "Ashok Leyland Limited",
    //             "Alkem Laboratories Limited",
    //             "NHPC Limited",
    //             "One 97 Communications Limited",
    //             "Power Finance Corporation Limited",
    //             "JSW Energy Limited",
    //             "Muthoot Finance Limited",
    //             "AU Small Finance Bank Limited",
    //             "Indus Towers Limited",
    //             "Balkrishna Industries Limited",
    //             "United Breweries Limited",
    //             "Aditya Birla Capital Limited",
    //             "Tata Elxsi Limited",
    //             "Dalmia Bharat Limited",
    //             "HDFC Asset Management Company Limited",
    //             "Indian Bank",
    //             "Astral Limited",
    //             "Bharat Forge Limited",
    //             "L&T Technology Services Limited",
    //             "MRF Limited",
    //             "Tata Communications Limited",
    //             "FSN E-Commerce Ventures Limited",
    //             "Container Corporation of India Limited",
    //             "Persistent Systems Limited",
    //             "Patanjali Foods Limited",
    //             "Indian Railway Finance Corporation Limited",
    //             "Linde India Limited",
    //             "IDFC First Bank Limited",
    //             "Petronet LNG Limited",
    //             "Solar Industries India Limited",
    //             "Steel Authority of India Limited",
    //             "MphasiS Limited",
    //             "Hindustan Petroleum Corporation Limited",
    //             "APL Apollo Tubes Limited",
    //             "Gujarat Fluorochemicals Limited",
    //             "NMDC Limited",
    //             "Honeywell Automation India Limited",
    //             "Supreme Industries Limited",
    //             "Gujarat Gas Limited",
    //             "Bandhan Bank Limited",
    //             "ACC Limited",
    //             "Oberoi Realty Limited",
    //             "Bank of India",
    //             "REC Limited",
    //             "Aurobindo Pharma Limited",
    //             "Star Health and Allied Insurance Company Limited",
    //             "Indraprastha Gas Limited",
    //             "Lupin Limited",
    //             "UCO Bank",
    //             "Jubilant Foodworks Limited",
    //             "PB Fintech Limited",
    //             "Godrej Properties Limited",
    //             "Mahindra & Mahindra Financial Services Limited",
    //             "Vodafone Idea Limited",
    //             "Oracle Financial Services Software Limited",
    //             "The Federal Bank Limited",
    //             "Vedant Fashions Limited",
    //             "UNO Minda Limited",
    //             "AIA Engineering Limited",
    //             "Thermax Limited",
    //             "Oil India Limited",
    //             "Voltas Limited",
    //             "3M India Limited",
    //             "Coromandel International Limited",
    //             "Sundaram Finance Limited",
    //             "KPIT Technologies Limited",
    //             "Deepak Nitrite Limited",
    //             "Escorts Kubota Limited",
    //             "Biocon Limited",
    //             "Tata Chemicals Limited",
    //             "Torrent Power Limited",
    //             "GMR Airports Infrastructure Limited",
    //             "Bharat Heavy Electricals Limited",
    //             "Sona BLW Precision Forgings Limited",
    //             "Delhivery Limited",
    //             "Syngene International Limited",
    //             "CRISIL Limited",
    //             "General Insurance Corporation of India",
    //             "Coforge Limited",
    //             "The Phoenix Mills Limited",
    //             "JK Cement Limited",
    //             "Poonawalla Fincorp Limited",
    //             "GlaxoSmithKline Pharmaceuticals Limited",
    //             "Max Financial Services Limited",
    //             "Metro Brands Limited",
    //             "Motherson Sumi Wiring India Limited",
    //             "Sumitomo Chemical India Limited",
    //             "Relaxo Footwears Limited",
    //             "Navin Fluorine International Limited",
    //             "SKF India Limited",
    //             "Central Bank of India",
    //             "Gland Pharma Limited",
    //             "Kansai Nerolac Paints Limited",
    //             "Grindwell Norton Limited",
    //             "Timken India Limited",
    //             "IPCA Laboratories Limited",
    //             "Sundram Fasteners Limited",
    //             "Atul Limited",
    //             "Zee Entertainment Enterprises Limited",
    //             "L&T Finance Holdings Limited",
    //             "Aditya Birla Fashion and Retail Limited",
    //             "Apollo Tyres Limited",
    //             "K.P.R. Mill Limited",
    //             "ZF Commercial Vehicle Control Systems India Limited",
    //             "Fortis Healthcare Limited",
    //             "Aarti Industries Limited",
    //             "Hatsun Agro Product Limited",
    //             "Carborundum Universal Limited",
    //             "Vinati Organics Limited",
    //             "IIFL Finance Limited",
    //             "Bata India Limited",
    //             "Bharat Dynamics Limited",
    //             "LIC Housing Finance Limited",
    //             "Rajesh Exports Limited",
    //             "The Ramco Cements Limited",
    //             "Endurance Technologies Limited",
    //             "Devyani International Limited",
    //             "Punjab & Sind Bank",
    //             "Dixon Technologies (India) Limited",
    //             "Kajaria Ceramics Limited",
    //             "Whirlpool of India Limited",
    //             "Bank of Maharashtra",
    //             "Sun TV Network Limited",
    //             "Piramal Enterprises Limited",
    //             "Prestige Estates Projects Limited",
    //             "The New India Assurance Company Limited",
    //             "Radico Khaitan Limited",
    //             "Pfizer Limited",
    //             "Narayana Hrudayalaya Ltd.",
    //             "Emami Limited",
    //             "Laurus Labs Limited",
    //             "Five-Star Business Finance Limited",
    //             "Ajanta Pharma Limited",
    //             "Indiamart Intermesh Limited",
    //             "360 ONE WAM LIMITED",
    //             "KEI Industries Limited",
    //             "JB Chemicals & Pharmaceuticals Limited",
    //             "Dr. Lal Path Labs Ltd.",
    //             "Jindal Stainless Limited",
    //             "IRB Infrastructure Developers Limited",
    //             "Exide Industries Limited",
    //             "PVR Limited",
    //             "Gujarat State Petronet Limited",
    //             "Blue Dart Express Limited",
    //             "National Aluminium Company Limited",
    //             "Rail Vikas Nigam Limited",
    //             "CREDITACCESS GRAMEEN LIMITED",
    //             "Trident Limited",
    //             "Hitachi Energy India Limited",
    //             "Global Health Limited",
    //             "Gillette India Limited",
    //             "Ratnamani Metals & Tubes Limited",
    //             "Elgi Equipments Limited",
    //             "ICICI Securities Limited",
    //             "Capri Global Capital Limited",
    //             "Godrej Industries Limited",
    //             "Clean Science and Technology Limited",
    //             "Mazagon Dock Shipbuilders Limited",
    //             "Mahindra CIE Automotive Limited",
    //             "Aegis Logistics Limited",
    //             "Fertilizers and Chemicals Travancore Limited",
    //             "Blue Star Limited",
    //             "Sanofi India Limited",
    //             "Fine Organic Industries Limited",
    //             "Affle (India) Limited",
    //             "Glenmark Pharmaceuticals Limited",
    //             "Nippon Life India Asset Management Limited",
    //             "SJVN Limited",
    //             "Redington Limited",
    //             "Aavas Financiers Limited",
    //             "IDFC Limited",
    //             "Finolex Cables Limited",
    //             "Nuvoco Vistas Corporation Limited",
    //             "Bajaj Electricals Limited",
    //             "Aptus Value Housing Finance India Limited",
    //             "Suven Pharmaceuticals Limited",
    //             "Aster DM Healthcare Limited",
    //             "RHI MAGNESITA INDIA LIMITED",
    //             "KEC International Limited",
    //             "Sonata Software Limited",
    //             "Aether Industries Limited",
    //             "DCM Shriram Limited",
    //             "Indian Energy Exchange Limited",
    //             "Happiest Minds Technologies Limited",
    //             "Krishna Institute of Medical Sciences Limited",
    //             "Alkyl Amines Chemicals Limited",
    //             "Cyient Limited",
    //             "Chambal Fertilizers & Chemicals Limited",
    //             "Asahi India Glass Limited",
    //             "Castrol India Limited",
    //             "Brigade Enterprises Limited",
    //             "Kalyan Jewellers India Limited",
    //             "Tata Teleservices (Maharashtra) Limited",
    //             "V-Guard Industries Limited",
    //             "NLC India Limited",
    //             "Lakshmi Machine Works Limited",
    //             "Triveni Turbine Limited",
    //             "Finolex Industries Limited",
    //             "Akzo Nobel India Limited",
    //             "Manappuram Finance Limited",
    //             "EIH Limited",
    //             "Century Plyboards (India) Limited",
    //             "Natco Pharma Limited",
    //             "KIOCL Limited",
    //             "Cholamandalam Financial Holdings Limited",
    //             "Campus Activewear Limited",
    //             "Computer Age Management Services Limited",
    //             "Amara Raja Batteries Limited",
    //             "Zydus Wellness Limited",
    //             "BASF India Limited",
    //             "Tejas Networks Limited",
    //             "Alembic Pharmaceuticals Limited",
    //             "Mahanagar Gas Limited",
    //             "G R Infraprojects Limited",
    //             "Angel One Limited",
    //             "Sheela Foam Limited",
    //             "TTK Prestige Limited",
    //             "Apar Industries Limited",
    //             "Hindustan Copper Limited",
    //             "Central Depository Services (India) Limited",
    //             "Godfrey Phillips India Limited",
    //             "Shree Renuka Sugars Limited",
    //             "City Union Bank Limited",
    //             "JK Lakshmi Cement Limited",
    //             "Anupam Rasayan India Limited",
    //             "Mangalore Refinery and Petrochemicals Limited",
    //             "The Great Eastern Shipping Company Limited",
    //             "Poly Medicure Limited",
    //             "NMDC Steel Limited",
    //             "Bikaji Foods International Limited",
    //             "Motilal Oswal Financial Services Limited",
    //             "Aditya Birla Sun Life AMC Limited",
    //             "CESC Limited",
    //             "Tata Investment Corporation Limited",
    //             "Allcargo Logistics Limited",
    //             "Kalpataru Power Transmission Limited",
    //             "PNB Housing Finance Limited",
    //             "Housing & Urban Development Corporation Limited",
    //             "ITI Limited",
    //             "ROUTE MOBILE LIMITED",
    //             "RITES Limited",
    //             "Vardhman Textiles Limited",
    //             "RBL Bank Limited",
    //             "HFCL Limited",
    //             "Karur Vysya Bank Limited",
    //             "Cera Sanitaryware Limited",
    //             "EID Parry India Limited",
    //             "Ingersoll Rand (India) Limited",
    //             "Galaxy Surfactants Limited",
    //             "Piramal Pharma Limited",
    //             "UTI Asset Management Company Limited",
    //             "KRBL Limited",
    //             "Raymond Limited",
    //             "AstraZeneca Pharma India Limited",
    //             "VIP Industries Limited",
    //             "Archean Chemical Industries Limited",
    //             "Balrampur Chini Mills Limited",
    //             "Suzlon Energy Limited",
    //             "Godrej Agrovet Limited",
    //             "Gujarat Narmada Valley Fertilizers and Chemicals Limited",
    //             "Eris Lifesciences Limited",
    //             "Procter & Gamble Health Limited",
    //             "Medplus Health Services Limited",
    //             "Sapphire Foods India Limited",
    //             "Data Patterns (India) Limited",
    //             "Sundaram Clayton Limited",
    //             "JBM Auto Limited",
    //             "Easy Trip Planners Limited",
    //             "CCL Products (India) Limited",
    //             "Equitas Small Finance Bank Limited",
    //             "Chalet Hotels Limited",
    //             "Rainbow Childrens Medicare Limited",
    //             "PNC Infratech Limited",
    //             "Firstsource Solutions Limited",
    //             "Ksb Limited",
    //             "BIRLASOFT LIMITED",
    //             "KNR Constructions Limited",
    //             "Shoppers Stop Limited",
    //             "Symphony Limited",
    //             "Century Textiles & Industries Limited",
    //             "Can Fin Homes Limited",
    //             "Granules India Limited",
    //             "Tanla Platforms Limited",
    //             "Jyothy Labs Limited",
    //             "Supreme Petrochem Limited",
    //             "Deepak Fertilizers and Petrochemicals Corporation Limited",
    //             "Craftsman Automation Limited",
    //             "Birla Corporation Limited",
    //             "BLS International Services Limited",
    //             "Shyam Metalics and Energy Limited",
    //             "NCC Limited",
    //             "GMM Pfaudler Limited",
    //             "Latent View Analytics Limited",
    //             "Usha Martin Limited",
    //             "Home First Finance Company India Limited",
    //             "JK Paper Limited",
    //             "Tamilnad Mercantile Bank Limited",
    //             "Jindal Worldwide Limited",
    //             "Metropolis Healthcare Limited",
    //             "Saregama India Limited",
    //             "NBCC (India) Limited",
    //             "eClerx Services Limited",
    //             "Balaji Amines Limited",
    //             "Welspun India Limited",
    //             "Praj Industries Limited",
    //             "Cochin Shipyard Limited",
    //             "Zensar Technologies Limited",
    //             "Amber Enterprises India Limited",
    //             "Lemon Tree Hotels Limited",
    //             "Prince Pipes And Fittings Limited",
    //             "Triveni Engineering & Industries Limited",
    //             "Garware Technical Fibres Limited",
    //             "Laxmi Organic Industries Limited",
    //             "Sterlite Technologies Limited",
    //             "CEAT Limited",
    //             "BSE Limited",
    //             "Sun Pharma Advanced Research Company Limited",
    //             "Alok Industries Limited",
    //             "Orient Electric Limited",
    //             "The India Cements Limited",
    //             "Jubilant Ingrevia Limited",
    //             "Kirloskar Oil Engines Limited",
    //             "TCI Express Limited",
    //             "JM Financial Limited",
    //             "Network18 Media & Investments Limited",
    //             "Bombay Burmah Trading Corporation Limited",
    //             "Swan Energy Limited",
    //             "Gujarat Pipavav Port Limited",
    //             "Kaynes Technology India Limited",
    //             "VRL Logistics Limited",
    //             "Intellect Design Arena Limited",
    //             "Sterling and Wilson Renewable Energy Limited",
    //             "Chemplast Sanmar Limited",
    //             "Quess Corp Limited",
    //             "Rolex Rings Limited",
    //             "Mahindra Lifespace Developers Limited",
    //             "Esab India Limited",
    //             "Mahindra Holidays & Resorts India Limited",
    //             "Go Fashion (India) Limited",
    //             "Hinduja Global Solutions Limited",
    //             "BOROSIL RENEWABLES LIMITED",
    //             "Gujarat Ambuja Exports Limited",
    //             "C.E. Info Systems Limited",
    //             "Prism Johnson Limited",
    //             "Keystone Realtors Limited",
    //             "Ircon International Limited",
    //             "Rashtriya Chemicals and Fertilizers Limited",
    //             "Welspun Corp Limited",
    //             "BEML Limited",
    //             "Garden Reach Shipbuilders & Engineers Limited",
    //             "EPL Limited",
    //             "Minda Corporation Limited",
    //             "Graphite India Limited",
    //             "H.G. Infra Engineering Limited",
    //             "Olectra Greentech Limited",
    //             "Reliance Infrastructure Limited",
    //             "Just Dial Limited",
    //             "Rain Industries Limited",
    //             "ION Exchange (India) Limited",
    //             "Edelweiss Financial Services Limited",
    //             "Ujjivan Small Finance Bank Limited",
    //             "TV18 Broadcast Limited",
    //             "Godawari Power And Ispat limited",
    //             "Mtar Technologies Limited",
    //             "Transport Corporation of India Limited",
    //             "RattanIndia Enterprises Limited",
    //             "VST Industries Limited",
    //             "Safari Industries (India) Limited",
    //             "Action Construction Equipment Limited",
    //             "Maharashtra Scooters Limited",
    //             "Delta Corp Limited",
    //             "Glenmark Life Sciences Limited",
    //             "GHCL Limited",
    //             "Indigo Paints Limited",
    //             "Maharashtra Seamless Limited",
    //             "Suprajit Engineering Limited",
    //             "Kfin Technologies Limited",
    //             "Gujarat State Fertilizers & Chemicals Limited",
    //             "The Jammu & Kashmir Bank Limited",
    //             "Religare Enterprises Limited",
    //             "Mastek Limited",
    //             "SIS LIMITED",
    //             "Jindal Saw Limited",
    //             "Tega Industries Limited",
    //             "Syrma SGS Technology Limited",
    //             "Avanti Feeds Limited",
    //             "Star Cement Limited",
    //             "Indiabulls Housing Finance Limited",
    //             "Ramkrishna Forgings Limited",
    //             "Caplin Point Laboratories Limited",
    //             "Vaibhav Global Limited",
    //             "Restaurant Brands Asia Limited",
    //             "Jubilant Pharmova Limited",
    //             "Sharda Cropchem Limited",
    //             "NIIT Limited",
    //             "PCBL LIMITED",
    //             "MAS Financial Services Limited",
    //             "Shipping Corporation Of India Limited",
    //             "PDS Limited",
    //             "Gujarat Alkalies and Chemicals Limited",
    //             "Elecon Engineering Company Limited",
    //             "CMS Info Systems Limited",
    //             "V-Mart Retail Limited",
    //             "ICRA Limited",
    //             "JSW Holdings Limited",
    //             "FDC Limited",
    //             "CSB Bank Limited",
    //             "The Karnataka Bank Limited",
    //             "MMTC Limited",
    //             "Engineers India Limited",
    //             "Sunteck Realty Limited",
    //             "Privi Speciality Chemicals Limited",
    //             "Paradeep Phosphates Limited",
    //             "Sobha Limited",
    //             "Fusion Micro Finance Limited",
    //             "Gujarat Mineral Development Corporation Limited",
    //             "Vijaya Diagnostic Centre Limited",
    //             "Jamna Auto Industries Limited",
    //             "Anant Raj Limited",
    //             "Sansera Engineering Limited",
    //             "Meghmani Finechem Limited",
    //             "Ahluwalia Contracts (India) Limited",
    //             "Bombay Super Hybrid Seeds Limited",
    //             "Tata Coffee Limited",
    //             "Teamlease Services Limited",
    //             "JK Tyre & Industries Limited",
    //             "Varroc Engineering Limited",
    //             "Greenlam Industries Limited",
    //             "Jaiprakash Power Ventures Limited",
    //             "Infibeam Avenues Limited",
    //             "Spandana Sphoorty Financial Limited",
    //             "Himadri Speciality Chemical Limited",
    //             "Bharat Rasayan Limited",
    //             "Rajratan Global Wire Limited",
    //             "La Opala RG Limited",
    //       "Sarda Energy & Minerals Limited",
    //       "Rallis India Limited",
    //       "Borosil Limited",
    //       "Rategain Travel Technologies Limited",
    //       "Schneider Electric Infrastructure Limited",
    //       "Reliance Power Limited",
    //       "Arvind Fashions Limited",
    //       "Tatva Chintan Pharma Chem Limited",
    //       "Power Mech Projects Limited",
    //       "Healthcare Global Enterprises Limited",
    //       "Nesco Limited",
    //       "HeidelbergCement India Limited",
    //       "Techno Electric & Engineering Company Limited",
    //       "Polyplex Corporation Limited",
    //       "Surya Roshni Limited",
    //       "Automotive Axles Limited",
    //       "Jupiter Wagons Limited",
    //       "National Fertilizers Limited",
    //       "HEG Limited",
    //       "Raj Rayon Industries Limited",
    //       "Chennai Petroleum Corporation Limited",
    //       "West Coast Paper Mills Limited",
    //       "Lux Industries Limited",
    //       "Hikal Limited",
    //       "Mishra Dhatu Nigam Limited",
    //       "HLE Glascoat Limited",
    //       "Share India Securities Limited",
    //       "NOCIL Limited",
    //       "Nazara Technologies Limited",
    //       "Bannari Amman Sugars Limited",
    //       "Anand Rathi Wealth Limited",
    //       "Prudent Corporate Advisory Services Limited",
    //       "Gravita India Limited",
    //       "Greenpanel Industries Limited",
    //       "Vesuvius India Limited",
    //       "DCB Bank Limited",
    //       "Rossari Biotech Limited",
    //       "Responsive Industries Limited",
    //       "The Tinplate Company of India Limited",
    //       "Kirloskar Brothers Limited",
    //       "Railtel Corporation Of India Limited",
    //       "Ami Organics Limited",
    //       "Isgec Heavy Engineering Limited",
    //       "Neogen Chemicals Limited",
    //       "Marksans Pharma Limited",
    //       "NAVA LIMITED",
    //       "Newgen Software Technologies Limited",
    //       "Mrs. Bectors Food Specialities Limited",
    //       "Titagarh Wagons Limited",
    //       "Aarti Drugs Limited",
    //       "Ujjivan Financial Services Limited",
    //       "Gateway Distriparks Limited",
    //       "Sula Vineyards Limited",
    //       "LT Foods Limited",
    //       "The South Indian Bank Limited",
    //       "GE T&D India Limited",
    //       "Harsha Engineers International Limited",
    //       "PG Electroplast Limited",
    //       "R Systems International Limited",
    //       "Indoco Remedies Limited",
    //       "Mold-Tek Packaging Limited",
    //       "IFB Industries Limited",
    //       "Shivalik Bimetal Controls Limited",
    //       "Brightcom Group Limited",
    //       "Greaves Cotton Limited",
    //       "MOIL Limited",
    //       "Tata Steel Long Products Limited",
    //       "Tarsons Products Limited",
    //       "Shanthi Gears Limited",
    //       "Choice International Limited",
    //       "Technocraft Industries (India) Limited",
    //       "Dhanuka Agritech Limited",
    //       "Johnson Controls - Hitachi Air Conditioning India Limited",
    //       "Dodla Dairy Limited",
    //       "Dalmia Bharat Sugar and Industries Limited",
    //       "Voltamp Transformers Limited",
    //       "Astec LifeSciences Limited",
    //       "Sudarshan Chemical Industries Limited",
    //       "Kaveri Seed Company Limited",
    //       "Sunflag Iron And Steel Company Limited",
    //       "Indiabulls Real Estate Limited",
    //       "Thomas Cook (India) Limited",
    //       "HBL Power Systems Limited",
    //       "Inox Wind Limited",
    //       "Nilkamal Limited",
    //       "Zen Technologies Limited",
    //       "TCNS Clothing Co. Limited",
    //       "Advanced Enzyme Technologies Limited",
    //       "Strides Pharma Science Limited",
    //       "Fineotex Chemical Limited",
    //       "Kewal Kiran Clothing Limited",
    //       "Hindware Home Innovation Limited",
    //       "Mahindra Logistics Limited",
    //       "Electronics Mart India Limited",
    //       "Jtekt India Limited",
    //       "Man Infraconstruction Limited",
    //       "India Tourism Development Corporation Limited",
    //       "Apcotex Industries Limited",
    //       "Pricol Limited",
    //       "PTC India Limited",
    //       "Aarti Pharmalabs Limited",
    //       "Madhya Bharat Agro Products Limited",
    //       "Sagar Cements Limited",
    //       "TD Power Systems Limited",
    //       "Jai Corp Limited",
    //       "Dilip Buildcon Limited",
    //       "Barbeque Nation Hospitality Limited",
    //       "Uniparts India Limited",
    //       "UFLEX Limited",
    //       "Wonderla Holidays Limited",
    //       "PSP Projects Limited",
    //       "Kirloskar Industries Limited",
    //       "India Pesticides Limited",
    //       "Dish TV India Limited",
    //       "Tata Metaliks Limited",
    //       "Paisalo Digital Limited",
    //       "Prime Focus Limited",
    //       "Hemisphere Properties India Limited",
    //       "LG Balakrishnan & Bros Limited",
    //       "Maithan Alloys Limited",
    //       "Steel Strips Wheels Limited",
    //       "Neuland Laboratories Limited",
    //       "Hathway Cable & Datacom Limited",
    //       "Thyrocare Technologies Limited",
    //       "Orient Cement Limited",
    //       "Dreamfolks Services Limited",
    //       "Ethos Limited",
    //       "Globus Spirits Limited",
    //       "Ganesh Housing Corporation Limited",
    //       "Arvind Limited",
    //       "Indo Count Industries Limited",
    //       "Shriram Pistons & Rings Limited",
    //       "Wockhardt Limited",
    //       "D B Realty Limited",
    //       "ISMT Limited",
    //       "Jindal Poly Films Limited",
    //       "VA Tech Wabag Limited",
    //       "Bajaj Consumer Care Limited",
    //       "Genus Power Infrastructures Limited",
    //       "Butterfly Gandhimathi Appliances Limited",
    //       "Navneet Education Limited",
    //       "Gokaldas Exports Limited",
    //       "Apollo Pipes Limited",
    //       "Landmark Cars Limited",
    //       "IFCI Limited",
    //       "Agro Tech Foods Limited",
    //       "Eveready Industries India Limited",
    //       "AGI Greenpac Limited",
    //       "Tilaknagar Industries Limited",
    //       "Ashoka Buildcon Limited",
    //       "Somany Ceramics Limited",
    //       "Hindustan Construction Company Limited",
    //       "Jain Irrigation Systems Limited",
    //       "Vindhya Telelinks Limited",
    //       "Fiem Industries Limited",
    //       "Tasty Bite Eatables Limited",
    //       "Jayaswal Neco Industries Limited",
    //       "Honda India Power Products Limited",
    //       "Unichem Laboratories Limited",
    //       "Mukand Limited",
    //       "Cigniti Technologies Limited",
    //       "MM Forgings Limited",
    //       "Venky's (India) Limited",
    //       "Ramky Infrastructure Limited",
    //       "Divgi Torqtransfer Systems Limited",
    //       "Camlin Fine Sciences Limited",
    //       "Shilpa Medicare Limited",
    //       "Gulf Oil Lubricants India Limited",
    //       "Meghmani Organics Limited",
    //       "Dollar Industries Limited",
    //       "V.S.T Tillers Tractors Limited",
    //       "Subros Limited",
    //       "Dishman Carbogen Amcis Limited",
    //       "Gabriel India Limited",
    //       "Max Ventures and Industries Limited",
    //       "Siyaram Silk Mills Limited",
    //       "TVS Srichakra Limited",
    //       "Astra Microwave Products Limited",
    //       "J.Kumar Infraprojects Limited",
    //       "Jagran Prakashan Limited",
    //       "Electrosteel Castings Limited",
    //       "CARE Ratings Limited",
    //       "India Glycols Limited",
    //       "Balmer Lawrie & Company Limited",
    //       "Kolte - Patil Developers Limited",
    //       "Imagicaaworld Entertainment Limited",
    //       "Welspun Enterprises Limited",
    //       "TIPS Industries Limited",
    //       "Swaraj Engines Limited",
    //       "Mayur Uniquoters Ltd",
    //       "Ganesha Ecosphere Limited",
    //       "Paras Defence and Space Technologies Limited",
    //       "Lumax Auto Technologies Limited",
    //       "Accelya Solutions India Limited",
    //       "Kesoram Industries Limited",
    //       "Cartrade Tech Limited",
    //       "MPS Limited",
    //       "Sequent Scientific Limited",
    //       "HIL Limited",
    //       "Gufic Biosciences Limited",
    //       "ITD Cementation India Limited",
    //       "Pilani Investment and Industries Corporation Limited",
    //       "Mstc Limited",
    //       "Lloyds Steels Industries Limited",
    //       "Panama Petrochem Limited",
    //       "Optiemus Infracom Limited",
    //       "Sirca Paints India Limited",
    //       "Thirumalai Chemicals Limited",
    //       "Dynamatic Technologies Limited",
    //       "Sundaram Finance Holdings Limited",
    //       "Time Technoplast Limited",
    //       "D.B.Corp Limited",
    //       "Ashiana Housing Limited",
    //       "Confidence Petroleum India Limited",
    //       "Prataap Snacks Limited",
    //       "Nucleus Software Exports Limited",
    //       "Greenply Industries Limited",
    //       "Jaiprakash Associates Limited",
    //       "Wendt (India) Limited",
    //       "Fino Payments Bank Limited",
    //       "Federal-Mogul Goetze (India) Limited.",
    //       "Sanghi Industries Limited",
    //       "Vakrangee Limited",
    //       "GNA Axles Limited",
    //       "Amrutanjan Health Care Limited",
    //       "eMudhra Limited",
    //       "Datamatics Global Services Limited",
    //       "Sharda Motor Industries Limited",
    //       "IOL Chemicals and Pharmaceuticals Limited",
    //       "Lumax Industries Limited",
    //       "Bajaj Hindusthan Sugar Limited",
    //       "Stylam Industries Limited",
    //       "ANDHRA PAPER LIMITED",
    //       "Savita Oil Technologies Limited",
    //       "ADF Foods Limited",
    //       "Vidhi Specialty Food Ingredients Limited",
    //       "Kabra Extrusion Technik Limited",
    //       "Bhansali Engineering Polymers Limited",
    //       "Rupa & Company Limited",
    //       "NACL Industries Limited",
    //       "Vardhman Special Steels Limited",
    //       "Vishnu Chemicals Limited",
    //       "Dwarikesh Sugar Industries Limited",
    //       "Dhani Services Limited",
    //       "Banco Products (I) Limited",
    //       "Kingfa Science & Technology (India) Limited",
    //       "Subex Limited",
    //       "Hindustan Oil Exploration Company Limited",
    //       "RattanIndia Power Limited",
    //       "Vadilal Industries Limited",
    //       "Black Box Limited",
    //       "Orchid Pharma Limited",
    //       "Puravankara Limited",
    //       "COSMO FIRST LIMITED",
    //       "Indian Metals & Ferro Alloys Limited",
    //       "Supriya Lifescience Limited",
    //       "Saksoft Limited",
    //       "IIFL Securities Limited",
    //       "Sanghvi Movers Limited",
    //       "Gokul Agro Resources Limited",
    //       "Alembic Limited",
    //       "Venus Pipes & Tubes Limited",
    //       "Seamec Limited",
    //       "Tamil Nadu Newsprint & Papers Limited",
    //       "KPI Green Energy Limited",
    //       "BF Investment Limited",
    //       "Seshasayee Paper and Boards Limited",
    //       "Dhampur Sugar Mills Limited",
    //       "The Andhra Sugars Limited",
    //       "Kiri Industries Limited",
    //       "TTK Healthcare Limited",
    //       "CARYSIL LIMITED",
    //       "GOCL Corporation Limited",
    //       "JSW Ispat Special Products Limited",
    //       "Sterling Tools Limited",
    //       "Shalby Limited",
    //       "Tide Water Oil Company (India) Limited",
    //       "Krsnaa Diagnostics Limited",
    //       "Krishana Phoschem Limited",
    //       "Huhtamaki India Limited",
    //       "Bharat Bijlee Limited",
    //       "SEPC Limited",
    //       "The Orissa Minerals Development Company Limited",
    //       "Filatex India Limited",
    //       "Thejo Engineering Limited",
    //       "Aptech Limited",
    //       "Oriental Hotels Limited",
    //       "DCX Systems Limited",
    //       "Foseco India Limited",
    //       "Goldiam International Limited",
    //       "Shankara Building Products Limited",
    //       "Insecticides (India) Limited",
    //       "Thangamayil Jewellery Limited",
    //       "S H Kelkar and Company Limited",
    //       "Texmaco Rail & Engineering Limited",
    //       "Cantabil Retail India Limited",
    //       "Gallantt Ispat Limited",
    //       "Heritage Foods Limited",
    //       "KCP Limited",
    //       "Morepen Laboratories Limited",
    //       "GATI Limited",
    //       "Rama Steel Tubes Limited",
    //       "Hester Biosciences Limited",
    //       "NRB Bearing Limited",
    //       "IndoStar Capital Finance Limited",
    //       "Monte Carlo Fashions Limited",
    //       "Kalyani Steels Limited",
    //       "KDDL Limited",
    //       "TCPL Packaging Limited",
    //       "Marathon Nextgen Realty Limited",
    //       "Arvind SmartSpaces Limited",
    //       "DCW Limited",
    //       "Den Networks Limited",
    //       "STEEL EXCHANGE INDIA LIMITED",
    //       "EIH Associated Hotels Limited",
    //       "IG Petrochemicals Limited",
    //       "Nitin Spinners Limited",
    //       "Expleo Solutions Limited",
    //       "Veranda Learning Solutions Limited",
    //       "Salasar Techno Engineering Limited",
    //       "Styrenix Performance Materials Limited",
    //       "Ador Welding Limited",
    //       "Bhagiradha Chemicals & Industries Limited",
    //       "PC Jeweller Limited",
    //       "Genesys International Corporation Limited",
    //       "Stove Kraft Limited",
    //       "Rane Holdings Limited",
    //       "New Delhi Television Limited",
    //       "Xpro India Limited",
    //       "Manorama Industries Limited",
    //       "Garware Hi-Tech Films Limited",
    //       "Hariom Pipe Industries Limited",
    //       "Sandhar Technologies Limited",
    //       "AVT Natural Products Limited",
    //       "Inox Wind Energy Limited",
    //       "S.J.S. Enterprises Limited",
    //       "Everest Industries Limited",
    //       "Fairchem Organics Limited",
    //       "Sasken Technologies Limited",
    //       "Oriental Aromatics Limited",
    //       "NELCO Limited",
    //       "Reliance Industrial Infrastructure Limited",
    //       "Solara Active Pharma Sciences Limited",
    //       "Taj GVK Hotels & Resorts Limited",
    //       "Bombay Dyeing & Mfg Company Limited",
    //       "Mangalore Chemicals & Fertilizers Limited",
    //       "Goodluck India Limited",
    //       "RPG Life Sciences Limited",
    //       "Patel Engineering Limited",
    //       "Southern Petrochemicals Industries Corporation Limited",
    //       "Inox Green Energy Services Limited",
    //       "Gujarat Industries Power Company Limited",
    //       "Universal Cables Limited",
    //       "Nalwa Sons Investments Limited",
    //       "HMT Limited",
    //       "Matrimony.Com Limited",
    //       "Mahanagar Telephone Nigam Limited",
    //       "Som Distilleries & Breweries Limited",
    //       "Valiant Organics Limited",
    //           ];
    //         setDoc(doc(firestore, "Companies","Data"),{"companies":indianCompanies});
    //         console.log("Success")
    //     }catch (e){
    //         console.log(e);
    //     }
    // }

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
        <ScrollView>
            <View>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View>
                        <View style={Styles.contaier}>
                            <Input placeholder="Enter Full Name"
                                style={Styles.input}
                                inputContainerStyle={Styles.inputContainer}
                                label='Full Name'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name="user" type='feather' color='#87888a' />}
                                onChangeText={(text) => setUserName(text)}
                                value={userName}
                                rightIcon={<Icon name={userNameSuccessIcon} type="feather" color={userNameSuccessIconColor} />}
                            />
                            <Input placeholder="Enter Email ID"
                                style={Styles.input}
                                inputContainerStyle={Styles.inputContainer}
                                label='Email'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name="email" color='#87888a' />}
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
                            <Input placeholder="Enter Mobile Number"
                                style={Styles.input}
                                inputContainerStyle={Styles.inputContainer}
                                label='Phone'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name="phone" color='#87888a' />}
                                keyboardType='numeric'
                                onChangeText={(text) => setUserPhone(text)}
                                value={userPhone}
                                rightIcon={<Icon name={userPhoneSuccessIcon} type="feather" color={userPhoneSuccessIconColor} />}
                            />
                            <Input placeholder="Enter Password"
                                style={Styles.input}
                                secureTextEntry={!passwordVisible}
                                inputContainerStyle={Styles.inputContainer}
                                label='Create Password'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name='lock' color='#87888a' />}
                                rightIcon={
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name={userPasswordSuccessIcon} type="feather" color={userPasswordSuccessIconColor} />
                                        <Icon name={passwordEyeIcon} type="feather" color='#737475'
                                            onPress={() => setPasswordVisible(!passwordVisible)} />
                                    </View>}
                                onChangeText={(text) => setUserPassword(text)}
                                value={userPassword}
                            />
                            {passwordHint && <Text style={[Styles.passwordHintText]}>
                                Your password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one symbol.
                            </Text>}
                            <Input placeholder="Confirm Password"
                                style={Styles.input}
                                disabled={!passwordConfirmButtonVisible}
                                secureTextEntry={!passwordConfirmVisible}
                                inputContainerStyle={Styles.inputContainer}
                                label='Confirm Password'
                                labelStyle={Styles.lableStyle}
                                leftIcon={<Icon name='lock' color='#87888a' />}
                                rightIcon={
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name={userPasswordConfirmSuccessIcon} type="feather" color={userPasswordConfirmSuccessIconColor} />
                                        <Icon name={passwordConfirmEyeIcon} type="feather" color='#737475'
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