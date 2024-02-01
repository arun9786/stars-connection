import React from "react";
import { View } from "react-native";
import { Icon, Overlay, Text } from "react-native-elements";
import appColors from '../../Others/appColors.json'

const NoInternetOverlay=({closeInternetOverlay})=>{

    return(
        <Overlay visible={true} overlayStyle={{width:'85%', borderRadius:5,}}>
            <View style={{padding:30, alignItems:'center', justifyContent:'center'}}>
                <Icon name="close" color={appColors.basicRed} size={30} containerStyle={{position:'absolute',top:0,right:0}} onPress={closeInternetOverlay}/>
                <Icon name="wifi-off"  color={appColors.basicRed} style={{marginTop:10}} size={100}/>
                <Text style={{fontWeight:'bold', fontSize:27, marginTop:25}}>No Internet connection</Text>
                <Text style={{textAlign:'center', fontSize:17, marginTop:20,}}>Please check your internet connection status and try again</Text>
            </View>
        </Overlay>
    )
}

export default NoInternetOverlay;