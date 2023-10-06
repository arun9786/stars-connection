import { StyleSheet } from "react-native";

export const Styles=StyleSheet.create({
    contaier:{
        flex:1,
        margin:10,

    },
    pageTitle:{
        textAlign:'center',
        fontSize:21,
        fontWeight:'bold',
        margin:10,
    },
    inputContainer:{
        borderWidth:2,
        borderColor:'#abb0b8',
        borderBottomWidth:2,
        borderRadius:8,
        paddingLeft:7,
        paddingRight:7,
    },
    input:{
        paddingLeft:10,
        paddingRight:3
    },
    lableStyle:{
        color:'#585959',
        textAlign:'right',
    },
    buttonGroupContainer:{
        borderWidth:2,
        borderColor:'#abb0b8',
        height:50,
        borderRadius:8,
        marginBottom:25,
    },
    selectedButtonStyle:{
        backgroundColor:'#34558a'
    },
    textStyle:{
        fontSize:18
    },
    genderErrorMsg:{
        marginLeft:10,
        marginRight:10,
        color:'#FF0000',
        fontSize:17,
    }
    

})