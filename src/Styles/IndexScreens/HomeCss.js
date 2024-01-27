import { StyleSheet } from "react-native";

export const Styles=StyleSheet.create({
    AppbarHeader:{
        backgroundColor: '#000000'
    },
    headerNotificationContainer:{
        marginRight:7,
        marginLeft:7,
    },
    badgeForHeader:{
        position: 'absolute', 
        top: -5, 
        right: -5,
        fontSize:6,
    },
    badgeTextStyle:{
        fontSize:8,
    }
})