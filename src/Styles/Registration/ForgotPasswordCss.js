import { StyleSheet } from "react-native";
import appColors from '../../Others/appColors.json'

export const Styles=StyleSheet.create({
    container:{
        flex:1,
        margin:10,
    },
    inputContainer:{
        borderWidth:2,
        borderColor:appColors.basicRed,
        borderBottomWidth:2,
        borderRadius:8,
        paddingLeft:7,
        paddingRight:7,
    },
    input:{
        paddingLeft:10,
        paddingRight:3,
    },
    lableStyle:{
        color:appColors.basicRed,
        textAlign:'right',
    },

    passwordHintText:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        textAlign:'justify',
    },
    button:{
        margin:8,
        backgroundColor:appColors.basicRed,
        borderRadius:8,
        padding:12
    },
    buttonIcon:{
        color:'white',
        marginLeft:6,
    },
})