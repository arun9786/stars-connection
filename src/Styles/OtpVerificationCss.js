import { StyleSheet } from "react-native";

export const Styles=StyleSheet.create({
    contaier:{
        flex:1,
        margin:10,

    },
    inputContainer:{
        borderWidth:2,
        borderColor:'#abb0b8',
        padding:5,
        borderBottomWidth:2,
        borderRadius:8
    },
    input:{
        paddingLeft:10,
        paddingRight:3,
        textAlign:'left',
    },
    lableStyle:{
        color:'#585959',
        textAlign:'left',
    },
    buttonOtp:{
        margin:8,
        backgroundColor:'#87672d',
        borderRadius:8,
        padding:12
    },
    buttonRegister:{
        margin:8,
        backgroundColor:'#992f64',
        borderRadius:8,
        padding:12
    },
    buttonIcon:{
        color:'white',
        marginLeft:12,
    },
    otpTimer:{
        textAlign:'right',
        marginRight:10,
        color:'#424242',
    }
})