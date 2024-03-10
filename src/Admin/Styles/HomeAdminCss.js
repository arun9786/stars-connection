import { StyleSheet } from "react-native";
import appColors from '../../Others/appColors.json'

export const Styles=StyleSheet.create({
   
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
    },
})