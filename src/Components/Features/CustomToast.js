// CustomToast.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Styles} from '../../Styles/Features/CustomToastCss'

const CustomToast = ({ content, handleToastVisible }) => {
  const translateY = new Animated.Value(0);
  const message = capitalizeWords(content.message);
  const startPosition = content.position === 'top' ? -200 : 200;
  const endPosition = content.position === 'top' ? 0 : -100;
  let contentFontSize = content.message.length > 30 ? (content.message.length > 40 ? 15 : 17) : 19;
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [content]);

  function capitalizeWords(sentence) {
    return sentence.replace(/\b(?:\w+(?:['’]\w+)?)/g, function (match) {
      return match.charAt(0).toUpperCase() + match.slice(1);
    });
  }

  return (
    <Animated.View
      style={[
        Styles.toastContainer,
        {
          [content.position]: 0,
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
      <View style={Styles.toastContent}>
        <Icon
          name={content.errorStatus ? 'x-circle' : 'check-circle'}
          type='feather'
          color={content.errorStatus ? '#db0723' : 'green'}
          style={{ marginLeft: 5 }}
        />
        <View style={Styles.textContainer}>
          <Text style={[Styles.toastText, { fontSize: contentFontSize }]}>{message}</Text>
        </View>
        <TouchableOpacity onPress={handleToastVisible} style={Styles.closeButton}>
          <Icon name='x' color='#9c9b9a' type='feather' />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default CustomToast;
