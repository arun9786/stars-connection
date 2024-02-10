// PointsLoader.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Modal } from 'react-native';
import appColors from '../../Others/appColors.json'
import { StatusBar } from 'react-native';
import { Overlay } from 'react-native-elements';

const CustomLoaderWithoutMsg = () => {
  const numPoints = 8; // Adjust the number of points as needed
  const rotation = useRef(new Animated.Value(0)).current;

  const rotateLoader = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1.5,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    rotateLoader();
  }, []);

  const pointViews = Array.from({ length: numPoints }, (_, index) => {
    const rotateDegree = (360 / numPoints) * index;
    const translateX = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -15], // Adjust the distance from the center
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.loaderPoint,
          {
            transform: [
              { rotate: `${rotateDegree + 'deg'}` },
              { translateX },
              { rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] }) },
            ],
          },
        ]}
      />
    );
  });

  return (
  <Overlay transparent={true} animationType="slide">
      <View style={styles.overlayContainer}>
        <View style={styles.loaderContainer}>
            {pointViews}
        </View>
      </View>
    </Overlay>
  )
  
};

const styles = StyleSheet.create({
    overlayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)', // Adjust the overlay background color and opacity
        // marginTop: StatusBar.currentHeight || 0,
      },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8a066d',
    position: 'absolute',
  },
});

export default CustomLoaderWithoutMsg;
