import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, ScrollView, View } from 'react-native'
import { Image, Tab, TabView, Text } from "react-native-elements";
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import LogIn from "./Registration/LogIn";
import SignUp from "./Registration/SignUp";


import { Styles } from "../Styles/LogInSignUpCss";


export default function LogInSignUp() {

    const [tabIndex, setTabIndex] = useState(0);
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        setRefreshPage(!refreshPage);
    }, [tabIndex]);

    return (

        <View style={Styles.container}>
            <Appbar.Header style={{ display: 'none' }}>
            </Appbar.Header>
            <View style={Styles.imageViewContainer}>
                <Image source={require('../Images/loginSignupTopIcon.png')} style={{ width: '100%', height: '100%' }}
                    onError={() => console.log("error loading file")} PlaceholderContent={<ActivityIndicator />} />
            </View>

            <Tab value={tabIndex} onChange={(index) => { setTabIndex(index); Keyboard.dismiss()}}
                indicatorStyle={{ color: 'black' }} >
                <Tab.Item title='LogIn' />
                <Tab.Item title='Register' />
            </Tab>

            <TabView value={tabIndex} onChange={(index) => { setTabIndex(index); Keyboard.dismiss()}} >
                <TabView.Item style={{ width: '100%' }}>
                    <LogIn name={refreshPage} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <SignUp name={refreshPage} />
                </TabView.Item>
            </TabView>

        </View>
    )

}