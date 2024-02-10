import { View, Text, FlatList, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Appbar, ProgressBar, Provider } from 'react-native-paper';

import basicStrings from '../../../Strings/basics.json'
import appColors from '../../../Others/appColors.json'

import { Styles } from '../../../Styles/IndexScreens/Network/NetworkCss';
import { Icon, LinearProgress } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { ConnectionsFun } from '../../../Redux/Slice/ConnectionsSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import VectorIcon from 'react-native-vector-icons/FontAwesome5';
import CustomToast from "../../Features/CustomToast";
import CustomLoaderWithoutMsg from '../../Features/OverlayLoaderWIthoutMsg';
import CustomProgressBar from '../../Features/CustomProgressBar';

const Network = (props) => {

    const navigation = useNavigation();
    // const route=useRoute();
    // console.log(route);
    const dispatch = useDispatch();
    const { width: screenWidth } = Dimensions.get('window');

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

    const [visibleMainComponent, setVisibleMainComponent] = useState(false);

    const [userDetails, setUserDetails] = useState({});
    const [userConnectionList, setUserConnectionList] = useState();
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    const [referalParentMobile, setReferalParentMobile] = useState('NA');
    const [referalGrandParent, setReferalGrandParent] = useState('NA');

    const [allDirectReferals, setAllDirectReferals] = useState({});
    const [userTreeLevel, setUserTreeLevel] = useState(0);
    const [referalsFinalArray, setReferalsFinalArray] = useState([]);

    const [showOvelayLoader, setShowOvelayLoader] = useState(false);
    const [ovelayLoaderContent, setOvelayLoaderContent] = useState('');

    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState(false);


    useEffect(() => {
        setUserDetails(userDetailsArr);
    }, []);

    useEffect(()=>{
        console.log("coming...")
        setVisibleMainComponent(false);
        getDoc(doc(firestore, "Connections", "Data"))
            .then((response) => {
                dispatch(ConnectionsFun(response.data()))
            })
            .catch((error) => {
                console.log(error.message)
            })
    },[props]);

    useEffect(() => {
        if (connectionsDataRedux && userPersonalDataRedux && userPersonalDataRedux.Phone) {
            // console.log("hello", connectionsDataRedux)
            setUserPhoneNumber(userPersonalDataRedux.Phone);
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
                                setVisibleMainComponent(true);
                            }).catch((error) => {
                                console.log("error please", error.message)
                            })
                    } else {
                        setVisibleMainComponent(true);
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
            const connection = getChildrensObject(connectionsDataRedux, userPersonalDataRedux.Phone);
            // console.log("connection", connection);
            let totalMembers = 0;
            setUserTreeLevel(level);
            setUserDetails((prevState) => ({ ...prevState, "Tree Level": level }));
            if (typeof connection === 'object') {
                const length = Object.keys(connection).length;
                let connectionObject = {};
                for (let item in connection) {
                    connectionObject = { ...connectionObject, [item]: item }
                }
                setAllDirectReferals(connectionObject);
                // console.log(connectionObject);
                setUserDetails((prevState) => ({ ...prevState, "Direct Referals": length }));
                totalMembers = countAllChildrens(connection);
            } else {
                setUserDetails((prevState) => ({ ...prevState, "Direct Referals": 0 }));
            }
            setUserDetails((prevState) => ({ ...prevState, "Members Under You": totalMembers }));

        }
    }, [userConnectionList])

    useEffect(() => {
        if (allDirectReferals) {
            getAllDirectreferalDetails();
        }
    }, [allDirectReferals]);

    const getAllDirectreferalDetails = async () => {
        let array = [];
        for (let phone in allDirectReferals) {
            // console.log(phone);
            let connection = getChildrensObject(connectionsDataRedux, phone);
            let directReferals = 0;
            let totalMembers = 0;
            let FirstName = 'N';
            let LastName = 'N';
            getDoc(doc(firestore, "Users", phone, "Personal Details", "Data"))
                .then((result) => {
                    if (result.data()) {
                        if (typeof connection === 'object') {
                            directReferals = Object.keys(connection).length;
                            totalMembers = countAllChildrens(connection);
                        }
                        const FirstName = result.data().FirstName;
                        const LastName = result.data().LastName;
                        let finalObj = {
                            "Mobile": phone,
                            "Name": FirstName + " " + LastName,
                            "DirectReferals": directReferals,
                            "MembersUnder": totalMembers,
                            "TreeLevel": userTreeLevel + 1,
                            "Icon": FirstName.charAt(0) + LastName.charAt(0)
                        }
                        array.push(finalObj);
                        // console.log(array.length);
                        if (array.length === Object.keys(allDirectReferals).length) {
                            setReferalsFinalArray(array);
                        }
                        // console.log("array", array);
                    } else {
                        return null;
                    }
                }).catch((error) => {
                    console.log("error please", error.message)
                })
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

    function getChildrensObject(obj, targetKey) {
        for (const key in obj) {
            if (key === targetKey) {
                return obj[key];
            } else if (typeof obj[key] === 'object') {
                const result = getChildrensObject(obj[key], targetKey);
                if (result !== undefined) {
                    return result;
                }
            }
        }
        return undefined;
    }

    function countAllChildrens(obj, uniqueKeys = new Set()) {
        for (const key in obj) {
            uniqueKeys.add(key);
            if (typeof obj[key] === 'object') {
                countAllChildrens(obj[key], uniqueKeys);
            }
        }

        return uniqueKeys.size;
    }


    const openAddConnectionPage = () => {
        navigation.navigate('Invite Add Connection');
    }
    const openConnectionTreePage = (phone) => {
        const userMainPhoneNumber=userPhoneNumber;
        let phoneNumber=userMainPhoneNumber;
        if(phone){
            phoneNumber=phone;
        }
        // console.log(phoneNumber);
        let parentMobile = null;
        if (referalGrandParent !== 'NA') {
            parentMobile = referalGrandParent;
        } else  if(referalParentMobile !=='NA'){
            parentMobile = referalParentMobile;
        } else{
            parentMobile = userPersonalDataRedux.Phone;
        }
        const data = { [parentMobile]: userConnectionList };
        navigation.navigate('Network Network Tree', { data, userPhoneNumber:phoneNumber });
    }


    return (
        <Provider>
            <Appbar.Header style={{ backgroundColor: appColors.basicRed }}>
                <Appbar.Content title="Connections" color='white' />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 7 }}>
                    <VectorIcon name="network-wired" color='white' size={21} style={{ marginRight: 17 }} onPress={() => openConnectionTreePage()} />
                    <VectorIcon name='user-plus' size={21} color='white' onPress={() => openAddConnectionPage()}
                        style={{ marginRight: 17 }} />
                    <Icon name='help-circle' type='feather' color='white' />
                </View>
            </Appbar.Header>
            {!visibleMainComponent &&
                <CustomProgressBar/>
            }
            {visibleMainComponent &&
                <SafeAreaView style={Styles.container}>
                    {showOvelayLoader && <OverlayLoader content={ovelayLoaderContent} />}
                    {isToastVisible && <CustomToast content={toastContent} handleToastVisible={() => setIsToastVisible(false)} />}
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                                referalsFinalArray.map((item) => (
                                    <View key={item.Mobile} >
                                        <View style={Styles.referalsContainer}>
                                            <View style={Styles.referalsEveryTopLeftLine}>
                                            </View>
                                            <View style={Styles.referalsInnerContainer}>
                                                <View style={Styles.referalsIconContainer}>
                                                    <Text style={Styles.referalsIconText}>
                                                        {item.Icon}
                                                    </Text>
                                                </View>
                                                <View style={Styles.referalsInnerLeftLine}>
                                                </View>
                                                <View style={Styles.referalsMainOuterContainer}>
                                                    <View style={Styles.referalsMainContainer}>
                                                        <View style={Styles.referalsMainLeftContainer}>
                                                            <Text style={Styles.referalContentTitleText}>Mobile : </Text>
                                                            <Text style={Styles.referalContentValueText}>{item.Mobile}</Text>
                                                        </View>
                                                        <View style={Styles.referalsMainRightContainer}>
                                                            <Text style={Styles.referalContentTitleText}>Name : </Text>
                                                            <Text style={Styles.referalContentValueText} numberOfLines={1} ellipsizeMode='tail'>
                                                                {item.Name}
                                                            </Text>
                                                        </View>
                                                        <View style={Styles.referalsMainLeftContainer}>
                                                            <Text style={Styles.referalContentTitleText}>Direct Referals : </Text>
                                                            <Text style={Styles.referalContentValueText}>{item.DirectReferals}</Text>
                                                        </View>
                                                        <View style={Styles.referalsMainLeftContainer}>
                                                            <Text style={Styles.referalContentValueText}>Members Under : {item.MembersUnder}</Text>
                                                            <Text style={Styles.referalContentValueText}></Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={Styles.referalContentTitleText}>Tree Level : </Text>
                                                            <Text style={Styles.referalContentValueText}>{userTreeLevel + 1}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={Styles.referalsArrowIconContainer}>
                                                        <Icon name='arrow-right' type='feather' 
                                                        color={appColors.basicRed}
                                                        iconStyle={Styles.referalsArrowIcon}
                                                        onPress={()=>openConnectionTreePage(item.Mobile)}/>
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
            }
        </Provider>
    )
}

export default Network;