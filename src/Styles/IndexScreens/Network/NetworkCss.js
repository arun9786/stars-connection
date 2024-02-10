import { Dimensions, StyleSheet } from "react-native";
import appColors from '../../../Others/appColors.json'
import { getSizeForScreen } from "../../../Components/Features/responsiveSizeMaker";

const { width: screenWidth } = Dimensions.get('window');

export const Styles=StyleSheet.create({
    container: {
        flex:1,
        padding:getSizeForScreen(5),
        marginBottom:getSizeForScreen(10),
    },
    userDetailsTopContainer:{
        backgroundColor:appColors.basicRed,
        margin:getSizeForScreen(10),
        paddingLeft:getSizeForScreen(25),
        padding:getSizeForScreen(15),
        borderRadius:getSizeForScreen(10),
        marginBottom:0,
    },
    userDetailsTitle:{
        textAlign:'center',
        fontSize:getSizeForScreen(19),
        fontFamily:'serif',
        color:'white',
        fontWeight:'bold',
        marginBottom:getSizeForScreen(5),
    },
    everyUserDetailContainer:{
        marginTop:getSizeForScreen(5),
        marginBottom:getSizeForScreen(5),
        flexDirection:'row',
        alignItems:'center', 
    },
    userDetailsInnerContainer:{
        marginRight:getSizeForScreen(5),
        flex:1,
    },
    userDetailsRightContainer:{
        flexDirection:'row',
    },
    userDetailsText:{
        fontFamily:'serif',
        color:'white',
        fontSize:getSizeForScreen(16),
    },
    userRightDetailText:{
        marginLeft:getSizeForScreen(12),
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
    referalsContainer:{
        marginRight: getSizeForScreen(30), 
        marginLeft: getSizeForScreen(15)
    },
    referalsEveryTopLeftLine:{
        borderLeftWidth: 2, 
        height: getSizeForScreen(30), 
        marginLeft: getSizeForScreen(15), 
        borderLeftColor: appColors.basicRed 
    },
    referalsInnerContainer:{
        flexDirection: 'row',
        width: '100%', 
        alignItems: 'center',
        borderLeftWidth: 2, 
        marginLeft: getSizeForScreen(15), 
        borderLeftColor: 
        appColors.basicRed, 
        marginTop: getSizeForScreen(-1)
    },
    referalsIconContainer:{
        position: 'absolute', 
        left: -17, 
        zIndex: 1
    },
    referalsIconText:{
        backgroundColor: appColors.basicRed, 
        color: 'white', 
        textAlign: 'center',
        textAlignVertical: 'center', 
        fontSize: getSizeForScreen(17), 
        borderRadius: getSizeForScreen(20), 
        padding: getSizeForScreen(7)
    },
    referalsInnerLeftLine:{
        borderBottomWidth: 2, 
        flex: 0.13, 
        borderBottomColor: appColors.basicRed
    },
    referalsMainOuterContainer:{
        flexDirection:'row', 
        alignItems:'center', 
        flex:0.87
    },
    referalsMainContainer:{
        flex: 1, 
        backgroundColor: appColors.basicRed, 
        padding: getSizeForScreen(12),
        borderRadius: getSizeForScreen(25), 
        borderBottomLeftRadius: 0, 
        borderTopRightRadius: getSizeForScreen(3),
        borderColor: '#f7e1e3', 
        borderWidth: getSizeForScreen(5),
    },
    referalsMainLeftContainer:{
        flexDirection: 'row', 
        marginBottom: getSizeForScreen(5),
    },
    referalsMainRightContainer:{
        flexDirection: 'row', 
        marginBottom: getSizeForScreen(5), 
        maxWidth: screenWidth * 0.5
    },
    referalContentTitleText:{
        fontSize: getSizeForScreen(16), 
        fontFamily: 'serif', 
        color: 'white' 
    },
    referalContentValueText:{
        fontSize: getSizeForScreen(17),
        fontFamily: 'serif', 
        color: 'white'
    },
    referalsArrowIconContainer:{
        position:'absolute', 
        right:-15
    },
    referalsArrowIcon:{
        backgroundColor:'white', 
        borderRadius:getSizeForScreen(20), 
        padding:getSizeForScreen(7)
    }
});