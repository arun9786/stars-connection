import { StyleSheet } from "react-native";
import appColors from '../../../Others/appColors.json'
import { getColorCode } from "../../../Others/Basics";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    headeraddUsersIcon:{
        marginRight:12,
    },
    headerWhatsappIcon:{
        marginRight:12,
    },
    headerSearchIcon:{
        marginRight:12,
    },
    addConnectionDirectlyButton: {
        margin: 10,
        backgroundColor: '#9D1D27',
        borderRadius: 6,
        padding: 10,
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: appColors.basicRed,
    },
    addConnectionDirectlyButtonTitle: {
        fontSize: 19,
        color: 'white'
    },
    addConnectionIcon: {
        marginLeft: 13
    },
    inviteText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    referalCodeButton: {
        margin: 10,
        marginBottom: 5,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: appColors.basicRed
    },
    referalCodeButtonTitle: {
        fontSize: 21,
        color: appColors.basicRed
    },
    copyReferalIcon: {
        marginLeft: 15
    },
    referalCodeText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clicktoCopyCodeText: {
        textAlign: 'center',
        fontSize: 13,
    },
    orText: {
        textAlign: 'center',
        fontSize: 17,
        margin: 5,
    },
    whatsappButton: {
        margin: 10,
        marginTop: 15,
        padding: 10,
        backgroundColor: '#05a33f',
        // borderWidth:2,
        // borderStyle:'dotted',
        // borderColor:appColors.basicRed
    },
    whatsappButtonTitle: {
        fontSize: 19,
        color: 'white'
    },
    whatsappIcon: {
        marginRight: 15
    },
    sentInviteText: {
        margin: 10,
        fontSize: 17,
    },
    inputContainer: {
        textAlign: 'justify',
        marginTop: 15,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: '#c9c8c7',
        padding: 4,
        borderBottomWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f2fafa',
    },
    input: {
        paddingLeft: 10,
        paddingRight: 5,
        paddingBottom: 3,
    },
    inputIcon: {
        marginLeft: 5,
    },

    phoneViewContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        margin: 15, 
        marginTop: 0, 
        marginRight: 0,
    },
    phoneViewImage: {
        width: 50, 
        height: 50, 
        borderRadius: 25
    },

    phoneViewImageText: {
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        fontSize: 17, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        color: 'white'
    },
    phoneViewNameOuterContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        borderBottomColor: '#c9c8c7', 
        borderBottomWidth: 1,
        paddingRight: 10, 
        paddingBottom: 15, 
        paddingLeft: 10, 
        marginLeft: 5,
    },
    phoneViewNameInnerContainer: {
        flex: 1, 
        flexDirection: 'column',
    },
    phoneViewNameText: {
        fontSize: 16, 
        fontWeight: 'bold', 
        maxWidth: '100%', 
        overflow: 'hidden', 
        paddingLeft: 2, 
        paddingTop: 2, 
        textAlign: 'left'
    },
    phoneViewPhoneText: {
        paddingTop: 3, 
        paddingLeft: 2
    },
    phoneViewIcon: {
        padding: 10
    }
})
