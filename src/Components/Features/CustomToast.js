// CustomToast.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomToast = ({ content, handleToastVisible }) => {
  const translateY = new Animated.Value(0);
  console.log(content.message.length);
  const startPosition = content.position === 'top' ? -200 : 200;
  const endPosition = content.position === 'top' ? 0 : -100;
  let contentFontSize=content.message.length>30 ? (content.message.length>40?15:17 ):19;
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [content]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          [content.position]:0,
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [startPosition, endPosition],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.toastContent}>
        <Icon
          name={content.errorStatus ? 'x-circle' : 'check-circle'}
          type='feather'
          color={content.errorStatus ? '#db0723' : 'green'}
          style={{marginLeft:5}}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.toastText,{fontSize:contentFontSize}]}>{content.message}</Text>
        </View>
        <TouchableOpacity onPress={handleToastVisible} style={styles.closeButton}>
          <Icon name='x' color='#9c9b9a' type='feather' />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 999,
    width: '100%',
  },
  toastContent: {
    padding: 15,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#e3e2e1',
  },
  textContainer: {
    flex: 1, 
    marginLeft: 7,
    alignItems:'center',
    justifyContent:'center',
  },
  toastText: {
    fontFamily: 'sans-serif',
    color: 'black',
    fontSize: 19,
  },
  closeButton: {
    
  },
});

export default CustomToast;
