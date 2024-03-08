import { View, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';
import appColors from '../../../Others/appColors.json'
import { Button, Icon, Text } from 'react-native-elements';
import { useEffect } from 'react';
import { countAllChildrensInObject, getChildrensObjectBasedOnKey } from '../../../Others/Basics';

const UserProfile = () => {

    const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
    const connectionsDataRedux = useSelector((state) => state.ConnectionsReducer.connections_array);
    const { width: screenWidth } = Dimensions.get('window');

    const [imageProfileUrlExists, setImageProfileUrlExists] = useState(false);
    const [userJoinedDate, setUserJoinedDate] = useState('');
    const [userDirectReferalsCount, setUserDirectReferalsCount] =useState(0);
    const [userTotalReferalsCount, setUserTotalReferalsCount] =useState(0);

    useEffect(() => {
        if (userPersonalDataRedux && userPersonalDataRedux.Joined) {
            const dateArr = userPersonalDataRedux.Joined.split("/");
            console.log(dateArr);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = months[parseInt(dateArr[0]) - 1];
            setUserJoinedDate(dateArr[1] + " " + month + " " + dateArr[2]);
        }
        if(connectionsDataRedux){
            const connection = getChildrensObjectBasedOnKey(connectionsDataRedux, userPersonalDataRedux.Phone)
            setUserDirectReferalsCount(Object.keys(connection).length);
            const childrensCount=countAllChildrensInObject(connection);
            setUserTotalReferalsCount(childrensCount);
        }
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, padding: 5 }}>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                {
                                    imageProfileUrlExists ? <Text>Image</Text>
                                        :
                                        <View style={{ flex: 0 }}>
                                            <Text style={{
                                                padding: 10, backgroundColor: appColors.basicRed, borderRadius: 100, color: 'white',
                                                fontSize: 17, width: 50, height: 50, textAlign: 'center', textAlignVertical: 'center'
                                            }}>
                                                {
                                                    userPersonalDataRedux &&(
                                                    userPersonalDataRedux.FirstName.charAt(0) +
                                                    userPersonalDataRedux.LastName.charAt(0))
                                                }
                                            </Text>
                                        </View>
                                }
                            </View>
                            <Icon name='plus' type='feather' style={{ position: 'absolute', bottom: 0, right: 0 }} />

                        </View>
                        <View style={{ flex: 0.65 }}>
                            <Text numberOfLines={1} style={{ fontSize: 18 }}>{userPersonalDataRedux.FirstName + " " + userPersonalDataRedux.LastName.charAt(0)}</Text>
                            <Text>Joined {userJoinedDate}</Text>
                        </View>
                        <View style={{ flex: 0.25 }}>
                            <Icon name='edit' color={appColors.basicRed} />
                        </View>
                    </View>
                    <View style={{padding:7, flexDirection:'row', alignItems:'center'}}>
                        <Text >{userDirectReferalsCount}</Text>
                        <Text style={{color:'#6b6a6a'}}> Direct Referals  </Text>
                        <Text >{userTotalReferalsCount}</Text>
                        <Text> Total Connections </Text>
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default UserProfile