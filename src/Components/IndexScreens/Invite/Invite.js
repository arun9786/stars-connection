import React, { useEffect, useRef, useState } from "react";
import { Animated, Clipboard, FlatList, Keyboard, KeyboardAvoidingView, Linking, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Input, Text } from "react-native-elements";
import { Provider } from "react-native-paper";

import appColors from '../../../Others/appColors.json'
import { Appbar } from "react-native-paper";

import { Styles } from "../../../Styles/IndexScreens/Invite/InviteCss";
import { phoneEncoderForReferal } from "../../../Security/Encoder";
import { phoneDecoderForReferal } from "../../../Security/Decoder";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

import SendIntentAndroid from "react-native-send-intent";
import CustomToast from "../../Features/CustomToast";

import * as Contacts from 'expo-contacts';
import { useNavigation } from "@react-navigation/native";

import { getColorCode } from "../../../Others/Basics";
import { useSelector } from "react-redux";
import { mobileRegex } from "../../../Others/Regex";

const Invite = (props) => {

  const navigation = useNavigation();
  const userPersonalDataRedux = useSelector((state) => state.UserProfileReducer.personal);
  let userPhone='';
  if(userPersonalDataRedux){
    userPhone = userPersonalDataRedux.Phone;
  }

  const [referalCode, setReferalCode] = useState('');
  const [dummyReferalCode, setDummyReferalCode] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [copyIconName, setCopyIconName] = useState('copy');

  const [phoneIn, setPhoneIn] = useState('');

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastContent, setToastContent] = useState(false);


  const [showPhoneNumberContainer, setShowPhoneNumberContainer] = useState(false);
  const [showScrolltoTop, setShowScrolltoTop] = useState(false);

  const inputRef = useRef();
  const scrollViewRef = useRef();

  const scrollY = useRef(new Animated.Value(0)).current;

  Keyboard.addListener(
    'keyboardDidHide',
    () => {
      if (showPhoneNumberContainer) {
        setShowPhoneNumberContainer(false);
      }
    }
  );

  const handleScroll = (event) => {
    if(event.nativeEvent.contentOffset.y > 200 && showPhoneNumberContainer){
      setShowScrolltoTop(true);
    }else{
      setShowScrolltoTop(false);
    }
  }

  const scrollToTop = () => {
    setShowScrolltoTop(false);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  useEffect(() => {
    if(mobileRegex.test(userPhone))
    {
      setReferalCode(phoneEncoderForReferal(userPhone));
    }
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
        console.log("show")
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setShowPhoneNumberContainer(false);
  }, [props]);

  useEffect(() => {
    setDummyReferalCode(changeReferalCode(referalCode))
  }, [referalCode])

  useEffect(() => {
    if (showPhoneNumberContainer) {
      scrollToTop();
    }
  }, [showPhoneNumberContainer])

  useEffect(() => {
    console.log(phoneIn);
    setFilteredContacts(contacts.filter(contact => contact.phoneNumbers && (contact.name.toLocaleLowerCase().includes(phoneIn.trim().toLocaleLowerCase()) || contact.phoneNumbers[0].number.replace(/\s/g, '').includes(phoneIn.trim().toLocaleLowerCase()))));
  }, [contacts, phoneIn])


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

  const getInitials = (name) => {
    const words = name.split(' ');
    const validWords = words.filter((word) => /^[a-zA-Z0-9,.!@#$%^&*()-_+=\s]+$/.test(word));
    const newWords = validWords.map((word) => word[0]).join('');
    const finalWord = newWords[0] + newWords[newWords.length - 1];
    return finalWord;
  };

  const copyReferalCode = () => {
    Clipboard.setString(referalCode);
    setCopyIconName('check');
    setIsToastVisible(true);
    Toast('Referal code is copied!', false)
    const interval = setTimeout(() => {
      setCopyIconName('copy');
    }, 3000);
    return () => clearTimeout(interval);
  }

  const sendWhatsappMessage = (phone) => {
    let phoneWithCountryCode = phone
    if (phone && !phone.includes('+91')) {
      phoneWithCountryCode = ("+91") + phone;
    }
    console.log(phoneWithCountryCode);
    let msg = "Hey!\nRefer your friend to get exiting rewards/\nDownload the app now by using the following link:";

    let mobile = Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url='';
        if(phoneWithCountryCode){
          url = "whatsapp://send?text=" + msg + "&phone=" + phoneWithCountryCode;
        }else{
          url = "whatsapp://send?text=" + msg;
        }
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

  const openAddConnectionPage=()=>{
    navigation.navigate('Invite Add Connection');
  }


  return (
    <Provider>
      <Appbar.Header style={{ backgroundColor: appColors.basicRed }}>
        <Appbar.Content title="Invite & Get Rewards" color='white' />
        <View style={Styles.headeraddUsersIcon}>
          <Icon name='user-plus' type="feather" color='white' onPress={()=>openAddConnectionPage()}/>
        </View>
        <View style={Styles.headerWhatsappIcon}>
          <Icon name='whatsapp' type='font-awesome' color='white' onPress={()=>sendWhatsappMessage(undefined)}/>
        </View>
        <View style={Styles.headerSearchIcon}>
          <Icon name='search' type='feather' color='white' onPress={() => setShowPhoneNumberContainer(true)} />
        </View>
      </Appbar.Header>
      <View style={Styles.container}>
        {isToastVisible && <CustomToast content={toastContent} handleToastVisible={() => setIsToastVisible(false)} />}

        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {!showPhoneNumberContainer &&
              <View >
                <Button
                  title='Add Connection Directly'
                  icon={<Icon name="arrow-right" type="feather" color='white' iconStyle={Styles.addConnectionIcon} />}
                  iconPosition="right"
                  buttonStyle={Styles.addConnectionDirectlyButton}
                  titleStyle={Styles.addConnectionDirectlyButtonTitle}
                  onPress={()=>openAddConnectionPage()}
                />

                <Text style={Styles.inviteText}>Invite & Earn</Text>
                <Button
                  title={dummyReferalCode}
                  icon={
                    <Icon name={copyIconName} type="feather" color={appColors.basicRed} iconStyle={Styles.copyReferalIcon} />
                  }
                  iconPosition="right"
                  buttonStyle={Styles.referalCodeButton}
                  titleStyle={Styles.referalCodeButtonTitle}
                  onPress={() => copyReferalCode()}
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
                  focusable={false}
                  onBlur={() => console.log("on Blur")}
                  onChangeText={(text) => setPhoneIn(text)}
                  value={phoneIn}
                  onPressIn={() => setShowPhoneNumberContainer(true)}
                />

                {filteredContacts.map((contact) => (
                  (
                    <TouchableOpacity key={contact.id} onPress={() => sendWhatsappMessage(contact.phoneNumbers[0].number.replace(/\s/g, ''))}>
                      <View style={Styles.phoneViewContainer}  >
                        {
                          contact.imageAvailable ?
                            <Image
                              source={{ uri: contact.image.uri }} // Replace with the actual image source
                              style={{ ...Styles.phoneViewImage }} // Adjust the width and height as needed
                            /> :
                            <Text style={{ ...Styles.phoneViewImageText, backgroundColor: getColorCode() }}>
                              {getInitials(contact.name)}</Text>
                        }
                        <View style={Styles.phoneViewNameOuterContainer}>
                          <View style={Styles.phoneViewNameInnerContainer}>
                            <Text style={Styles.phoneViewNameText} numberOfLines={1}>{contact.name}
                            </Text>
                            <Text style={Styles.phoneViewPhoneText}>{contact.phoneNumbers[0].number.replace(/\s/g, '')}</Text>
                          </View>
                          <View style={Styles.phoneViewIcon}>
                            <Icon name="whatsapp" type='font-awesome' color={appColors.basicRed} />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>)

                ))}

              </View>
            }
            {showPhoneNumberContainer &&
              <View style={{ marginTop: 100 }}>
                {filteredContacts.map((contact) => (
                  (
                    <TouchableOpacity key={contact.id} onPress={() => sendWhatsappMessage(contact.phoneNumbers[0].number.replace(/\s/g, ''))}>
                      <View style={Styles.phoneViewContainer} >
                        {
                          contact.imageAvailable ?
                            <Image
                              source={{ uri: contact.image.uri }}
                              style={{ ...Styles.phoneViewImage }}
                            /> :
                            <Text style={{ ...Styles.phoneViewImageText, backgroundColor: getColorCode() }}>
                              {getInitials(contact.name)}</Text>
                        }
                        <View style={Styles.phoneViewNameOuterContainer}>
                          <View style={Styles.phoneViewNameInnerContainer}>
                            <Text style={Styles.phoneViewNameText} numberOfLines={1}>{contact.name}
                            </Text>
                            <Text style={Styles.phoneViewPhoneText}>{contact.phoneNumbers[0].number.replace(/\s/g, '')}</Text>
                          </View>
                          <View style={Styles.phoneViewIcon}>
                            <Icon name="whatsapp" type='font-awesome' color={appColors.basicRed} />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                ))}
              </View>
            }
          </TouchableWithoutFeedback>
        </ScrollView>
        {showPhoneNumberContainer &&

          <Input
            placeholder="Search Name or Mobile No."
            style={Styles.input}
            inputContainerStyle={Styles.inputContainer}
            leftIcon={<Icon name='search' type='feather' color='#c5c7c7' style={Styles.inputIcon} />}
            onChangeText={(text) => setPhoneIn(text)}
            value={phoneIn}
            containerStyle={{ position: 'absolute', top: 0, right: 0, zIndex: 1, backgroundColor: 'white' }}
            ref={inputRef}
            autoFocus={showPhoneNumberContainer}
            onFocus={() => setShowPhoneNumberContainer(true)}
            onBlur={() => setShowPhoneNumberContainer(false)}
          />
        }
        {showScrolltoTop && 
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 100,
            right: '32%',
            left: '32%',
            backgroundColor: 'rgba(48, 48, 48, 0.8)',
            padding: 8,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}
          onPress={scrollToTop}
        >
          <Icon name="arrow-up" type="feather" color='white'/>
          <Text style={{color:'white', marginLeft:7,}}>Back to top</Text>

        </TouchableOpacity>

        }
      </View>
    </Provider>

  )
}

export default Invite
