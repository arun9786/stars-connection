import { StyleSheet } from "react-native";
import { getSizeForScreen } from "../../Components/Features/responsiveSizeMaker";
export const Styles=StyleSheet.create({
    overlayStyle:{
        width: '80%',
        padding:getSizeForScreen(20),
        borderRadius:getSizeForScreen(10),
    },
    overlayPleaseWait:{
        fontSize:getSizeForScreen(18),
    },
    overlayContent:{
        marginTop:getSizeForScreen(5),
        fontSize:getSizeForScreen(16),
    },
    overlayActivityIndicator:{
        marginTop:getSizeForScreen(10),
    },
    overlayViewLoginSuccess:{
        width:'100%',
        alignItems:'center'
    },
    overlaySignInSuccess:{
        fontSize:getSizeForScreen(17),
    },
    overlaySuccessIcon:{
        width:50, 
        height:50, 
        alignContent:'center',
        marginTop:getSizeForScreen(10),
        marginBottom:getSizeForScreen(10),
    },
    overlaySuccessButtonIcon:{
        marginRight:getSizeForScreen(10)
    }
});