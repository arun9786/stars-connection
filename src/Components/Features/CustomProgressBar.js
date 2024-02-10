import React, { useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from "react-native-elements";

const CustomProgressBar = () => {
  const [progressValue, setProgressValue] = React.useState(0.5);
  const [progressViewBackgroundColor, setProgressViewBackgroundColor] = useState('');
  const [viewBackgroundColor, setViewBackgroundColor] =useState('#c2c2c2');
  const [increaseHeight, setIncreaseHeight] =useState(1);
  const colors = ["red", "orange", "yellow"];
  let number=0;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((progressValue) => (progressValue + 0.1 > 1 ? 0 : progressValue + 0.1));
    }, 150);

    const secondinterval = setInterval(() => {
      if(number==0){
        setViewBackgroundColor('#dbd7d7')
        setIncreaseHeight(1);
      }else if(number==1){
        setViewBackgroundColor('#ccc8c8')
        setIncreaseHeight(1.005);
      }else if(number==2){
        setViewBackgroundColor('#bfbaba')
        setIncreaseHeight(1.01);
      }else if(number==4){
        setViewBackgroundColor('#ccc8c8')
        setIncreaseHeight(1.005);
      }else if(number==5){
        setViewBackgroundColor('#bfbabab')
        setIncreaseHeight(1);
      }
      number++;
      if(number==5){
        number=number%5;
      }
    }, 250);
    return () => {
      clearInterval(interval);
      clearInterval(secondinterval)
    };
  }, []);

  useEffect(() => {
    let color = '#c20a1c';
    if (progressValue > 0.7) {
      color = '#f0374d'
    } else if (progressValue > 0.4) {
      color = '#9dc20a'
    }
    setProgressViewBackgroundColor(color);
  }, [progressValue]);

  const leftColor = '#e8e179';
  const rightColor = '#a8a228';
  const centerColor = '#c46a2d';

  const gradientColors = [leftColor, centerColor, rightColor];

  return (
    <View>
      <View style={{ ...styles.progressBarContainer, backgroundColor: progressViewBackgroundColor }}>
        <LinearGradient
          colors={gradientColors}
          style={[styles.progressBar, { width: `${progressValue * 100}%` }]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </View>
      <View>
        <View style={{ padding: 5, backgroundColor: 'white', flexDirection: 'row' }}>
          <View style={
            {
              flex: 0.333, backgroundColor: viewBackgroundColor, padding: 20,
              height: 80*increaseHeight, margin: 5, borderRadius: 7
            }
          }>
          </View>
          <View style={
            {
              flex: 0.333, backgroundColor: viewBackgroundColor, padding: 20,
              height: 80*increaseHeight, margin: 5, borderRadius: 7
            }
          }>
          </View>
          <View style={
            {
              flex: 0.333, backgroundColor: viewBackgroundColor, padding: 20,
              height: 80*increaseHeight, margin: 5, borderRadius: 7
            }
          }>
          </View>
          <View style={
            {
              flex: 0.333, backgroundColor: viewBackgroundColor, padding: 20,
              height: 80*increaseHeight, margin: 5, borderRadius: 7
            }
          }>
          </View>
          <View style={
            {
              flex: 0.333, backgroundColor: viewBackgroundColor, padding: 20,
              height: 80*increaseHeight, margin: 5, borderRadius: 7
            }
          }>
          </View>
          <View style={
            {
              flex: 0.333, backgroundColor: viewBackgroundColor, padding: 20,
              height: 80*increaseHeight, margin: 5, borderRadius: 7
            }
          }>
          </View>
        </View>
      </View>
      <View>
        <View style={{ padding: 5, backgroundColor: '#adacac', flexDirection: 'row' }}>
          <View style={
            {
              flex: 1, backgroundColor: viewBackgroundColor, padding: 20,
              height: 130*increaseHeight, margin: 5, borderRadius: 7
            }
          }>
          </View>
        </View>
      </View>
      <View style={{ padding: 5, backgroundColor: 'white', flexDirection: 'row' }}>
        <View style={
          {
            flex: 0.25, backgroundColor: viewBackgroundColor, padding: 20,
            height: 100*increaseHeight, margin: 5, borderRadius: 7
          }
        }>
        </View>
        <View style={
          {
            flex: 0.25, backgroundColor: viewBackgroundColor, padding: 20,
            height: 100*increaseHeight, margin: 5, borderRadius: 7
          }
        }>
        </View>
        <View style={
          {
            flex: 0.25, backgroundColor: viewBackgroundColor, padding: 20,
            height: 100*increaseHeight, margin: 5, borderRadius: 7
          }
        }>
        </View>
        <View style={
          {
            flex: 0.25, backgroundColor: viewBackgroundColor, padding: 20,
            height: 100*increaseHeight, margin: 5, borderRadius: 7
          }
        }>
        </View>
      </View>
      <View>
        <View style={{ padding: 5, backgroundColor: '#adacac', flexDirection: 'row', }}>
          <View style={
            {
              backgroundColor: viewBackgroundColor, padding: 20, height: 50*increaseHeight, width: 50,
              margin: 5, borderRadius: 200,
            }
          }>
          </View>
          <View style={
            {
              backgroundColor: viewBackgroundColor, padding: 20, height: 50*increaseHeight, width: 50,
              margin: 5, borderRadius: 200,
            }
          }>
          </View>
          <View style={
            {
              backgroundColor: viewBackgroundColor, padding: 20, height: 50*increaseHeight, width: 50,
              margin: 5, borderRadius: 200,
            }
          }>
          </View>
          <View style={
            {
              backgroundColor: viewBackgroundColor, padding: 20, height: 50*increaseHeight, width: 50,
              margin: 5, borderRadius: 200,
            }
          }>
          </View>
          <View style={
            {
              backgroundColor: viewBackgroundColor, padding: 20, height: 50*increaseHeight, width: 50,
              margin: 5, borderRadius: 200,
            }
          }>
          </View>
          <View style={
            {
              backgroundColor: viewBackgroundColor, padding: 20, height: 50*increaseHeight, width: 50,
              margin: 5, borderRadius: 200,
            }
          }>
          </View>
          <View style={
            {
              backgroundColor: viewBackgroundColor, padding: 20, height: 50*increaseHeight, width: 50,
              margin: 5, borderRadius: 200,
            }
          }>
          </View>
        </View>

        <View>
        </View>
      </View>
      <View style={{ padding: 2, backgroundColor: 'white', flexDirection: 'row' }}>
        <View style={
          {
            flex: 0.27, backgroundColor: viewBackgroundColor, padding: 20,
            height: 120*increaseHeight, borderRadius: 7,
            margin:5
          }
        }>
        </View>
        <View style={
            {
              flex: 0.56, backgroundColor: viewBackgroundColor, padding: 20,
              height: 120*increaseHeight, borderRadius: 7,
              margin:5
            }
          }>
        </View>
        <View style={
            {
              flex: 0.27, backgroundColor: viewBackgroundColor, padding: 20,
              height: 120*increaseHeight, borderRadius: 7,
              margin:5
            }
          }>
        </View>
      </View>
      <View style={{ padding: 5, backgroundColor: '#adacac', flexDirection: 'row' }}>
        <View style={
          {
            flex: 1, backgroundColor: viewBackgroundColor, padding: 20,
            paddingBottom: 120*increaseHeight, borderRadius: 7
          }
        }>
        </View>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  progressBarContainer: {
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: 5,
  },
});

export default CustomProgressBar;