import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'

import { FAB, Icon, Input, LinearProgress } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { firestore } from "../../config/firebase";


import { PersonalDetailsFun } from '../../Redux/Slice/UserProfileSlice';
import { Styles } from '../../Styles/UserProfileCreationFolder/Personal_InfoCss'

const Personal_Info = forwardRef((props, ref) => {

    const auth = getAuth();
    const dispatch = useDispatch(); 
    const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
    const [visibleMainComponent, setVisibleMainComponent] = useState(false);

    const [showFabRight, setShowFabRight] = useState(false);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userDOB, setUserDOB] = useState('');

    const [userDOBSuccessIcon, setUserDOBSuccessIcon] = useState('');
    const [userDOBSuccessIconColor, setUserDOBSuccessIconColor] = useState('');
    const [isGenderError, setIsGenderError] = useState(true);
    const [userGenderErrorMsg, setUserGenderErrorMsg] = useState('*Date of Birth Required');

    const dobRegx = /^\d{2}\/\d{2}\/\d{4}$/;

    useEffect(() => {
        getUserPersonalData();
        return () => {

        }
    }, []);

    useEffect(() => {
        setShowFabRight(false);
        if (dobRegx.test(userDOB)) {
            const parts = userDOB.split("/");
            if (parts.length !== 3) {
                return false;
            }
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                return false;
            }
            const inputDate = new Date(year, month - 1, day); // Month is zero-based
            const today = new Date();
            if (inputDate < today) {
                setUserDOBSuccessIcon('check');
                setUserDOBSuccessIconColor('#238732');
                setIsGenderError(false);
                setUserGenderErrorMsg('');
                setShowFabRight(true);
            } else {
                setUserDOBSuccessIcon('x');
                setUserDOBSuccessIconColor('#8c0a1b');
                setIsGenderError(true);
                setUserGenderErrorMsg('The date you\'ve provided is not in a valid format. Please provide a valid date.');
            }
        } else if (userDOB.length > 0) {
            setUserDOBSuccessIcon('x');
            setUserDOBSuccessIconColor('#8c0a1b');
            setIsGenderError(true);
            setUserGenderErrorMsg('Date of Birth (DD/MM/YYYY) Ex:23/09/2021');
        } else {
            setUserDOBSuccessIcon('');
            setUserDOBSuccessIconColor('');
            setIsGenderError(true);
            setUserGenderErrorMsg('*Date of Birth Required');
        }
    }, [userDOB]);

    const getUserPersonalData = async () => {
        try {
            setUserName(userPersonalDataRedux.Name);
            setUserEmail(userPersonalDataRedux.Mail);
            setUserPhone(userPersonalDataRedux.Phone);
            setUserGender(userPersonalDataRedux.Gender);
            if (userPersonalDataRedux.DOB) {
                setUserDOB(userPersonalDataRedux.DOB);
            }
            setVisibleMainComponent(true);
        } catch (error) {
            console.log(error)
        }

    }

    const fabRightButtonFun = () => {
        const payload = {
            Name: userName,
            Mail: userEmail,
            Gender: userGender,
            Phone: userPhone,
            DOB: userDOB
        }
        dispatch(PersonalDetailsFun(payload));
        props.fabRightButtonFun();
    }

    const handleInputChange = (text) => {
        // Check if the last character entered is a backspace
        if (text.length < userDOB.length) {
            setUserDOB(formatDate(text));
        } else {
            setUserDOB(formatDate(text));
        }
      };

    const formatDate = (input) => {
        const formattedDate = input.replace(/\D/g, '');
        if (formattedDate.length >= 2) {
          return `${formattedDate.slice(0, 2)}/${formattedDate.slice(2, 4)}/${formattedDate.slice(4, 8)}`;
        }
        return formattedDate;
    };


    return (
        <View style={{ flex: 1 }}>
            <ScrollView >
                {
                    !visibleMainComponent &&
                    <LinearProgress color='primary' />
                }
                {visibleMainComponent &&
                    <View>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={Styles.contaier}>
                                <Text style={Styles.pageTitle}>Personal Information</Text>
                                <Input
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Full Name'
                                    labelStyle={Styles.lableStyle}
                                    leftIcon={<Icon name="user" type='feather' color='#87888a' />}
                                    value={userName}
                                    disabled={true}
                                    rightIcon={<Icon name='check' type="feather" color='#238732' />}
                                />
                                <Input
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Email'
                                    labelStyle={Styles.lableStyle}
                                    leftIcon={<Icon name="email" color='#87888a' />}
                                    value={userEmail}
                                    disabled={true}
                                    rightIcon={<Icon name='check' type="feather" color='#238732' />}
                                />
                                <Input
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Gender'
                                    labelStyle={Styles.lableStyle}
                                    leftIcon={<Icon name="users" type='feather' color='#87888a' />}
                                    value={userGender}
                                    disabled={true}
                                    rightIcon={<Icon name='check' type="feather" color='#238732' />}
                                />

                                <Input
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Phone'
                                    labelStyle={Styles.lableStyle}
                                    leftIcon={<Icon name="phone" color='#87888a' />}
                                    value={userPhone}
                                    disabled={true}
                                    rightIcon={<Icon name='check' type="feather" color='#238732' />}
                                />


                                <Input placeholder="DD/MM/YYYY"
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label='Date of Birth'
                                    labelStyle={Styles.lableStyle}
                                    leftIcon={<Icon name="calendar" type='feather' color='#87888a' />}
                                    onChangeText={(text) => setUserDOB(handleInputChange(text))}
                                    value={userDOB}
                                    rightIcon={<Icon name={userDOBSuccessIcon} type="feather" color={userDOBSuccessIconColor} />}
                                />

                                {
                                    isGenderError && <Text style={Styles.genderErrorMsg}>{userGenderErrorMsg}</Text>
                                }

                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                }
            </ScrollView>
            <FAB placement='right'
                buttonStyle={{ backgroundColor: '#211c9e' }}
                icon={<Icon name='arrow-right' type='feather' color='white' />}
                visible={showFabRight}
                onPress={fabRightButtonFun}
            />
        </View>
    )
});

export default Personal_Info;