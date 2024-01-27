import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Keyboard, KeyboardAvoidingView, Linking, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Input, Text } from "react-native-elements";
import { Provider } from "react-native-paper";

import appColors from '../../Others/appColors.json'
import { Appbar } from "react-native-paper";

import { Styles } from "../../Styles/IndexScreens/InviteCss";
import { phoneEncoderForReferal } from "../../Security/Encoder";
import { phoneDecoderForReferal } from "../../Security/Decoder";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

import SendIntentAndroid from "react-native-send-intent";
import CustomToast from "../Features/CustomToast";

import * as Contacts from 'expo-contacts';
import { useNavigation } from "@react-navigation/native";

import { getColorCode } from "../../Others/Basics";

const Invite = (props) => {

  const [referalCode, setReferalCode] = useState('');
  const [dummyReferalCode, setDummyReferalCode] = useState('');
  const [contacts, setContacts] = useState([]);

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastContent, setToastContent] = useState(false);


  const [showPhoneNumberContainer, setShowPhoneNumberContainer] = useState(false);

  const scrollViewRef = useRef();

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    setReferalCode(phoneEncoderForReferal('6317635478'));
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });

        if (data.length > 0) {
          // console.log(data)
          setContacts(data);
        }
      }
    })();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {

      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // console.log(showPhoneNumberContainer);
      }
    );

    // // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };


  }, []);

  useEffect(() => {
    setShowPhoneNumberContainer(false);
  }, [props])

  useEffect(() => {
    setDummyReferalCode(changeReferalCode(referalCode))
  }, [referalCode])

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const Toast = (message, errorStatus = true, timeout = 2500, position = 'top') => {
    let content = { "message": message, "errorStatus": errorStatus, "timeout": timeout, "position": position };
    setToastContent(content);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, timeout);
  }

  const changeReferalCode = (code) => {
    let str = ''
    for (let i = 0; i < 10; i++) {
      if (i !== 9) {
        str += code[i] + " ";
      } else {
        str += code[i];
      }
    }
    return str
  }

  const sendWhatsappMessage = () => {
    let msg = "Hey!\nRefer your friend to get exiting rewards/\nDownload the app now by using the following link:";
    let phoneWithCountryCode = "+916379185147";

    let mobile = Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            Toast("Make sure WhatsApp installed on your device");
          });
      } else {
        Toast("Please insert message to send");
      }
    } else {
      Toast("Please insert mobile no");
    }
  }

  useEffect(() => {
    if (showPhoneNumberContainer) {
      handleScrollToTop();
    }
  }, [showPhoneNumberContainer])

  const getInitials = (name) => {
    const words = name.split(' ');
    const validWords = words.filter((word) => /^[a-zA-Z0-9,.!@#$%^&*()-_+=\s]+$/.test(word));
    const newWords = validWords.map((word) => word[0]).join('');
    const finalWord = newWords[0] + newWords[newWords.length - 1];
    return finalWord;
  };

  

  return (
    <Provider>
      <Appbar.Header style={{ backgroundColor: appColors.basicRed }}>
        <Appbar.Content title="Invite & Get Rewards" color='white' />
      </Appbar.Header>
      <KeyboardAvoidingView >
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {!showPhoneNumberContainer &&
              <View>
                  <Button
                    title='Add Connection Directly'
                    icon={<Icon name="arrow-right" type="feather" color='white' iconStyle={Styles.addConnectionIcon} />}
                    iconPosition="right"
                    buttonStyle={Styles.addConnectionDirectlyButton}
                    titleStyle={Styles.addConnectionDirectlyButtonTitle}
                  />

                  <Text style={Styles.inviteText}>Invite & Earn</Text>
                  <Button
                    title={dummyReferalCode}
                    icon={
                      <Icon name='copy' type="feather" color={appColors.basicRed} iconStyle={Styles.copyReferalIcon} />
                    }
                    iconPosition="right"
                    buttonStyle={Styles.referalCodeButton}
                    titleStyle={Styles.referalCodeButtonTitle}
                  />
                  <Text style={Styles.clicktoCopyCodeText}>( Click to copy the code )</Text>
                  <Text style={Styles.referalCodeText}>Referal Code</Text>

                  {/* <Text style={Styles.orText}>(or)</Text>
                  <Button
                    title='Refer via WhatsApp'
                    icon={
                      <Icon name='whatsapp' type="font-awesome" color='white' iconStyle={Styles.whatsappIcon} />
                    }
                    buttonStyle={Styles.whatsappButton}
                    titleStyle={Styles.whatsappButtonTitle}
                    onPress={() => sendWhatsappMessage()}
                  /> */}

                  {/* <Text style={Styles.orText}>(or)</Text> */}

                  <Input
                    placeholder="Search Name or Mobile No."
                    style={Styles.input}
                    inputContainerStyle={Styles.inputContainer}
                    leftIcon={<Icon name='search' type='feather' color='#c5c7c7' style={Styles.inputIcon} />}
                    onFocus={() => setShowPhoneNumberContainer(true)}
                  />

                {contacts.map((contact) => (
                  contact.phoneNumbers &&
                  (

                    <View key={contact.id} style={Styles.phoneViewContainer}>
                      {
                        contact.imageAvailable ?
                          <Image
                            source={{ uri: contact.image.uri }} // Replace with the actual image source
                            style={{...Styles.phoneViewImage}} // Adjust the width and height as needed
                          /> :
                          <Text style={{...Styles.phoneViewImageText,backgroundColor:getColorCode()}}>
                            {getInitials(contact.name)}</Text>
                      }
                      <View style={Styles.phoneViewNameOuterContainer}>
                        <View style={Styles.phoneViewNameInnerContainer}>
                          <Text style={Styles.phoneViewNameText} numberOfLines={1}>{contact.name}
                          </Text>
                          <Text style={Styles.phoneViewPhoneText}>{contact.phoneNumbers[0].number.replace(/\s/g, '')}</Text>
                        </View>
                          <View style={Styles.phoneViewIcon}>
                            <Icon name="whatsapp" type='font-awesome' color={appColors.basicRed}/>
                          </View>
                      </View>
                    </View>)
                ))}

              </View>
            }
            {showPhoneNumberContainer &&
              <View>
                <Input
                    placeholder="Search Name or Mobile No."
                    style={Styles.input}
                    inputContainerStyle={Styles.inputContainer}
                    leftIcon={<Icon name='search' type='feather' color='#c5c7c7' style={Styles.inputIcon} />}
                    onFocus={() => setShowPhoneNumberContainer(true)}
                  />

                {contacts.map((contact) => (
                  contact.phoneNumbers &&
                  (

                    <View key={contact.id} style={Styles.phoneViewContainer}>
                      {
                        contact.imageAvailable ?
                          <Image
                            source={{ uri: contact.image.uri }} // Replace with the actual image source
                            style={{...Styles.phoneViewImage}} // Adjust the width and height as needed
                          /> :
                          <Text style={{...Styles.phoneViewImageText,backgroundColor:getColorCode()}}>
                            {getInitials(contact.name)}</Text>
                      }
                      <View style={Styles.phoneViewNameOuterContainer}>
                        <View style={Styles.phoneViewNameInnerContainer}>
                          <Text style={Styles.phoneViewNameText} numberOfLines={1}>{contact.name}
                          </Text>
                          <Text style={Styles.phoneViewPhoneText}>{contact.phoneNumbers[0].number.replace(/\s/g, '')}</Text>
                        </View>
                          <View style={Styles.phoneViewIcon}>
                            <Icon name="whatsapp" type='font-awesome' color={appColors.basicRed}/>
                          </View>
                      </View>
                    </View>)
                ))}
              </View>
            }
          </TouchableWithoutFeedback>


        </ScrollView>

      </KeyboardAvoidingView>
    </Provider>

  )
}

export default Invite
