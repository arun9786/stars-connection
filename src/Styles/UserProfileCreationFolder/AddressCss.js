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
    textStyle:{
        fontSize:18
    },
    postText:{
        fontWeight:'bold',
        color:'#5d5e5e',
        textAlign:'right',
        marginRight:10,
        fontSize:16,   
    },
    selectPost:{
        marginLeft:10,
        marginRight:10,
        marginBottom:20,
        fontSize:20,
    },
    selectPostInput:{
        padding:14,
        borderWidth:2,
        borderColor:'#abb0b8',
        borderBottomWidth:2,
        borderRadius:8,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    selectPostOption:{
        fontSize:18,
    },

    pincodeOverlayStyle:{
        padding:10,
        width:'100%',
    },
    pincodeOverlayTitle:{
        fontSize:20
    },
    pincodeOverlayMsg:{
        marginTop:3,
        marginBottom:5,
        fontSize:17,
    },
    overlayActivityIndicator:{
        padding:10,
    }
    

})