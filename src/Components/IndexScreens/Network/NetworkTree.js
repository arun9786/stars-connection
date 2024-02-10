// BinaryTree.js
import { doc, getDoc } from 'firebase/firestore';
import React, { forwardRef, useEffect, useState } from 'react';
import { View, Text, UIManager, findNodeHandle, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { firestore } from '../../../config/firebase';
import OverlayLoader from '../../Features/OverlayLoader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getColorCodeDark } from '../../../Others/Basics';
import appColors from '../../../Others/appColors.json'
import CustomToast from "../../Features/CustomToast";


const ConnectionTree = () => {

    const route = useRoute();
    const navigation= useNavigation();
    const { data, userPhoneNumber } = route.params;
    const { width: screenWidth } = Dimensions.get('window');
    // const data={
    //     "6379185147": {
    //         "6379185152":"6379185152",
    //         "9678906549": {
    //           "9786345609": {
    //             "8765478902": {
    //               "9876547810": {
    //                 "7890654789":{
    //                   "9867845600":"9867845600"
    //                 }
    //               }
    //             },
    //             "8765478903": "8765478903"
    //           },
    //           "9786345630": "9786345630"
    //         },
    //         "9159934457":{
    //           "9865789045":"9865789045"
    //         }
    //       },
    // }
    // console.log(data)
    console.log("userPhone", userPhoneNumber);

    const [userPhone, setUserPhone] = useState(userPhoneNumber);
    const [allParents, setAllParents] = useState([]);
    const [allChildrens, setAllChildrens] = useState([]);
    const [allConnection, setAllConnection] = useState([]);
    const [allConnectionDetails, setAllConnectionDetails] = useState({});

    const [showOvelayLoader, setShowOvelayLoader] = useState(false);
    const [ovelayLoaderContent, setOvelayLoaderContent] = useState('');

    const [isToastVisible,setIsToastVisible]=useState(false);
    const [toastContent,setToastContent]=useState(false);


    useEffect(() => {
        setShowOvelayLoader(true);
        setOvelayLoaderContent("Fetching your Connection Details...")
        const parent = findParents(data, userPhone);
        const connection = getChildrensObject(data, userPhone);
        const allConnection = getAllKeys(data);
        let children = [];
        console.log("connection", connection)
        console.log("type", typeof connection)
        if (typeof connection === 'object') {
            console.log("coming")
            for (let child in connection) {
                children.push(child)
            }
        }
        console.log("parent", parent);
        console.log("children", children);
        console.log("allConnection", allConnection)
        if(parent){
            setAllParents(parent);
        }
        console.log(allConnection.length, allConnection[0])
        if(!allConnection || (allConnection.length===1 && allConnection[0]==="undefined")){
            setShowOvelayLoader(false);
            Toast("Something went wrong. Please try again.",true,4000);
            const timer = setTimeout(() => {
               navigation.goBack()
           }, 2000);
          return () => clearTimeout(timer);
            
        }
        setAllChildrens(children);
        setAllConnection(allConnection);
    }, []);

    useEffect(() => {
        if (allConnection) {
            let obj = {};
            for (let phone of allConnection) {
                getDoc(doc(firestore, "Users", phone, "Personal Details", "Data"))
                    .then((result) => {
                        if (result.data()) {
                            const FirstName = result.data().FirstName;
                            const LastName = result.data().LastName;
                            const Icon = FirstName.charAt(0) + LastName.charAt(0);
                            obj[phone] = { "Name": FirstName + " " + LastName, "Icon": Icon }
                            if (Object.keys(obj).length === allConnection.length) {
                                setAllConnectionDetails(obj);
                            }
                        }
                    })
                    .catch((error) => {
                        setShowOvelayLoader(false);
                        Toast(error.message,true,4000);
                        console.log(error.message);
                        navigation.goBack();
                    });
            }
        }
    }, [allConnection]);

    useEffect(() => {
        let parent = findParents(data, userPhone);
        let connection = getChildrensObject(data, userPhone);
        let children = [];
        if (typeof connection === 'object') {
            console.log("coming")
            for (let child in connection) {
                children.push(child)
            }
        }
        console.log("parent", parent);
        console.log("children", children);
        if(parent){
            setAllParents(parent);
        }
        setAllChildrens(children);
    }, [userPhone]);

    useEffect(() => {
        if (Object.keys(allConnectionDetails).length > 0) {
            setShowOvelayLoader(false)
        }
        // console.log(allConnectionDetails)
    }, [allConnectionDetails]);

    const Toast = (message, errorStatus = true, timeout = 2500, position = 'top') => {
        let content = { "message": message, "errorStatus": errorStatus, "timeout": timeout, "position": position };
        setToastContent(content);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
        }, timeout);
    }

    const findParents = (obj, targetKey, path = []) => {
        for (const key in obj) {
            if (key === targetKey) {
                return path;
            } else if (typeof obj[key] === 'object') {
                const result = findParents(obj[key], targetKey, [...path, key]);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    };

    const getChildrensObject = (obj, targetKey) => {
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

    const getAllKeys = (obj) => {
        let keys = [];
        for (const key in obj) {
            keys.push(key);
            if (typeof obj[key] === 'object') {
                keys = keys.concat(getAllKeys(obj[key]));
            }
        }
        return keys;
    };

    const parsePhoneInConnection=(phone)=>{
        let parsePhone=phone.slice(0,2)+"******"+phone.slice(8,10);    
        return parsePhone;
    }

    const changeCurrentUser = (phone) => {
        console.log(phone)
        setUserPhone(phone);
    }

    const renderPhoneRows = () => {
        const rows = [];

        for (let i = 0; i < allChildrens.length; i += 2) {
            const firstPhoneNumber = allChildrens[i];
            const secondPhoneNumber = allChildrens[i + 1];

            rows.push(
                <View key={i / 2}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 15,
                    }}>
                        <TouchableOpacity onPress={() => changeCurrentUser(firstPhoneNumber)}>
                            <View style={{ flex: 1, alignItems: 'center' }} >
                                <View style={{ padding: 5, borderWidth: 2, borderRadius: 3, borderColor: '#cacccb', flexDirection: 'row', minWidth: screenWidth * 0.4, maxWidth: (allChildrens.length == 1 ||  i == allChildrens.length-1 ? screenWidth * 0.6 : screenWidth * 0.4)}}>
                                    <View style={{ justifyContent: 'center', margin: 5 }}>
                                        <Text style={{ backgroundColor: getColorCodeDark(), padding: 10, color: 'white', borderRadius: 20 }}>
                                            {allConnectionDetails[firstPhoneNumber].Icon}
                                        </Text>
                                    </View>
                                    <View style={{ margin: 5, marginLeft: 10, marginRight: 50 }}>
                                        <Text style={{ fontFamily: 'serif' }}>
                                            {parsePhoneInConnection(firstPhoneNumber)}
                                        </Text>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'serif' }}>
                                            {allConnectionDetails[firstPhoneNumber].Name}
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginRight: 5 }}>
                                        <Icon name='chevron-right' type='feather' />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>


                        {secondPhoneNumber &&
                            <TouchableOpacity onPress={() => changeCurrentUser(secondPhoneNumber)}>
                                <View style={{ flex: 1, alignItems: 'center' }} >
                                    <View style={{ padding: 5, borderWidth: 2, borderRadius: 3, borderColor: '#cacccb', flexDirection: 'row', minWidth: screenWidth * 0.4, maxWidth: screenWidth * 0.4, }}>
                                        <View style={{ justifyContent: 'center', margin: 5 }}>
                                            <Text style={{ backgroundColor: getColorCodeDark(), padding: 10, color: 'white', borderRadius: 20 }}>
                                                {allConnectionDetails[secondPhoneNumber].Icon}
                                            </Text>
                                        </View>
                                        <View style={{ margin: 5, marginLeft: 10, marginRight: 50 }}>
                                            <Text style={{ fontFamily: 'serif' }}>
                                                {parsePhoneInConnection(secondPhoneNumber)}
                                            </Text>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'serif' }}>
                                                {allConnectionDetails[secondPhoneNumber].Name}
                                            </Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginRight: 5 }}>
                                            <Icon name='chevron-right' type='feather' />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            );
        }

        return rows;
    };


    return (
        <View style={styles.container}>
            {showOvelayLoader && <OverlayLoader content={ovelayLoaderContent} />}
            {isToastVisible && <CustomToast content={toastContent} handleToastVisible={()=>setIsToastVisible(false)}/> }
            <ScrollView showsVerticalScrollIndicator={false}>
                <View >
                    {
                        Object.keys(allConnectionDetails).length > 0 &&
                        <View>
                            {
                                allParents.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => changeCurrentUser(item)}>
                                            <View key={index} style={{ flex: 1, alignItems: 'center' }} >
                                                <View style={{ padding: 5, borderWidth:2, borderRadius: 3, borderColor: (index==0 ?(allParents.length>0) ?'#104c7a' : '#cacccb' :'#cacccb'), flexDirection: 'row', minWidth: screenWidth * 0.6, maxWidth: screenWidth * 0.6, }}>
                                                    <View style={{ justifyContent: 'center', margin: 5 }}>
                                                        <Text style={{ backgroundColor: getColorCodeDark(), padding: 10, color: 'white', borderRadius: 50, fontSize: 16 }}>
                                                            {allConnectionDetails[item].Icon}
                                                        </Text>
                                                    </View>
                                                    <View style={{ margin: 5, marginLeft: 10,maxWidth: screenWidth * 0.4 }}>
                                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16, fontFamily: 'serif' }}>
                                                            {parsePhoneInConnection(item)}
                                                        </Text>
                                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16, fontFamily: 'serif' }}>
                                                            {allConnectionDetails[item].Name}
                                                        </Text>
                                                    </View>

                                                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginRight: 5 }}>
                                                        <Icon name='chevron-right' type='feather' color={null} />
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <View style={{ height: 40, width: 2, backgroundColor: "#b3b5b4" }}>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <View style={{ padding: 5, borderWidth: 2, borderColor: appColors.basicRed, borderRadius: 3, flexDirection: 'row', minWidth: screenWidth * 0.6, maxWidth: screenWidth * 0.6 }}>
                                        <View style={{ justifyContent: 'center', margin: 5 }}>
                                            <Text style={{ backgroundColor: getColorCodeDark(), padding: 10, color: 'white', borderRadius: 50, fontSize: 16 }}>
                                                {allConnectionDetails[userPhone].Icon}
                                            </Text>
                                        </View>
                                        <View style={{ margin: 5, marginLeft: 10, maxWidth: screenWidth * 0.4 }}>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16, fontFamily: 'serif' }}>
                                                {parsePhoneInConnection(userPhone)}
                                            </Text>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16, fontFamily: 'serif' }}>
                                                {allConnectionDetails[userPhone].Name}
                                            </Text>
                                        </View>
                                        {
                                            Object.keys((allChildrens)).length >0  &&
                                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginRight: 5 }}>
                                                <Icon name='chevron-right' type='feather' />
                                            </View>
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {
                                Object.keys((allChildrens)).length > 0 &&
                                <View>
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={{ height: 40, width: 2, backgroundColor: "#b3b5b4", }}>
                                        </View>
                                    </View>
                                    <View style={{ padding: 5, borderColor: '#b3b5b4', borderRadius: 3, borderWidth: 2, minWidth: screenWidth * 0.9, maxWidth: screenWidth * 1 }}>
                                        <Text style={{ marginBottom: 10, marginTop: 5, marginLeft: 3, marginRight: 3, textAlign: 'center', fontSize: 15, fontFamily: 'serif' }}>
                                            Direct Connections under 
                                            <Text style={{fontWeight:'bold'}}> {allConnectionDetails[userPhone].Name} </Text>({Object.keys((allChildrens)).length})
                                        </Text>
                                        {
                                            renderPhoneRows()
                                        }
                                    </View>
                                </View>
                            }
                        </View>
                    }
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5,
    },
});



export default ConnectionTree