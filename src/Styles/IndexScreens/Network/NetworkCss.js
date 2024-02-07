import { StyleSheet } from "react-native";

export const Styles=StyleSheet.create({
    container: {
        flex:1,
        padding:5,
        marginBottom:10,
    },
    userDetailsTopContainer:{
        backgroundColor:'#9c033e',
        margin:10,
        padding:15,
        borderRadius:10,
        borderBottomLeftRadius:0,
        marginBottom:0,
    },
    userDetailsTitle:{
        textAlign:'center',
        color:'white',
        fontSize:21,
        fontFamily:'serif',
        fontWeight:'bold',
        marginBottom:5,
    },
    everyUserDetailContainer:{
        marginTop:6,
        marginBottom:6,
        flexDirection:'row',
        alignItems:'center', 
    },
    userDetailsInnerContainer:{
        marginRight:5,
        flex:1,
    },
    userDetailsRightContainer:{
        flexDirection:'row',
    },
    userDetailsText:{
        fontFamily:'serif',
        color:'white',
        fontSize:15,
    },
    userRightDetailText:{
        marginLeft:12,
    },
    addUserContainer:{
        justifyContent:'center',
        alignItems:'center',
        // height:100,
        backgroundColor:'red',
    },
    allReferalContainer:{
        backgroundColor:'green',
    },
});