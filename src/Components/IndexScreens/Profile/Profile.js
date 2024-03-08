import { View, Text, Keyboard, StatusBar, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../../../Styles/IndexScreens/Profile/ProfileCss';
import LogIn from '../../Registration/LogIn';
import SignUp from '../../Registration/SignUp';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import appColors from '../../../Others/appColors.json'
import UserProfile from './UserProfile';

export default function Profile() {

    const navigation = useNavigation();
    const [refreshPage, setRefreshPage] = useState(false);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'profile', title: 'Profile' },
        { key: 'register', title: 'Register' },
    ]);

    const renderScene = SceneMap({
        profile: () => <UserProfile />,
        register: () => <LogIn />
    });

    const getLabelText = ({ route }) => {
        const focused = route.key === routes[index].key;
        return <Text style={[styles.label, focused && styles.boldLabel]}>{route.title}</Text>;
      };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar
                translucent
                backgroundColor={appColors.basicRed}
                barStyle="dark-content"
            />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(newIndex) => {
                    setIndex(newIndex);
                    Keyboard.dismiss();
                }}
                initialLayout={{ width: 0, height: 0 }}
                
                renderTabBar={(props) => (
                    <TabBar
                        scrollEnabled={routes.length>3}
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: appColors.basicRed, borderColor:'#919190', borderBottomWidth:1}}
                        activeColor='white'
                        inactiveColor='#f5f4f2'
                        labelStyle={{textTransform:'capitalize', fontWeight:'bold', fontSize:17}}
                    />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    label: {
      fontSize: 14,
      color: 'gray',
    },
    boldLabel: {
      fontWeight: 'bold',
      color: 'black',
    },
  });