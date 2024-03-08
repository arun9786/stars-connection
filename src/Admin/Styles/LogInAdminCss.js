import { StyleSheet } from "react-native";
import appColors from '../../Others/appColors.json'
import { getSizeForScreen } from "../../Components/Features/responsiveSizeMaker";

export const Styles=StyleSheet.create({
    contaier:{
        flex:1,
        margin:getSizeForScreen(10),
        justifyContent:'center',
        paddingLeft:getSizeForScreen(10),
        paddingRight:getSizeForScreen(10),
    },
    pageWelcome:{
        fontSize:getSizeForScreen(23),
        fontWeight:'bold',
    },
    signinTopView:{
        backgroundColor:'#e8e7e6',
        padding:getSizeForScreen(10),
        borderTopRightRadius:getSizeForScreen(10),
        borderTopLeftRadius:getSizeForScreen(10),
    
    },
    signinContainer:{
        backgroundColor:'white',
        paddingTop:getSizeForScreen(15),
        paddingLeft:getSizeForScreen(5),
        paddingRight:getSizeForScreen(5),
        paddingBottom:getSizeForScreen(15),
    },
    inputContainer:{
        borderWidth:getSizeForScreen(3),
        borderColor:appColors.basicRed,
        paddingLeft:getSizeForScreen(4),
        paddingRight:getSizeForScreen(4),
        borderBottomWidth:getSizeForScreen(3),
        borderRadius:getSizeForScreen(8),
    },
    input:{
        paddingLeft:getSizeForScreen(10),
        paddingRight: getSizeForScreen(3)
    },
    inputIcons:{
        
    },
    lableStyle:{
        color:'#585959',
        textAlign:'right',
    },
    button:{
        margin:getSizeForScreen(8),
        backgroundColor:'#9D1D27',
        borderRadius:getSizeForScreen(8),
        padding:getSizeForScreen(10),
    },
    buttonIcon:{
        color:'white',
        marginLeft:getSizeForScreen(6),
    },
    buttonTitleStyle:{
        fontSize:getSizeForScreen(19),
    },
    signinBottomView:{
        backgroundColor:'#e8e7e6',
        borderBottomRightRadius:getSizeForScreen(10),
        borderBottomLeftRadius:getSizeForScreen(10),
        padding:getSizeForScreen(10),
    },
})