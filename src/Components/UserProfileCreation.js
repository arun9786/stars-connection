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

    const [showPersonalInfoPage, setShowPersonalInfoPage] = useState(true);
    const [showAddressPage, setShowAddressPage] = useState(false);
    const [showCurriculumnPage, setShowCurriculumPage] = useState(false);
    const [showCompanyPage, setShowCompanyPage] = useState(false);
    const [showFinalVerificationPage, setShowFinalVerificationPage] = useState(false);

    useEffect(() => {
        setShowPersonalInfoPage(true);
        setShowAddressPage(false);
        setShowCurriculumPage(false);
        setShowCompanyPage(false);
        setShowFinalVerificationPage(false);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Login:Already signed In");
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LogIn' }],
                });
                console.log('No user is signed in');
            }
        });
        return () => unsubscribe();
    }, [])

    const fabLeftButtonFun = () => {
        if (showFinalVerificationPage) {
            setShowFinalVerificationPage(false);
            setShowCompanyPage(true);
        } else if (showCompanyPage) {
            setShowCompanyPage(false);
            setShowCurriculumPage(true);
        } else if (showCurriculumnPage) {
            setShowCurriculumPage(false);
            setShowAddressPage(true);
        } else if (showAddressPage) {
            setShowAddressPage(false);
            setShowPersonalInfoPage(true);
        }
    }

    const fabRightButtonFun = () => {
        if (showPersonalInfoPage) {
            setShowPersonalInfoPage(false);
            setShowAddressPage(true);
        } else if (showAddressPage) {
            setShowAddressPage(false);
            setShowCurriculumPage(true);
        } else if (showCurriculumnPage) {
            setShowCurriculumPage(false);
            setShowCompanyPage(true);
        } else if (showCompanyPage) {
            setShowCompanyPage(false);
            setShowFinalVerificationPage(true);
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
                <Appbar.Content title="hello" color='red' />
                <View style={{ marginRight: 10, }}>
                    <Icon name='log-out' type='feather' color='black' onPress={logOutFun} />
                </View>
            </Appbar.Header>
            <View style={{ flex: 1 }}>
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
                    showCompanyPage && <Company 
                        fabRightButtonFun={fabRightButtonFun}
                        fabLeftButtonFun={fabLeftButtonFun}
                        />
                }{
                    showFinalVerificationPage && <FinalVerification 
                        fabRightButtonFun={fabRightButtonFun}
                        fabLeftButtonFun={fabLeftButtonFun}
                        />
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