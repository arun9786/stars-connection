import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Provider } from 'react-native-paper';

import basicStrings from '../../../Strings/basics.json'
import appColors from '../../../Others/appColors.json'

import { Styles } from '../../../Styles/IndexScreens/Network/Network';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { ConnectionsFun } from '../../../Redux/Slice/ConnectionsSlice';
import { useNavigation } from '@react-navigation/native';


const Network = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
    const connectionsDataRedux = useSelector((state) => state.ConnectionsReducer.connections_array);
    let userDetailsArr = {
        "Mobile": "NA",
        "Name": "NA",
        "Direct Referals": 0,
        "Members Under You": 0,
        "Tree Level": 0,
        "Promoter": "NA",
        "Promoter Mobile": "NA"
    }

    const [userDetails, setUserDetails] = useState({});
    const [userConnectionList, setUserConnectionList] = useState();

    const [referalParentMobile, setReferalParentMobile] = useState('NA');
    const [referalGrandParent, setReferalGrandParent] = useState('NA');

    useEffect(() => {
        setUserDetails(userDetailsArr);
    }, []);

    if (!connectionsDataRedux) {
        getDoc(doc(firestore, "Connections", "Data"))
            .then((response) => {
                dispatch(ConnectionsFun(response.data()))
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    useEffect(()=>{
        if(connectionsDataRedux && userPersonalDataRedux && userPersonalDataRedux.Phone){
            setUserDetails((prevState) => ({ ...prevState, "Mobile": userPersonalDataRedux.Phone, "Name": userPersonalDataRedux.FirstName + " " + userPersonalDataRedux.LastName }))
            getDoc(doc(firestore, "Users", userPersonalDataRedux.Phone,"Connections","Data"))
                .then((response) => {
                    if(response.data()){
                        getDoc(doc(firestore, "Users", response.data().parent,"Personal Details","Data"))
                        .then((result) => {
                            setUserDetails((prevState) => ({ ...prevState, "Promoter": result.data().FirstName +" "+ result.data().LastName}))
                            setUserDetails((prevState) => ({ ...prevState, "Promoter Mobile": response.data().parent }))
                            setReferalParentMobile(response.data().parent);
                            setReferalGrandParent(response.data().grandParent);
                            setUserConnectionList(connectionsDataRedux[response.data().grandParent]);
                        }).catch(()=>{
                            console.log("error please",error.message)
                        })
                    }else{
                        console.log("logged", connectionsDataRedux[userPersonalDataRedux.Phone])
                        setReferalParentMobile("NA")
                        setReferalGrandParent("NA");
                        setUserConnectionList(connectionsDataRedux[userPersonalDataRedux.Phone]);
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }
    },[connectionsDataRedux,userPersonalDataRedux])

    useEffect(()=>{
        if(userConnectionList && userPersonalDataRedux && connectionsDataRedux){
            console.log("list", JSON.stringify(userConnectionList));
            const level=findKeyLevel( connectionsDataRedux, userPersonalDataRedux.Phone);
            const connection=findKeyValue( connectionsDataRedux, userPersonalDataRedux.Phone);
            console.log("connection",connection);
            let totalMembers=0;
            setUserDetails((prevState) => ({ ...prevState, "Tree Level": level }));
            if(typeof connection==='object'){
                const length=Object.keys(connection).length;
                setUserDetails((prevState) => ({ ...prevState, "Direct Referals": length }));
                totalMembers=countUniqueKeys(connection);
            }else{
                setUserDetails((prevState) => ({ ...prevState, "Direct Referals": 0 }));
            }
            setUserDetails((prevState) => ({ ...prevState, "Members Under You": totalMembers }));
        }
    },[userConnectionList])

    function findKeyLevel(obj, targetKey, currentLevel = 1) {
        for (const key in obj) {
          if (key === targetKey) {
            return currentLevel;
          } else if (typeof obj[key] === 'object') {
            const level = findKeyLevel(obj[key], targetKey, currentLevel + 1);
            if (level !== undefined) {
              return level;
            }
          }
        }
        return undefined;
    }

    function findKeyValue(obj, targetKey) {
        for (const key in obj) {
          if (key === targetKey) {
            return obj[key];
          } else if (typeof obj[key] === 'object') {
            const result = findKeyValue(obj[key], targetKey);
            if (result !== undefined) {
              return result;
            }
          }
        }
        return undefined;
    }

    function countUniqueKeys(obj, uniqueKeys = new Set()) {
        for (const key in obj) {
          uniqueKeys.add(key);
          if (typeof obj[key] === 'object') {
            countUniqueKeys(obj[key], uniqueKeys);
          }
        }
      
        return uniqueKeys.size;
      }


    const openAddConnectionPage=()=>{
        navigation.navigate('Invite Add Connection');
    }


    return (
        <Provider>
            <Appbar.Header style={{ backgroundColor: appColors.basicRed }}>
                <Appbar.Content title="Network & Connections" color='white' />
                <View>
                    <Icon name='help-circle' type='feather' color='white' />
                </View>
            </Appbar.Header>
            <View style={Styles.container}>
                <View style={Styles.userDetailsTopContainer}>
                    <Text style={Styles.userDetailsTitle}>Your Details</Text>
                    {
                        Object.entries(userDetails).map(([keys, values], index) => {
                            console.log
                            return (
                                <View style={Styles.everyUserDetailContainer} key={index}>
                                    <View style={Styles.userDetailsInnerContainer}>
                                        <Text style={Styles.userDetailsText}>{keys}</Text>
                                    </View>
                                    <View style={Styles.userDetailsInnerContainer}>
                                        <View style={Styles.userDetailsRightContainer}>
                                            <Text style={Styles.userDetailsText}>:</Text>
                                            <Text style={{ ...Styles.userDetailsText, ...Styles.userRightDetailText }}>{values}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                    <View style={Styles.addUserContainer}>
                        <View
                            style={{ position: 'absolute', bottom: -45 }}
                        >
                            <Icon name='plus' type='feather' color='white' size={40} iconStyle={{
                                backgroundColor: appColors.basicRed, borderRadius: 20,
                            }} onPress={()=>openAddConnectionPage()}/>
                        </View>

                    </View>
                </View>



                <View style={Styles.allReferalContainer}>
                    <Text>With</Text>
                </View>
            </View>
        </Provider>

    )
}

export default Network;