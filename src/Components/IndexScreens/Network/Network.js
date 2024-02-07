import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Provider } from 'react-native-paper';

import basicStrings from '../../../Strings/basics.json'
import appColors from '../../../Others/appColors.json'

import { Styles } from '../../../Styles/IndexScreens/Network/NetworkCss';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { ConnectionsFun } from '../../../Redux/Slice/ConnectionsSlice';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import VectorIcon  from 'react-native-vector-icons/FontAwesome5';


const Network = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    let userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
    let connectionsDataRedux = useSelector((state) => state.ConnectionsReducer.connections_array);
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

    const [allDirectReferals,setAllDirectReferals]=useState({});
    const [userTreeLevel,setUserTreeLevel]=useState(0);
    const [referalsFinalArray,setReferalsFinalArray]=useState([]);

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

    useEffect(() => {
        if (connectionsDataRedux && userPersonalDataRedux && userPersonalDataRedux.Phone) {
            console.log("hello", connectionsDataRedux)
            setUserDetails((prevState) => ({ ...prevState, "Mobile": userPersonalDataRedux.Phone, "Name": userPersonalDataRedux.FirstName + " " + userPersonalDataRedux.LastName }))
            setUserConnectionList(connectionsDataRedux["6379185147"]);
            getDoc(doc(firestore, "Users", userPersonalDataRedux.Phone, "Connections", "Data"))
                .then((response) => {
                    if (response.data()) {
                        getDoc(doc(firestore, "Users", response.data().parent, "Personal Details", "Data"))
                            .then((result) => {
                                setUserDetails((prevState) => ({ ...prevState, "Promoter": result.data().FirstName + " " + result.data().LastName }))
                                setUserDetails((prevState) => ({ ...prevState, "Promoter Mobile": response.data().parent }))
                                setReferalParentMobile(response.data().parent);
                                setReferalGrandParent(response.data().grandParent);
                                setUserConnectionList(connectionsDataRedux[response.data().grandParent]);
                            }).catch((error) => {
                                console.log("error please", error.message)
                            })
                    } else {
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
    }, [connectionsDataRedux, userPersonalDataRedux])

    useEffect(() => {
        if (userConnectionList && userPersonalDataRedux && connectionsDataRedux) {
            // console.log("wel");
            // console.log("list", JSON.stringify(userConnectionList));
            const level = findKeyLevel(connectionsDataRedux, userPersonalDataRedux.Phone);
            const connection = findKeyValue(connectionsDataRedux, userPersonalDataRedux.Phone);
            // console.log("connection", connection);
            let totalMembers = 0;
            setUserTreeLevel(level);
            setUserDetails((prevState) => ({ ...prevState, "Tree Level": level }));
            if (typeof connection === 'object') {
                const length = Object.keys(connection).length;
                let connectionObject={};
                for(let item in connection){
                    connectionObject={...connectionObject,[item]:item}
                }
                setAllDirectReferals(connectionObject);
                // console.log(connectionObject);
                setUserDetails((prevState) => ({ ...prevState, "Direct Referals": length }));
                totalMembers = countUniqueKeys(connection);
            } else {
                setUserDetails((prevState) => ({ ...prevState, "Direct Referals": 0 }));
            }
            setUserDetails((prevState) => ({ ...prevState, "Members Under You": totalMembers }));

        }
    }, [userConnectionList])

    useEffect(()=>{
        if(allDirectReferals){
            getAllDirectreferalDetails();
        }
    },[allDirectReferals]);

    const getAllDirectreferalDetails=async()=>{
        let array=[];
            for(let phone in allDirectReferals){
                console.log(phone);
                let connection=findKeyValue(connectionsDataRedux,phone);
                let directReferals=0;
                let totalMembers=0;
                let FirstName='N';
                let LastName='N';
                getDoc(doc(firestore, "Users",phone , "Personal Details", "Data"))
                    .then((result) => {
                        console.log("not came yet")
                        if(result.data()){
                            if(typeof connection==='object'){
                                directReferals=Object.keys(connection).length;
                                totalMembers = countUniqueKeys(connection);
                            }
                            const FirstName=result.data().FirstName;
                            const LastName=result.data().LastName;
                            let finalObj={
                                "Mobile":phone,
                                "Name":FirstName+" "+LastName,
                                "DirectReferals":directReferals,
                                "MembersUnder":totalMembers,
                                "TreeLevel": userTreeLevel+1,
                                "Icon":FirstName.charAt(0)+LastName.charAt(0)
                            }
                            array.push(finalObj);  
                            setReferalsFinalArray(array);
                        }else{
                            return null;
                        }  
                    }).catch((error) => {
                        console.log("error please", error.message)
                })
                console.log(JSON.stringify(connection), directReferals, totalMembers);
            }
    }

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


    const openAddConnectionPage = () => {
        navigation.navigate('Invite Add Connection');
    }


    return (
        <Provider>
            <Appbar.Header style={{ backgroundColor: appColors.basicRed }}>
                <Appbar.Content title="Connections" color='white' />
                <View style={{flexDirection:'row', alignItems:'center', marginLeft:5, marginRight:7}}>
                    <VectorIcon name="network-wired" color='white' size={21} style={{marginRight:17}}/>
                    <VectorIcon name='user-plus' size={21} color='white' onPress={() => openAddConnectionPage()} 
                    style={{marginRight:17}}/>
                    <Icon name='help-circle' type='feather' color='white' />
                </View>
            </Appbar.Header>
            <SafeAreaView style={Styles.container}>
            <ScrollView >
                <View style={Styles.userDetailsTopContainer}>
                    <Text style={Styles.userDetailsTitle}>Your Connection Details</Text>
                    {
                        Object.entries(userDetails).map(([keys, values], index) => {
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
                </View>
                <View>

                    {referalsFinalArray &&
                        referalsFinalArray.map((item)=>(
                            <View key={item.Mobile}>
                                <View style={{ marginRight: 30, marginLeft:15 }}>
                            <View style={{ borderLeftWidth: 2, height: 30, marginLeft: 15, borderLeftColor: '#bf0f53' }}>
                            </View>
                            <View style={{
                                flexDirection: 'row', width: '100%', alignItems: 'center',
                                borderLeftWidth: 2, marginLeft: 15, borderLeftColor: '#bf0f53', marginTop: -1}}>
                                <View style={{ position: 'absolute', left: -20, zIndex: 1 }}>
                                    <Text style={{
                                        backgroundColor: '#bf0f53', color: 'white', textAlign: 'center',
                                        textAlignVertical: 'center', fontSize: 17, borderRadius: 20, padding: 7}}>
                                        {item.Icon}
                                    </Text>
                                </View>
                                <View style={{ borderBottomWidth: 2, flex: 0.13, borderBottomColor:'#bf0f53' }}></View>
                                <View style={{
                                    flex: 0.87, backgroundColor: '#800440', padding: 12,
                                    borderRadius: 25, borderBottomLeftRadius: 0, borderTopRightRadius: 3,
                                    borderColor:'white', borderWidth:5,}}>
                                    <View style={{ flexDirection: 'row', marginBottom:5, }}>
                                        <Text style={{ color: 'white', fontSize: 18, fontFamily:'serif' }}>Mobile : </Text>
                                        <Text style={{ color: 'white', fontSize: 19, fontWeight:'bold', fontFamily:'serif' }}>{item.Mobile}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom:5, }}>
                                        <Text style={{ color: 'white', fontSize: 18, fontFamily:'serif' }}>Name : </Text>
                                        <Text style={{ color: 'white', fontSize: 19, fontWeight:'bold', fontFamily:'serif' }}>{item.Name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom:5, }}>
                                        <Text style={{ color: 'white', fontSize: 18, fontFamily:'serif' }}>Direct Referals : </Text>
                                        <Text style={{ color: 'white', fontSize: 19, fontWeight:'bold', fontFamily:'serif' }}>{item.DirectReferals}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom:5, }}>
                                        <Text style={{ color: 'white', fontSize: 18, fontFamily:'serif' }}>Members Under : {item.MembersUnder}</Text>
                                        <Text style={{ color: 'white', fontSize: 19, fontWeight:'bold', fontFamily:'serif' }}></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', fontSize: 18, fontFamily:'serif' }}>Tree Level : </Text>
                                        <Text style={{ color: 'white', fontSize: 19, fontWeight:'bold', fontFamily:'serif' }}>{userTreeLevel+1}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            </SafeAreaView>
        </Provider>
    )
}

export default Network;