import { StyleSheet } from "react-native";
import appColors from '../../../Others/appColors.json'

export const Styles=StyleSheet.create({
    contaier:{
        flex:1,
        margin:10,
        marginBottom:40,
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
    textComponetStyle:{
        fontWeight:'bold',
        color:appColors.basicRed,
        textAlign:'right',
        marginRight:10,
        fontSize:16,
    },
    buttonGroupContainer:{
        borderWidth:2,
        borderColor: appColors.basicRed,
        height:50,
        borderRadius:8,
        marginBottom:25,
    },
    selectedButtonStyle:{
        backgroundColor: appColors.basicRed
    },
    textStyle:{
        fontSize:18
    },
    passwordHintText:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        textAlign:'justify',
    },
    postText:{
        fontWeight:'bold',
        color:appColors.basicRed,
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
        borderColor:appColors.basicRed,
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
    },
    buttonViewContainer:{
        position: 'absolute', 
        bottom: 0, 
        width:'100%',
    },
    buttonContainer:{
        marginLeft:10, 
        marginRight:10,
        color: appColors.basicRed,
    },
    button:{
        fontSize:19,
        borderWidth:1,
        borderColor:'#bfbcbb',
        margin:8,
        backgroundColor:appColors.basicRed,
        borderRadius:8,
        padding:12,
        color:appColors.basicRed
    },
    buttonIcon:{
        color: appColors.basicRed,
        marginLeft:6,
    },
    
    referalContainer:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:appColors.basicRed,
        borderTopRightRadius:12,
        borderTopLeftRadius:12,
    },
    referalCloseButton:{
        color:appColors.basicRed,
        alignSelf:'flex-end',
        marginRight:7,
        fontSize:21,
        paddingRight:3,
        paddingLeft:3,
        // backgroundColor:'green'
    },
    referalTitle:{
        textAlign:'center',
        fontWeight:'bold',
        color:appColors.basicRed,
        fontSize:21,        
    },
    referalMsg:{
        marginLeft:15,
        marginRight:15,
        marginTop:3,
        fontStyle:'italic',
    },
    referalCondition:{
        textAlign:'center',
        marginTop:5,
        fontSize:17,
    },
    referalInputContainer:{
        borderWidth:1,
        borderColor:appColors.basicRed,
        borderRadius:8,
        marginTop:15,
        marginLeft:60,
        marginRight:60,
        padding:3,
        textAlign:'center'
    },
    referalInput:{
        textAlign:'center',
        fontSize:21,
    },
    referalVerifyButtonContainer:{
        marginLeft:100, 
        marginRight:100,
    },
    referalVerifyButton:{
        fontSize:19,
        borderWidth:1,
        borderColor:'#bfbcbb',
        margin:8,
        backgroundColor:appColors.basicRed,
        borderRadius:30,
        padding:12,
        color:appColors.basicRed
    },
    referalButtonIcon:{
        marginRight:10
    },

    bottomSheetTextTitleContainer:{
        // marginLeft:10,
        // marginRight:10,
        // borderTopRightRadius:10,
        // borderTopLeftRadius:10,
    },
    bottomSheetTextTitle:{
        fontSize:17,
    },
    bottomSheetTextContentContainer:{
        marginLeft:10,
        marginRight:10,
        backgroundColor:'white',
        borderRadius:10,
    },
    bottomSheetTextContent:{
        fontSize:17,
    },
    bottomSheetProceedButtonContainer:{
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#0f9799',
        textAlign:'right',
        borderRadius:10,

    },
    bottomSheetProceedButtonTitle:{
        fontSize:20,
        textAlign:'right',
        color:'white'
    },
    bottomSheetCancelButtonContainer:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        backgroundColor:'#732039',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        textAlign:'center'
    },
    bottomSheetCancelButtonTitle:{
        fontSize:20,
        textAlign:'right',
        color:'white',
        textAlign:'center'
    },
    userDOBContainer:{
        flexDirection: 'row', 
        borderColor: appColors.basicRed, 
        borderWidth: 2,                                
        paddingLeft: 8, 
        paddingRight: 8, 
        padding: 12, 
        marginLeft: 10, 
        marginRight: 10, 
        borderRadius: 8,
        marginBottom: 25,
    },
    userDOBTextContainer:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        marginLeft:15
    },
    userDOBText:{
        fontSize:18
    },
})