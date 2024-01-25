// CustomToast.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomToast = ({ content, handleToastVisible }) => {
  console.log(content);
  const translateY = new Animated.Value(0);
    useEffect(()=>{
     
       
        Animated.timing(translateY, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      
    },[content])

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.toastContent}>
        <Icon name={content.errorStatus?'x-circle':'check-circle'} type='feather'
        
         color={content.errorStatus?'red':'green'} />
        <Text style={styles.toastText}>{content.message}</Text>
        <TouchableOpacity onPress={handleToastVisible} style={{margin:5}}>
            <Icon name='x' color='red' type='feather'/>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    right:0,
    width: '85%',
    zIndex:999,
    padding: 16,
    marginTop:10,
    marginLeft:20,
    marginRight:5,
    borderTopLeftRadius:15,
    borderTopRightRadius:2,
    borderBottomRightRadius:2,
  },
  toastContent: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  toastText: {
    fontFamily:'sans-serif',
    color: 'black',
    fontSize:17,
  },
});

export default CustomToast;
