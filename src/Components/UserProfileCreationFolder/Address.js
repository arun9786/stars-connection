import { View, Text, Keyboard, Pic, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { FAB, Icon, Input, LinearProgress, Overlay } from 'react-native-elements'

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { firestore } from "../../config/firebase";
import ModalSelector from 'react-native-modal-selector';

import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux';

import { Styles } from '../../Styles/UserProfileCreationFolder/AddressCss'
import { AddressDetailsFun } from '../../Redux/Slice/UserProfileSlice';


const Address = forwardRef((props, ref) => {

  const auth = getAuth();
  const dispatch = useDispatch();
  const userAddressDataRedux = useSelector((state) => state.UserProfileReducer.address);
  
  const [visibleMainComponent, setVisibleMainComponent] = useState(false);
  const [showFabRight, setShowFabRight] = useState(false);

  const [userPincode, setUserPincode] = useState('');
  const [userPlace, setUserPlace] = useState('');
  const [userPost, setUserPost] = useState('');
  const [userTaluk, setUserTaluk] = useState('');
  const [userDistrict, setUserDistrict] = useState('');
  const [userState, setUserState] = useState('');
  const [userCountry, setUserCountry] = useState('');

  const [userPincodeAddressArr, setUserPincodeAddressArr] = useState([]);
  const [userPincodePostOfficeArr, setUserPostOfficeArr] = useState([]);
  const [userPostDisabled, setUserPostDisabled] = useState(true);
  const [otherAddressPlaceholderMsg, setOtherAddressPlaceholderMsg] = useState('Please Enter Pincode')

  const [userPincodeSuccessIcon, setUserPincodeSuccessIcon] = useState('x');
  const [userPincodeSuccessIconColor, setUserPincodeSuccessIconColor] = useState('#8c0a1b');
  const [userPlaceSuccessIcon, setUserPlaceSuccessIcon] = useState('x');
  const [userPlaceSuccessIconColor, setUserPlaceSuccessIconColor] = useState('#8c0a1b');
  const [userPostSuccessIcon, setUserPostSuccessIcon] = useState('x');
  const [userPostSuccessIconColor, setUserPostSuccessIconColor] = useState('#8c0a1b');
  const [userTalukSuccessIcon, setUserTalukSuccessIcon] = useState('x');
  const [userTalukSuccessIconColor, setUserTalukSuccessIconColor] = useState('#8c0a1b');
  const [userDistrictSuccessIcon, setUserDistrictSuccessIcon] = useState('x');
  const [userDistrictSuccessIconColor, setUserDistrictSuccessIconColor] = useState('#8c0a1b');
  const [userStateSuccessIcon, setUserStateSuccessIcon] = useState('x');
  const [userStateSuccessIconColor, setUserStateSuccessIconColor] = useState('#8c0a1b');
  const [userCountrySuccessIcon, setUserCountrySuccessIcon] = useState('x');
  const [userCountrySuccessIconColor, setUserCountrySuccessIconColor] = useState('#8c0a1b');

  const [postSelectTextColor, setPostSelectTextColor] = useState('#ccc');
  const [userPincodeVerified, setUserPincodeVerified] = useState(false);
  const [pincodeVerifyOverlay, setPincodeVerifyOverlay] = useState(false);
  const [isUserDataAvailableParent, setIsUserDataAvailableParent] = useState(false);

  const pincodeRegex = /^\d{6}$/

  useEffect(() => {
    if (userAddressDataRedux) {
      setIsUserDataAvailableParent(true);
      setVisibleMainComponent(true);
    } else {
      setShowFabRight(false);
      setVisibleMainComponent(true);
    }
    if (userPincodeVerified) {
      setPostSelectTextColor('#000000')
    } else {
      setPostSelectTextColor('#ccc')
    }
  }, [])

  useEffect(() => {
    if (isUserDataAvailableParent) {
      const data = userAddressDataRedux;
      setUserPlace(data.Place);
      if (data.State.length > 0) {
        setUserPincode(data.Pincode);
        setUserPincodeSuccessIcon('check');
        setUserPincodeSuccessIconColor('#238732');
      } else {
        setUserPincode('');
        setUserPincodeSuccessIcon('x');
        setUserPincodeSuccessIconColor('#8c0a1b');
      }
      setUserPost(data.Post);
      setUserTaluk(data.Taluk);
      setUserDistrict(data.District);
      setUserState(data.State);
      setUserCountry(data.Country);
      setUserPincodeVerified(true);
    }
  }, [isUserDataAvailableParent])

  useEffect(() => {
    if (userPlace.length > 3) {
      setUserPlaceSuccessIcon('check');
      setUserPlaceSuccessIconColor('#238732');
    } else {
      setUserPlaceSuccessIcon('x');
      setUserPlaceSuccessIconColor('#8c0a1b');
    }
  }, [userPlace]);

  useEffect(() => {
    if (!isUserDataAvailableParent) {
      setUserPostOfficeArr([]);
      setUserPostDisabled(true);
      setPostSelectTextColor('#ccc')
      setUserPost("Please Enter Pincode")
      setOtherAddressPlaceholderMsg('Please Enter Pincode');
      setUserTaluk('');
      setUserDistrict('');
      setUserState('');
      setUserCountry('');
      setUserPostSuccessIcon('x');
      setUserPostSuccessIconColor('#8c0a1b');
      setUserTalukSuccessIcon('x');
      setUserTalukSuccessIconColor('#8c0a1b');
      setUserDistrictSuccessIcon('x');
      setUserDistrictSuccessIconColor('#8c0a1b');
      setUserStateSuccessIcon('x');
      setUserStateSuccessIconColor('#8c0a1b');
      setUserCountrySuccessIcon('x');
      setUserCountrySuccessIconColor('#8c0a1b')
      if (!userPincodeVerified) {
        if (pincodeRegex.test(userPincode)) {
          checkGivenPincodeStatus();
        } else {
          setUserPincodeSuccessIcon('x');
          setUserPincodeSuccessIconColor('#8c0a1b');
        }
      } else if (!pincodeRegex.test(userPincode)) {
        setUserPincodeVerified(false);
        if (pincodeRegex.test(userPincode)) {
          checkGivenPincodeStatus();
        } else {
          setUserPincodeSuccessIcon('x');
          setUserPincodeSuccessIconColor('#8c0a1b');
        }
      }
    }
  }, [userPincode]);

  useEffect(() => {
    if (userPlace.length > 3) {
      setUserPlaceSuccessIcon('check');
      setUserPlaceSuccessIconColor('#238732');
    } else {
      setUserPlaceSuccessIcon('x');
      setUserPlaceSuccessIconColor('#8c0a1b');
    }
  }, [userPlace]);

  useEffect(() => {
    console.log(userPost);
    if (userPost !== 'Please Enter Pincode' && userPost !== 'Please Select PostOffice') {
      setUserPostSuccessIcon('check');
      setUserPostSuccessIconColor('#238732');
    } else {
      setUserPostSuccessIcon('x');
      setUserPostSuccessIconColor('#8c0a1b');
    }
  }, [userPost]);

  useEffect(() => {
    if (userTaluk.length > 3) {
      setUserTalukSuccessIcon('check');
      setUserTalukSuccessIconColor('#238732');
    } else {
      setUserTalukSuccessIcon('x');
      setUserTalukSuccessIconColor('#8c0a1b');
    }
  }, [userTaluk]);

  useEffect(() => {
    if (userDistrict.length > 3) {
      setUserDistrictSuccessIcon('check');
      setUserDistrictSuccessIconColor('#238732');
    } else {
      setUserDistrictSuccessIcon('x');
      setUserDistrictSuccessIconColor('#8c0a1b');
    }
  }, [userDistrict]);

  useEffect(() => {
    if (userState.length > 3) {
      setUserStateSuccessIcon('check');
      setUserStateSuccessIconColor('#238732');
    } else {
      setUserStateSuccessIcon('x');
      setUserStateSuccessIconColor('#8c0a1b');
    }
  }, [userState]);

  useEffect(() => {
    if (userCountry.length > 3) {
      setUserCountrySuccessIcon('check');
      setUserCountrySuccessIconColor('#238732');
    } else {
      setUserCountrySuccessIcon('x');
      setUserStateSuccessIconColor('#8c0a1b');
    }
  }, [userCountry]);

  useEffect(() => {
    if (userPlace.length > 3 && userPincode.length > 0 && userPost.length > 0 && userTaluk.length > 0 &&
      userDistrict.length > 0 && userState.length > 0 && userCountry.length > 0) {
      setShowFabRight(true);
    } else {
      setShowFabRight(false);
    }
  }, [userPlace, userPincode, userPost, userTaluk]);


  const checkGivenPincodeStatus = () => {
    setPincodeVerifyOverlay(true);
    axios.get('https://api.postalpincode.in/pincode/' + userPincode)
      .then((response) => {
        if (response.status === 200 && response.data && response.data[0].Status === 'Success') {
          setUserPincodeAddressArr(response.data[0].PostOffice)
          setUserPincodeSuccessIcon('check');
          setUserPincodeSuccessIconColor('#238732');
          setUserPincodeVerified(true);
          setPincodeVerifyOverlay(false);

          const data = response.data[0].PostOffice.map((obj) => {
            return { key: obj.Name, label: obj.Name }
          })
          console.log(data);
          setUserPostOfficeArr(data)
          setUserPostDisabled(false);
          setPostSelectTextColor('#000000')
          setUserPost("Please Select PostOffice")
          setOtherAddressPlaceholderMsg('Please Select PostOffice')
        } else {
          setUserPincodeSuccessIcon('x');
          setUserPincodeSuccessIconColor('#8c0a1b');
          ToastAndroid.show("Invalid Pincode", ToastAndroid.LONG);
          setUserPincodeVerified(false);
          setPincodeVerifyOverlay(false);
        }
        console.log("response", response);
      })
      .catch((error) => {
        setUserPincodeSuccessIcon('x');
        setUserPincodeSuccessIconColor('#8c0a1b');
        setPincodeVerifyOverlay(false);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        setUserPincodeVerified(false);
        console.log("error", JSON.stringify(error.message));
      })
  }

  const postSelectedFromList = (option) => {
    setUserPost(option.label);
    for (let i = 0; i < userPincodeAddressArr.length; i++) {
      if (userPincodeAddressArr[i].Name === option.label) {
        setUserTaluk(userPincodeAddressArr[i].Block);
        setUserDistrict(userPincodeAddressArr[i].District);
        setUserState(userPincodeAddressArr[i].State);
        setUserCountry(userPincodeAddressArr[i].Country);
        setUserPostSuccessIcon('check');
        setUserPostSuccessIconColor('#238732');
        setUserTalukSuccessIcon('check');
        setUserTalukSuccessIconColor('#238732');
        setUserDistrictSuccessIcon('check');
        setUserDistrictSuccessIconColor('#238732');
        setUserStateSuccessIcon('check');
        setUserStateSuccessIconColor('#238732');
        setUserCountrySuccessIcon('check');
        setUserCountrySuccessIconColor('#238732');
      }
    }
  }

  const fabRightButtonFun=()=>{
    const data = {
      Place: userPlace,
      Pincode: userPincode,
      Post: userPost,
      Taluk: userTaluk,
      District: userDistrict,
      State: userState,
      Country: userCountry
    }
    dispatch(AddressDetailsFun(data));
    props.fabRightButtonFun();
  }

  const fabLeftButtonFun=()=>{
    props.fabLeftButtonFun();
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {
          !visibleMainComponent &&
          <LinearProgress color='primary' />
        }
        {visibleMainComponent &&
          <View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={Styles.contaier}>
                <Text style={Styles.pageTitle}>Address</Text>
                <Input
                  placeholder='Enter your place'
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='Place'
                  labelStyle={Styles.lableStyle}
                  value={userPlace}
                  onChangeText={(text) => setUserPlace(text)}
                  rightIcon={<Icon name={userPlaceSuccessIcon} type="feather" color={userPlaceSuccessIconColor} />}
                />

                <Input
                  placeholder='Enter 6 digit pincode'
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='Pincode'
                  keyboardType='numeric'
                  labelStyle={Styles.lableStyle}
                  value={userPincode}
                  onChangeText={(text) => { setUserPincode(text); setIsUserDataAvailableParent(false) }}
                  rightIcon={<Icon name={userPincodeSuccessIcon} type="feather" color={userPincodeSuccessIconColor} />}
                />

                <Text style={Styles.postText}>Post</Text>

                <ModalSelector
                  style={Styles.selectPost}
                  data={userPincodePostOfficeArr}
                  onChange={(option) => {
                    postSelectedFromList(option)
                  }}
                  disabled={userPostDisabled}
                >
                  <TouchableOpacity style={Styles.selectPostInput}>
                    <Text style={[Styles.selectPostOption, { color: postSelectTextColor }]}>
                      {userPost}
                    </Text>
                    <Icon name={userPostSuccessIcon} type='feather' color={userPostSuccessIconColor} />
                  </TouchableOpacity>

                </ModalSelector>

                <Input
                  placeholder={otherAddressPlaceholderMsg}
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='Taluk'
                  labelStyle={Styles.lableStyle}
                  value={userTaluk}
                  disabled={true}
                  rightIcon={<Icon name={userTalukSuccessIcon} type="feather" color={userTalukSuccessIconColor} />}
                />

                <Input
                  placeholder={otherAddressPlaceholderMsg}
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='District'
                  labelStyle={Styles.lableStyle}
                  value={userDistrict}
                  disabled={true}
                  rightIcon={<Icon name={userDistrictSuccessIcon} type="feather" color={userDistrictSuccessIconColor} />}
                />

                <Input
                  placeholder={otherAddressPlaceholderMsg}
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='State'
                  labelStyle={Styles.lableStyle}
                  value={userState}
                  disabled={true}
                  rightIcon={<Icon name={userStateSuccessIcon} type="feather" color={userStateSuccessIconColor} />}
                />

                <Input
                  placeholder={otherAddressPlaceholderMsg}
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='Country'
                  labelStyle={Styles.lableStyle}
                  value={userCountry}
                  disabled={true}
                  rightIcon={<Icon name={userCountrySuccessIcon} type="feather" color={userCountrySuccessIconColor} />}
                />

              </View>
            </TouchableWithoutFeedback>

            <Overlay isVisible={pincodeVerifyOverlay}>
              <View style={Styles.pincodeOverlayStyle}>
                <Text style={Styles.pincodeOverlayTitle}>Please wait...</Text>
                <Text style={Styles.pincodeOverlayMsg}>Verifying your pincode ({userPincode})</Text>
                <ActivityIndicator size="large" style={Styles.overlayActivityIndicator}
                  color='#2e4dbf' />
              </View>
            </Overlay>
          </View>
        }
      </ScrollView>
      <FAB placement='left'
        buttonStyle={{ backgroundColor: '#211c9e' }}
        icon={<Icon name='arrow-left' type='feather' color='white' />}
        visible={true}
        onPress={fabLeftButtonFun}
      />
      <FAB placement='right'
        buttonStyle={{ backgroundColor: '#211c9e' }}
        icon={<Icon name='arrow-right' type='feather' color='white' />}
        visible={showFabRight}
        onPress={fabRightButtonFun}
      />
    </View>
  )
})

export default Address;