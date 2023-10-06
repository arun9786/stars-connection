import { StyleSheet } from "react-native";

export const Styles=StyleSheet.create({
    contaier:{
        flex:1,
        margin:10,

    },
    inputContainer:{
        borderWidth:2,
        borderColor:'#abb0b8',
        paddingLeft:5,
        paddingRight:5,
        borderBottomWidth:2,
        borderRadius:8,
    },
    input:{
        paddingLeft:10,
        paddingRight:3
    },
    lableStyle:{
        color:'#585959',
        textAlign:'right',
    },
    button:{
        margin:8,
        backgroundColor:'#4b7a5a',
        borderRadius:8,
        padding:12
    },
    buttonIcon:{
        color:'white',
        marginLeft:6,
    },
    errorMsg:{
        color:'#d10f25',
        marginBottom:5,
        marginLeft:10,
        marginRight:10,
        fontSize:17,
        fontStyle:'italic',
        fontFamily:'Roboto',
        textShadowColor: '#bf3444',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 1, 
    },
    overlayStyle:{
        width: '80%',
        padding:20,
        borderRadius:10,
    },
    overlayPleaseWait:{
        fontSize:18,
    },
    overlayVerifingCredentials:{
        fontSize:16,
    },
    overlayActivityIndicator:{
        marginTop:10,
    },
    overlayViewLoginSuccess:{
        width:'100%',
        alignItems:'center'
    },
    overlaySignInSuccess:{
        fontSize:17,
    },
    overlaySuccessIcon:{
        width:50, 
        height:50, 
        alignContent:'center',
        marginTop:10,
        marginBottom:10,
    },
    overlaySuccessButtonIcon:{
        marginRight:10
    }
})