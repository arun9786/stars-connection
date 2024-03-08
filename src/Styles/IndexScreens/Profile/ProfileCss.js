import { StyleSheet } from "react-native";
import appColors from '../../../Others/appColors.json'

export const Styles = StyleSheet.create({
    AppbarHeader: {
        backgroundColor: appColors.basicRed,
    },
    headerNotificationContainer: {
        marginRight: 7,
        marginLeft: 7,
    },
    headerRightsideContainer:{
        flexDirection: 'row'
    },
    mainConatainer:{
        flex:1,
    }
});