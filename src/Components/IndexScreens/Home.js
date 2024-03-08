import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import { Badge, Button, Icon, LinearProgress } from 'react-native-elements';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, setDoc, doc, getDoc, query, getDocs, CollectionReference, writeBatch } from 'firebase/firestore'
import { firestore } from "../../config/firebase";
import { useNavigation } from '@react-navigation/native';

import { PersonalDetailsFun } from '../../Redux/Slice/UserProfileSlice';
import { Styles } from '../../Styles/IndexScreens/HomeCss';
import basicStrings from '../../Strings/basics.json'
import appColors from '../../Others/appColors.json'
import { ConnectionsFun } from '../../Redux/Slice/ConnectionsSlice';
import { getAllKeysFromObject } from '../../Others/Basics';

export default function Home() {

    const auth = getAuth();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
    const [visibleMainComponent, setVisibleMainComponent] = useState(true);

    const [currentUserID, setCurrentUserID] = useState('');

    const [isUserHavingProfile, setIsUserHavingProfile]=useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Home: Already signed In");
                setCurrentUserID(user.uid);
            } else {
                console.log('No user is signed in');
            }
        });
        return () => unsubscribe();
    }, [])

    // useEffect(() => {
    //     if (currentUserID) {
    //         if(!companyDataRedux){
    //             getAllCompaniesFromFirestore();
    //             console.log("not exist");
    //         }else{
    //             checkIsUserIsCreatedProfile();
    //             console.log("exist");
    //         }
    //         if(!isUserHavingProfile){
    //             checkIsUserIsCreatedProfile();
    //         }
    //     }
    // }, [currentUserID]);

    const checkIsUserIsCreatedProfile = async () => {
        const docRef = doc(firestore, "Users", currentUserID, "Personal Details", "Data");
        const docSnap = await getDoc(docRef);
        dispatch(PersonalDetailsFun(docSnap.data()));
        if (docSnap.data().Profile) {
            setIsUserHavingProfile(true);
            console.log("User Account having Profile");
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'UserProfileCreation' }],
            });
            console.log("User Don't have Profile!");
        }
    }

    const logOutFun = () => {
        dispatch(PersonalDetailsFun(null));
        dispatch(ConnectionsFun(null));
        navigation.reset({
            index: 0,
            routes: [{ name: 'LogIn' }],
        });
    }

    const navigateSomewhere =()=>{
        navigation.navigate("Invite");
    }

    const doWorkFireBaseFun=async()=>{
        const querySnapshot = await getDoc(doc(firestore, "Connections", "Data"));
        const keys= getAllKeysFromObject(querySnapshot.data());
        const batch = writeBatch(firestore);
        for( let phone of keys){
            console.log(phone);
            const userDocRef = doc(firestore, "Users", phone, "Personal Details", "Data");
            const obj={
                "DOB": "2/2/2000",
                "Joined": new Date().toLocaleDateString(),
                "Bio":""
            }
            batch.update(userDocRef, obj);
        }
        batch.commit()
        .then(()=>{
            console.log("success")
        })
        .catch((error)=>{
            console.error(error.message)
        })
    }

    


    return (
        <Provider>
            <Appbar.Header style={{backgroundColor:appColors.basicRed}}>
                <Appbar.Content title={basicStrings.appName} color='white' />
                <View style={Styles.headerNotificationContainer}>
                    <Icon name='bell' type='feather' color='white' onPress={() => console.log("hello")} />
                    <Badge
                        status="error"
                        value='99+'
                        containerStyle={Styles.badgeForHeader}
                        textStyle={Styles.badgeTextStyle}
                    />
                </View>
                <View style={Styles.headerNotificationContainer}>
                    <Icon name='message-circle' type='feather' color='white' />
                    <Badge
                        status="error"
                        value='9+'
                        containerStyle={Styles.badgeForHeader}
                        textStyle={Styles.badgeTextStyle} />
                </View>
                <View style={{padding:5}}>
                    <Icon name='save' color='white' 
                    // onPress={doWorkFireBaseFun}
                    />
                </View>
                <View style={Styles.headerNotificationContainer}>
                    <Icon name='log-out' type='feather' color='white' onPress={logOutFun} />
                </View>

            </Appbar.Header>

            {
                !visibleMainComponent &&
                <LinearProgress color='primary' />
            }
            {visibleMainComponent &&
                <View style={{ backgroundColor: '#000000', flex: 1 }}>
                    <Text style={{ color: 'white' }}>Home</Text>
                    <Button title="Check"
                        onPress={navigateSomewhere}
                        />
                </View>
            }
        </Provider>
    )
}