import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ScrollView, View } from 'react-native';
import { Button, ButtonGroup, Icon, Input, Text } from 'react-native-elements';

import { Styles } from "../Styles/AddGameCss";
import appColors from '../../Others/appColors.json'
import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from '@react-native-community/datetimepicker';

function AddGameAdmin() {

  const gameTypeArr = [
    { key: "Spin", label: "Spin" },
    { key: "Quiz", label: "Quiz" },
    { key: "Video & Quiz", label: "Video & Quiz" },
    { key: "Video & Spin", label: "Video & Spin" },
  ];

  const restrictionsArr = [
    { key: "None", label: "None" },
    { key: "> 18 Age", label: "> 18 Age" },
    { key: "Male", label: "Male" },
    { key: "Female", label: "Female" },
  ];

  const [userGameType, setUserGameType] = useState('Spin');
  const [userPriceAmount, setUserPriceAmount] = useState('');
  const [userEntranceAmount, setUserEntranceAmount] = useState('');
  const [userMaximumTicketsCanBuy, setUserMaximumTicketsCanBuy] = useState('');
  const [calenderUsedFor, setCalenderUsedFor] = useState('');
  const [userBookingStartDate, setUserBookingStartDate] = useState(new Date());
  const [userBookingStartTime, setUserBookingStartTime] = useState(new Date());
  const [userBookingEndDate, setUserBookingEndDate] = useState(new Date());
  const [userBookingEndTime, setUserBookingEndTime] = useState(new Date());
  const [userGameStartDate, setUserGameStartDate] = useState(new Date());
  const [userGameStartTime, setUserGameStartTime] = useState(new Date());
  const [userGameEndDate, setUserGameEndDate] = useState(new Date());
  const [userGameEndTime, setUserGameEndTime] = useState(new Date());
  const [userResultDate, setUserResultDate] = useState(new Date());
  const [userResultTime, setUserResultTime] = useState(new Date());
  const [userRestrictions, setUserRestrictions] = useState('None');
  const [userConditions, setUserConditions] = useState('');
  const [showRegisterButton, setShowRegisterButton] = useState(true);


  const [userGameTypeSuccessIcon, setUserGameTypeSuccessIcon] = useState('check');
  const [userGameTypeSuccessIconColor, setUserGameTypeSuccessIconColor] = useState('#238732');
  const [userPriceAmountSuccessIcon, setUserPriceAmountSuccessIcon] = useState('x');
  const [userPriceAmountSuccessIconColor, setUserPriceAmountSuccessIconColor] = useState('#8c0a1b');
  const [userEntranceAmountSuccessIcon, setUserEntranceAmountSuccessIcon] = useState('x');
  const [userEntranceAmountSuccessIconColor, setUserEntranceAmountSuccessIconColor] = useState('#8c0a1b');
  const [userMaximumTicketsCanBuySuccessIcon, setUserMaximumTicketsCanBuySuccessIcon] = useState('x');
  const [userMaximumTicketsCanBuySuccessIconColor, setUserMaximumTicketsCanBuySuccessIconColor] = useState('#8c0a1b');
  const [userBookingStartDateSuccessIcon, setUserBookingStartDateSuccessIcon] = useState('check');
  const [userBookingStartDateSuccessIconColor, setUserBookingStartDateSuccessIconColor] = useState('#238732');
  const [userBookingStartTimeSuccessIcon, setUserBookingStartTimeSuccessIcon] = useState('check');
  const [userBookingStartTimeSuccessIconColor, setUserBookingStartTimeSuccessIconColor] = useState('#238732');
  const [userBookingEndDateSuccessIcon, setUserBookingEndDateSuccessIcon] = useState('x');
  const [userBookingEndDateSuccessIconColor, setUserBookingEndDateSuccessIconColor] = useState('#8c0a1b');
  const [userBookingEndTimeSuccessIcon, setUserBookingEndTimeSuccessIcon] = useState('x');
  const [userBookingEndTimeSuccessIconColor, setUserBookingEndTimeSuccessIconColor] = useState('#8c0a1b');
  const [userGameStartDateSuccessIcon, setUserGameStartDateSuccessIcon] = useState('x');
  const [userGameStartDateSuccessIconColor, setUserGameStartDateSuccessIconColor] = useState('#8c0a1b');
  const [userGameStartTimeSuccessIcon, setUserGameStartTimeSuccessIcon] = useState('x');
  const [userGameStartTimeSuccessIconColor, setUserGameStartTimeSuccessIconColor] = useState('#8c0a1b');
  const [userGameEndDateSuccessIcon, setUserGameEndDateSuccessIcon] = useState('x');
  const [userGameEndDateSuccessIconColor, setUserGameEndDateSuccessIconColor] = useState('#8c0a1b');
  const [userGameEndTimeSuccessIcon, setUserGameEndTimeSuccessIcon] = useState('x');
  const [userGameEndTimeSuccessIconColor, setUserGameEndTimeSuccessIconColor] = useState('#8c0a1b');
  const [userResultDateSuccessIcon, setUserResultDateSuccessIcon] = useState('x');
  const [userResultDateSuccessIconColor, setUserResultDateSuccessIconColor] = useState('#8c0a1b');
  const [userResultTimeSuccessIcon, setUserResultTimeSuccessIcon] = useState('x');
  const [userResultTimeSuccessIconColor, setUserResultTimeSuccessIconColor] = useState('#8c0a1b');
  const [userRestrictionsSuccessIcon, setUserRestrictionsSuccessIcon] = useState('check');
  const [userRestrictionsSuccessIconColor, setUserRestrictionsSuccessIconColor] = useState('#238732');
  const [userConditionsSuccessIcon, setUserConditionsSuccessIcon] = useState('x');
  const [userConditionsSuccessIconColor, setUserConditionsSuccessIconColor] = useState('#8c0a1b');

  const [postSelectTextColor, setPostSelectTextColor] = useState('#ccc');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastContent, setToastContent] = useState('');

  const [showOvelayLoader, setShowOvelayLoader] = useState(false);
  const [ovelayLoaderContent, setOvelayLoaderContent] = useState('');

  Keyboard.addListener(
    'keyboardDidHide',
    () => {
      if (!showRegisterButton) {
        setShowRegisterButton(true);
      }
    }
  );

  Keyboard.addListener(
    'keyboardDidShow',
    () => {
      console.log("hi")
      if (showRegisterButton) {
        setShowRegisterButton(false);
      }
    }
  );


  useEffect(() => {
    if (userPriceAmount > 0) {
      setUserPriceAmountSuccessIcon('check');
      setUserPriceAmountSuccessIconColor('#238732');
    } else {
      setUserPriceAmountSuccessIcon('x');
      setUserPriceAmountSuccessIconColor('#8c0a1b');
    }
    if (userEntranceAmount > 0 && userPriceAmount / 10 >= userEntranceAmount) {
      setUserEntranceAmountSuccessIcon('check');
      setUserEntranceAmountSuccessIconColor('#238732');
    } else {
      setUserEntranceAmountSuccessIcon('x');
      setUserEntranceAmountSuccessIconColor('#8c0a1b');
    }
  }, [userPriceAmount, userEntranceAmount]);

  useEffect(() => {
    if (userMaximumTicketsCanBuy > 0) {
      setUserMaximumTicketsCanBuySuccessIcon('check');
      setUserMaximumTicketsCanBuySuccessIconColor('#238732');
    } else {
      setUserMaximumTicketsCanBuySuccessIcon('x');
      setUserMaximumTicketsCanBuySuccessIconColor('#8c0a1b');
    }
  }, [userMaximumTicketsCanBuy]);

  useEffect(() => {
    if (userConditions.length >= 4) {
      setUserConditionsSuccessIcon('check');
      setUserConditionsSuccessIconColor('#238732');
    } else {
      setUserConditionsSuccessIcon('x');
      setUserConditionsSuccessIconColor('#8c0a1b');
    }
  }, [userConditions]);

  useEffect(() => {

    const [day1, month1, year1] = userBookingStartDate.toLocaleDateString().split('/');
    const [hours1, minutes1, seconds1] = userBookingStartTime.toTimeString().split(/[ :]/);
    const bookingStartDateTime = new Date(year1, month1 - 1, day1, hours1, minutes1, seconds1);
    const [day2, month2, year2] = userBookingEndDate.toLocaleDateString().split('/');
    const [hours2, minutes2, seconds2] = userBookingEndTime.toTimeString().split(/[ :]/);
    const bookingEndDateTime = new Date(year2, month2 - 1, day2, hours2, minutes2, seconds2);
    const [day3, month3, year3] = userGameStartDate.toLocaleDateString().split('/');
    const [hours3, minutes3, seconds3] = userGameStartTime.toTimeString().split(/[ :]/);
    const gameStartDateTime = new Date(year3, month3 - 1, day3, hours3, minutes3, seconds3);
    const [day4, month4, year4] = userGameEndDate.toLocaleDateString().split('/');
    const [hours4, minutes4, seconds4] = userGameEndTime.toTimeString().split(/[ :]/);
    const gameEndDateTime = new Date(year4, month4 - 1, day4, hours4, minutes4, seconds4);
    const [day5, month5, year5] = userResultDate.toLocaleDateString().split('/');
    const [hours5, minutes5, seconds5] = userResultTime.toTimeString().split(/[ :]/);
    const resultDateTime = new Date(year5, month5 - 1, day5, hours5, minutes5, seconds5);

    if (userBookingStartDate.toLocaleDateString() <= userBookingEndDate.toLocaleDateString()) {
      setUserBookingEndDateSuccessIcon('check');
      setUserBookingEndDateSuccessIconColor('#238732');
    } else {
      setUserBookingEndDateSuccessIcon('x');
      setUserBookingEndDateSuccessIconColor('#8c0a1b');
    }
    if (bookingStartDateTime < bookingEndDateTime) {
      setUserBookingEndTimeSuccessIcon('check');
      setUserBookingEndTimeSuccessIconColor('#238732');
    } else {
      setUserBookingEndTimeSuccessIcon('x');
      setUserBookingEndTimeSuccessIconColor('#8c0a1b');
    }
    if (userBookingEndDate.toLocaleDateString() <= userGameStartDate.toLocaleDateString()) {
      setUserGameStartDateSuccessIcon('check');
      setUserGameStartDateSuccessIconColor('#238732');
    } else {
      setUserGameStartDateSuccessIcon('x');
      setUserGameStartDateSuccessIconColor('#8c0a1b');
    }
    if (bookingEndDateTime < gameStartDateTime) {
      setUserGameStartTimeSuccessIcon('check');
      setUserGameStartTimeSuccessIconColor('#238732');
    } else {
      setUserGameStartTimeSuccessIcon('x');
      setUserGameStartTimeSuccessIconColor('#8c0a1b');
    }
    if (userGameStartDate.toLocaleDateString() <= userGameEndDate.toLocaleDateString()) {
      setUserGameEndDateSuccessIcon('check');
      setUserGameEndDateSuccessIconColor('#238732');
    } else {
      setUserGameEndDateSuccessIcon('x');
      setUserGameEndDateSuccessIconColor('#8c0a1b');
    }
    if (gameStartDateTime < gameEndDateTime) {
      setUserGameEndTimeSuccessIcon('check');
      setUserGameEndTimeSuccessIconColor('#238732');
    } else {
      setUserGameEndTimeSuccessIcon('x');
      setUserGameEndTimeSuccessIconColor('#8c0a1b');
    }
    if (userGameEndDate.toLocaleDateString() <= userResultDate.toLocaleDateString()) {
      setUserResultDateSuccessIcon('check');
      setUserResultDateSuccessIconColor('#238732');
    } else {
      setUserResultDateSuccessIcon('x');
      setUserResultDateSuccessIconColor('#8c0a1b');
    }
    if (gameEndDateTime < resultDateTime) {
      setUserResultTimeSuccessIcon('check');
      setUserResultTimeSuccessIconColor('#238732');
    } else {
      setUserResultTimeSuccessIcon('x');
      setUserResultTimeSuccessIconColor('#8c0a1b');
    }


  }, [userBookingStartDate, userBookingStartTime, userBookingEndDate, userBookingEndTime, userGameStartDate,
    userGameStartTime, userGameEndDate, userGameEndTime, userResultDate, userResultTime]);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined && event.type === 'set') {
      setShowDatePicker(Platform.OS === 'ios');
      if (calenderUsedFor === "Booking Start Date") {
        setUserBookingStartDate(date);
      } else if (calenderUsedFor === "Booking End Date") {
        setUserBookingEndDate(date);
      } else if (calenderUsedFor === "Game Start Date") {
        setUserGameStartDate(date);
      } else if (calenderUsedFor === "Game End Date") {
        setUserGameEndDate(date);
      } else if (calenderUsedFor === "Result Date") {
        setUserResultDate(date);
      }
      // console.log(date)
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time !== undefined && event.type === 'set') {
      setShowTimePicker(Platform.OS === 'ios');
      const dateTime = new Date(time);
      dateTime.setSeconds(0);
      if (calenderUsedFor === "Booking Start Time") {
        setUserBookingStartTime(dateTime);
      } else if (calenderUsedFor === "Booking End Time") {
        setUserBookingEndTime(dateTime);
      } else if (calenderUsedFor === "Game Start Time") {
        setUserGameStartTime(dateTime);
      } else if (calenderUsedFor === "Game End Time") {
        setUserGameEndTime(dateTime);
      } else if (calenderUsedFor === "Result Time") {
        setUserResultTime(dateTime);
      }
    }
  };

  const handleSubmit = () => {

  }


  return (
    <View>
      {isToastVisible && <CustomToast content={toastContent} handleToastVisible={() => setIsToastVisible(false)} />}
      {showOvelayLoader && <OverlayLoader content={ovelayLoaderContent} />}
      <ScrollView
      >
        <View>
          <TouchableWithoutFeedback >
            <View>
              <View style={Styles.container}>
                {/* <FirebaseRecaptchaVerifierModal
                                    ref={recaptchaVerifier}
                                    firebaseConfig={app.options}
                                    attemptInvisibleVerification='true'
                                /> */}

                <Text style={Styles.postText}>Game Type</Text>
                <ModalSelector
                  style={Styles.selectPost}
                  data={gameTypeArr}
                  onChange={(option) => {
                    setUserGameType(option.label)
                  }}
                >
                  <View style={Styles.selectModelInput}>
                    <View style={Styles.selectModelInputInner}>
                      <Icon name="gamepad" type='font-awesome' color={appColors.basicRed} />
                      <Text style={[Styles.selectModelOption]}>
                        {userGameType}
                      </Text>
                    </View>
                    <Icon name={userGameTypeSuccessIcon} type='feather' color={userGameTypeSuccessIconColor} />
                  </View>

                </ModalSelector>

                <Input placeholder="Price Amount ( ₹ )..."
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='Price ( ₹ )'
                  labelStyle={Styles.lableStyle}
                  keyboardType='numeric'
                  leftIcon={<Icon name="dollar-sign" type='feather' color={appColors.basicRed} />}
                  onChangeText={(text) => setUserPriceAmount(text)}
                  value={userPriceAmount}
                  rightIcon={<Icon name={userPriceAmountSuccessIcon} type="feather" color={userPriceAmountSuccessIconColor} />}
                />

                <Input placeholder="Entrance Amount ( ₹ )..."
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='Entrance ( ₹ )'
                  labelStyle={Styles.lableStyle}
                  keyboardType='numeric'
                  leftIcon={<Icon name="dollar-sign" type='feather' color={appColors.basicRed} />}
                  onChangeText={(text) => setUserEntranceAmount(text)}
                  value={userEntranceAmount}
                  rightIcon={<Icon name={userEntranceAmountSuccessIcon} type="feather" color={userEntranceAmountSuccessIconColor} />}
                />

                <Input placeholder="Maximum Tickets can buy..."
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='Maximum Tickets Can Buy'
                  labelStyle={Styles.lableStyle}
                  keyboardType='numeric'
                  leftIcon={<Icon name="dollar-sign" type='feather' color={appColors.basicRed} />}
                  onChangeText={(text) => setUserMaximumTicketsCanBuy(text)}
                  value={userMaximumTicketsCanBuy}
                  rightIcon={<Icon name={userMaximumTicketsCanBuySuccessIcon} type="feather" color={userMaximumTicketsCanBuySuccessIconColor} />}
                />

                {showDatePicker &&
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    is24Hour={true}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />}

                {showTimePicker &&
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    maximumDate={new Date()}
                    onChange={handleTimeChange}
                  />}

                <Text style={Styles.textComponetStyle}>Booking Starting Date</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowDatePicker(true);
                    setCalenderUsedFor("Booking Start Date");
                  }}
                  style={Styles.userDOBContainer}>
                  <Icon name='calendar' type='feather' color={appColors.basicRed} />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userBookingStartDate.toDateString()}
                    </Text>
                  </View>
                  <Icon name={userBookingStartDateSuccessIcon} type="feather" color={userBookingStartDateSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Booking Starting Time</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowTimePicker(true);
                    setCalenderUsedFor("Booking Start Time");
                  }
                  }
                  style={Styles.userDOBContainer}>
                  <Icon name="schedule" type='material' color={appColors.basicRed}
                  />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userBookingStartTime.toLocaleTimeString()}
                    </Text>
                  </View>
                  <Icon name={userBookingStartTimeSuccessIcon} type="feather" color={userBookingStartTimeSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Booking End Date</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowDatePicker(true);
                    setCalenderUsedFor("Booking End Date");
                  }}
                  style={Styles.userDOBContainer}>
                  <Icon name="calendar" type='feather' color={appColors.basicRed} />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userBookingEndDate.toDateString()}
                    </Text>
                  </View>
                  <Icon name={userBookingEndDateSuccessIcon} type="feather" color={userBookingEndDateSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Booking End Time</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowTimePicker(true);
                    setCalenderUsedFor("Booking End Time");
                  }
                  }
                  style={Styles.userDOBContainer}>
                  <Icon name="schedule" type='material' color={appColors.basicRed}
                  />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userBookingEndTime.toLocaleTimeString()}
                    </Text>
                  </View>
                  <Icon name={userBookingEndTimeSuccessIcon} type="feather" color={userBookingEndTimeSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Game Starting Date</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowDatePicker(true);
                    setCalenderUsedFor("Game Start Date");
                  }}
                  style={Styles.userDOBContainer}>
                  <Icon name="calendar" type='feather' color={appColors.basicRed} />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userGameStartDate.toDateString()}
                    </Text>
                  </View>
                  <Icon name={userGameStartDateSuccessIcon} type="feather" color={userGameStartDateSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Game Start Time</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowTimePicker(true);
                    setCalenderUsedFor("Game Start Time");
                  }
                  }
                  style={Styles.userDOBContainer}>
                  <Icon name="schedule" type='material' color={appColors.basicRed}
                  />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userGameStartTime.toLocaleTimeString()}
                    </Text>
                  </View>
                  <Icon name={userGameStartTimeSuccessIcon} type="feather" color={userGameStartTimeSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Game End Date</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowDatePicker(true);
                    setCalenderUsedFor("Game End Date");
                  }}
                  style={Styles.userDOBContainer}>
                  <Icon name="calendar" type='feather' color={appColors.basicRed} />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userGameEndDate.toDateString()}
                    </Text>
                  </View>
                  <Icon name={userGameEndDateSuccessIcon} type="feather" color={userGameEndDateSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Game End Time</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowTimePicker(true);
                    setCalenderUsedFor("Game End Time");
                  }
                  }
                  style={Styles.userDOBContainer}>
                  <Icon name="schedule" type='material' color={appColors.basicRed}
                  />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userGameEndTime.toLocaleTimeString()}
                    </Text>
                  </View>
                  <Icon name={userGameEndTimeSuccessIcon} type="feather" color={userGameEndTimeSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Result Date</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowDatePicker(true);
                    setCalenderUsedFor("Result Date");
                  }}
                  style={Styles.userDOBContainer}>
                  <Icon name="calendar" type='feather' color={appColors.basicRed} />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userResultDate.toDateString()}
                    </Text>
                  </View>
                  <Icon name={userResultDateSuccessIcon} type="feather" color={userResultDateSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.textComponetStyle}>Result Time</Text>
                <TouchableOpacity
                  onPressIn={() => {
                    setShowTimePicker(true);
                    setCalenderUsedFor("Result Time");
                  }
                  }
                  style={Styles.userDOBContainer}>
                  <Icon name="schedule" type='material' color={appColors.basicRed}
                  />
                  <View style={Styles.userDOBTextContainer}>
                    <Text style={Styles.userDOBText}>
                      {userResultTime.toLocaleTimeString()}
                    </Text>
                  </View>
                  <Icon name={userResultTimeSuccessIcon} type="feather" color={userResultTimeSuccessIconColor} />
                </TouchableOpacity>

                <Text style={Styles.postText}>Restrictions</Text>
                <ModalSelector
                  style={Styles.selectPost}
                  data={restrictionsArr}
                  onChange={(option) => {
                    setUserRestrictions(option.label)
                  }}
                >
                  <TouchableOpacity style={Styles.selectModelInput}>
                    <View style={Styles.selectModelInputInner}>
                      <Icon name='family-restroom' type='material' color={appColors.basicRed} />
                      <Text style={[Styles.selectModelOption]}>
                        {userRestrictions}
                      </Text>
                    </View>
                    <Icon name={userRestrictionsSuccessIcon} type='material' color={userRestrictionsSuccessIconColor} />
                  </TouchableOpacity>
                </ModalSelector>

                <Input placeholder="Conditions..."
                  style={Styles.input}
                  inputContainerStyle={Styles.inputContainer}
                  label='Conditions'
                  labelStyle={Styles.lableStyle}
                  leftIcon={<Icon name="policy" type='material' color={appColors.basicRed} />}
                  onChangeText={(text) => setUserConditions(text)}
                  value={userConditions}
                  rightIcon={<Icon name={userConditionsSuccessIcon} type="feather" color={userConditionsSuccessIconColor} />}
                />

              </View>

              {/* <BottomSheet isVisible={isVisibleBottomSheet}>
                                {bottomSheetList.map((l, i) => (
                                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                        <Icon name={l.icon} type='feather' color={l.iconColor}></ Icon>
                                        <ListItem.Content con={{ display: 'flex', alignContent: 'flex-end' }}>
                                            <ListItem.Title style={[l.titleStyle]}>{l.title}</ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                ))}
                            </BottomSheet> */}
            </View>
          </TouchableWithoutFeedback>

        </View>
      </ScrollView>

      {showRegisterButton &&
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={Styles.buttonViewContainer} >
            <Button title='REGISTER'
              icon={<Icon name='arrow-right' type='feather' color='white' style={Styles.buttonIcon} />}
              iconPosition='right'
              loading={false} buttonStyle={Styles.button}
              onPress={handleSubmit}
              containerStyle={Styles.buttonContainer}
            />
          </View>
        </TouchableWithoutFeedback>
      }

    </View>
  )
}

export default AddGameAdmin;