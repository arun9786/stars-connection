import { View, Text } from 'react-native'
import React from 'react'

import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import { Badge, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../Styles/ProfileCss';

export default function Profile() {

    const navigation=useNavigation();
    const backToHomeFun=()=>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }



    return (
        <Provider>
            <Appbar.Header style={Styles.AppbarHeader}>
                <Appbar.Action
                    icon="arrow-left"
                    onPress={backToHomeFun}
                    color="white"
                />
                 <Appbar.Content title="" />
                <View style={Styles.headerNotificationContainer}>
                    <Icon name='share-2' type='feather' color='white' onPress={() => console.log("hello")} />
                    </View>
                    <View style={Styles.headerNotificationContainer}>
                        <Icon name='menu' type='feather' color='white' />
                    </View>
            </Appbar.Header>
            <View style={Styles.mainConatainer}>
                
            </View>
        </Provider>
    )
}