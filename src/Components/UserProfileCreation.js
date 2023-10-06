import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import Personal_Info from './UserProfileCreationFolder/Personal_Info';
import Address from './UserProfileCreationFolder/Address';
import Curriculum from './UserProfileCreationFolder/Curriculum';
import Company from './UserProfileCreationFolder/Company';
import FinalVerification from './UserProfileCreationFolder/FinalVerification';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';

import { FAB, Icon } from 'react-native-elements';

export default function UserProfileCreation() {

    const auth = getAuth();
    const navigation = useNavigation();

    const childRef = useRef(null);

    const [showPersonalInfoPage, setShowPersonalInfoPage] = useState(false);
    const [showAddressPage, setShowAddressPage] = useState(false);
    const [showCurriculumnPage, setShowCurriculumPage] = useState(true);
    const [showCompanyPage, setShowCompanyPage] = useState(false);
    const [showFinalVerificationPage, setShowFinalVerificationPage] = useState(false);

    const [showFabLeft, setShowFabLeft] = useState(false);
    const [showFabRight, setShowFabRight] = useState(false);

    const [childPersonalInfoData, setChildPersonalInfoData] = useState(null);
    const [childAddressData, setChildAddressData] = useState(null);
    // const [childPersonalInfoData, setChildPersonalInfoData] = useState(null);
    // const [childPersonalInfoData, setChildPersonalInfoData] = useState(null);
    // const [childPersonalInfoData, setChildPersonalInfoData] = useState(null);

    useEffect(() => {
        setShowPersonalInfoPage(false);
        setShowAddressPage(false);
        setShowCurriculumPage(true);
        setShowCompanyPage(false);
        setShowFinalVerificationPage(false);
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         console.log("Already signed In");
        //     } else {
        //         navigation.reset({
        //             index: 0,
        //             routes: [{ name: 'LoginRegister' }],
        //         });
        //         console.log('No user is signed in');
        //     }
        // });
        // return () => unsubscribe();
    }, [])

    const fabLeftButtonFun = () => {
        if (showFinalVerificationPage) {
            setShowFinalVerificationPage(false);
            setShowCompanyPage(true);
            setShowFabRight(false);
        } else if (showCompanyPage) {
            setShowCompanyPage(false);
            setShowCurriculumPage(true);
        } else if (showCurriculumnPage) {
            setShowCurriculumPage(false);
            setShowAddressPage(true);
        } else if (showAddressPage) {
            setShowAddressPage(false);
            setShowPersonalInfoPage(true);
            setShowFabLeft(false);
        }
    }

    const fabRightButtonFun = () => {
        if (showPersonalInfoPage) {
            setShowPersonalInfoPage(false);
            setShowAddressPage(true);
            setShowFabLeft(true);
        } else if (showAddressPage) {
            setShowAddressPage(false);
            setShowCurriculumPage(true);
        } else if (showCurriculumnPage) {
            setShowCurriculumPage(false);
            setShowCompanyPage(true);
        } else if (showCompanyPage) {
            setShowCompanyPage(false);
            setShowFinalVerificationPage(true);
            setShowFabRight(false);
        }
    }

    const updateFabRightButtonVisible = (value) => {
        if (value !== showFabRight) {
            setShowFabRight(value);
        }
    }

    const logOutFun = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            console.log('logout not', error)
        });
    }

    return (
        <Provider>
            <Appbar.Header>
                <Appbar.Content title="" color='white' />
                <View style={{ marginRight: 10, }}>
                    <Icon name='log-out' type='feather' color='black' onPress={logOutFun} />
                </View>
            </Appbar.Header>
            <View style={{ flex: 1, }}>
                {
                    showPersonalInfoPage &&
                    <Personal_Info
                        fabRightButtonFun={fabRightButtonFun}
                        />
                }{
                    showAddressPage && <Address 
                        fabRightButtonFun={fabRightButtonFun}
                        fabLeftButtonFun={fabLeftButtonFun}
                        />
                }{
                    showCurriculumnPage && <Curriculum 
                        fabRightButtonFun={fabRightButtonFun}
                        fabLeftButtonFun={fabLeftButtonFun}
                        />
                }{
                    showCompanyPage && <Company />
                }{
                    showFinalVerificationPage && <FinalVerification />
                }
                {/* <FAB placement='left'
                    buttonStyle={{ backgroundColor: '#211c9e' }}
                    icon={<Icon name='arrow-left' type='feather' color='white' />}
                    visible={showFabLeft}
                    onPress={fabLeftButtonFun}
                />
                <FAB placement='right'
                    buttonStyle={{ backgroundColor: '#211c9e' }}
                    icon={<Icon name='arrow-right' type='feather' color='white' />}
                    visible={showFabRight}
                    onPress={fabRightButtonFun}
                /> */}
            </View>
        </Provider>
    )
}