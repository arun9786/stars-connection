import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Overlay, Text } from 'react-native-elements';
import Svg, { Rect, Animated } from 'react-native-svg';
import appColors from '../../../Others/appColors.json'
import { useEffect } from 'react';

const OverlayMainLoader = () => {

    const [showFirstView, setShowFirstView] = useState(false);
    const [showSecondView, setShowSecondView] = useState(false);
    const [showThirdView, setShowThirdView] = useState(false);
    const [showFourthView, setShowFourthView] = useState(false);
    let count=0;
    
    useEffect(()=>{
        const interval=setInterval(()=>{
            switch(count){
                case 0:
                    setShowFirstView(true);
                    break;
                case 1:
                    setShowSecondView(true);
                    break;
                case 2:
                    setShowThirdView(true);
                    break;
                case 3:
                    setShowFourthView(true);
                    break;
                case 4:
                    setShowFourthView(false);
                    break;
                case 5:
                    setShowThirdView(false);
                    break;
                case 6:
                    setShowSecondView(false);
                    break;
                case 7:
                    setShowFirstView(false);
                    break;
            }
            if(count===7){
                count=0;
            }else{
                count++;
            }
            
        },150);

        return ()=>clearInterval(interval);
    },[]);

  return (
    <View>
        <Overlay overlayStyle={{backgroundColor:'rgba(230, 229, 227,0.9)', borderColor:appColors.basicRed, borderWidth:8, borderRadius:0}} 
    backdropStyle={{backgroundColor:'rgba(230, 229, 227,0.9)'}}>
        <View style={{flexDirection:'row', height:50, width:50, alignItems:'flex-end'}}>
            {
                showFirstView &&  <View style={{height:12, flex:0.25, backgroundColor:appColors.basicRed, marginLeft:1}}></View>
            }
            {
                showSecondView &&  <View style={{height:24, flex:0.25, backgroundColor:appColors.basicRed, marginLeft:1}}></View>
            }
            {
                showThirdView &&  <View style={{height:36, flex:0.25, backgroundColor:appColors.basicRed, marginLeft:1}}></View>
            }
            {
                showFourthView && <View style={{height:48, flex:0.25, backgroundColor:appColors.basicRed, marginLeft:1, marginRight:1}}></View>
            }
        </View>
        <View style={{position:'absolute', top:-19, right:-19,  borderRadius:20}}>
            <Icon name='plus' type='feather' color={appColors.basicRed}/>
        </View>
        <View style={{position:'absolute', bottom:-19, left:-19,  borderRadius:20}}>
            <Icon name='plus' type='feather' color={appColors.basicRed}/>
        </View>
       
    </Overlay>
    
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems:'center',
    justifyContent:'center'
  },
});

export default OverlayMainLoader;
