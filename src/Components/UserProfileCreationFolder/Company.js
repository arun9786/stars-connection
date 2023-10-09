import { View, Text, Keyboard, FlatListComponent, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Button, CheckBox, FAB, Icon, Input, Overlay } from 'react-native-elements'
import { useState } from 'react';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import { Styles } from '../../Styles/UserProfileCreationFolder/CompanyCss';
import { CitiesFun } from '../../Redux/Slice/CitiesSlice';
import ModalSelector from 'react-native-modal-selector';

export default function Company(props) {

  const dispatch = useDispatch();
  const CitiesDataRedux = useSelector((state) => state.CitiesReducer.cities);

  const [isUserExperiencedCheckbox, setIsUserExperiencedCheckbox] = useState(true);
  const [currentCompanyInfo, setCurrentCompanyInfo] = useState(
    {
      companyName: '', joinedYear: '', joinedMonth: '', leaveYear: '', leaveMonth: '', position: '', location: '', workingHere: false,
      userJoinedYearSuccessIcon: 'x', userJoinedYearSuccessIconColor: 'red', userJoinedMonthSuccessIcon: 'x', userJoinedMonthSuccessIconColor: 'red',
      userLeaveYearSuccessIcon: 'x', userLeaveYearSuccessIconColor: 'red', userLeaveMonthSuccessIcon: 'x', userLeaveMonthSuccessIconColor: 'red',
      userPositionSuccessIcon: 'x', userPositionSuccessIconColor: 'red'
    }
  );
  const [pastCompanyInfo, setPastCompanyInfo] = useState([]);


  const [showFabRight, setShowFabRight] = useState(false);

  const yearsArray = [
    { key: '2000', label: '2000' },
    { key: '2001', label: '2001' },
    { key: '2002', label: '2002' },
    { key: '2003', label: '2003' },
    { key: '2004', label: '2004' },
    { key: '2005', label: '2005' },
    { key: '2006', label: '2006' },
    { key: '2007', label: '2007' },
    { key: '2008', label: '2008' },
    { key: '2009', label: '2009' },
    { key: '2010', label: '2010' },
    { key: '2011', label: '2011' },
    { key: '2012', label: '2012' },
    { key: '2013', label: '2013' },
    { key: '2014', label: '2014' },
    { key: '2015', label: '2015' },
    { key: '2016', label: '2016' },
    { key: '2017', label: '2017' },
    { key: '2018', label: '2018' },
    { key: '2019', label: '2019' },
    { key: '2020', label: '2020' },
    { key: '2021', label: '2021' },
    { key: '2022', label: '2022' },
    { key: '2023', label: '2023' },
    { key: '2024', label: '2024' },
    { key: '2025', label: '2025' },
    { key: '2026', label: '2026' },
    { key: '2027', label: '2027' },
    { key: '2028', label: '2028' },
    { key: '2029', label: '2029' },
    { key: '2030', label: '2030' },
  ];

  const monthsArray = [
    { key: 'Jan', label: 'Jan' },
    { key: 'Feb', label: 'Feb' },
    { key: 'Mar', label: 'Mar' },
    { key: 'Apr', label: 'Apr' },
    { key: 'May', label: 'May' },
    { key: 'Jun', label: 'Jun' },
    { key: 'Jul', label: 'Jul' },
    { key: 'Aug', label: 'Aug' },
    { key: 'Sep', label: 'Sep' },
    { key: 'Oct', label: 'Oct' },
    { key: 'Nov', label: 'Nov' },
    { key: 'Dec', label: 'Dec' }
  ];


  useEffect(() => {
    if (!CitiesDataRedux) {
      console.log("not exist");
      getAllCitiesFromApi();
    } else {
      console.log("exist");
    }
  }, []);

  useEffect(() => {
    if (!isUserExperiencedCheckbox) {
      setShowFabRight(true);
    } else {
      setShowFabRight(false);
    }

  }, [isUserExperiencedCheckbox])


  const addCompanyField = () => {
    setPastCompanyInfo([...pastCompanyInfo,
    {
      companyName: '', joinedYear: '', joinedMonth: '', leaveYear: '', leaveMonth: '', position: '', location: '', workingHere: false,
      userJoinedYearSuccessIcon: 'x', userJoinedYearSuccessIconColor: 'red', userJoinedMonthSuccessIcon: 'x', userJoinedMonthSuccessIconColor: 'red',
      userLeaveYearSuccessIcon: 'x', userLeaveYearSuccessIconColor: 'red', userLeaveMonthSuccessIcon: 'x', userLeaveMonthSuccessIconColor: 'red',
      userPositionSuccessIcon: 'x', userPositionSuccessIconColor: 'red', userLocationSuccessIcon: 'x', userLocationSuccessIconColor: 'red'
    }
    ]);
  };

  const handleInputChangeCurrentCompany = (text, field) => {
    const updatedCompanyInfo = [...pastCompanyInfo];
    updatedCompanyInfo[index][field] = text;
    checkEveryInputStatus(text, index, field, updatedCompanyInfo)
    setPastCompanyInfo(updatedCompanyInfo);
  };

  const handleInputChangePastCompany = (text, index, field) => {
    const updatedCompanyInfo = [...pastCompanyInfo];
    updatedCompanyInfo[index][field] = text;
    checkEveryInputStatus(text, index, field, updatedCompanyInfo)
    setPastCompanyInfo(updatedCompanyInfo);
  };

  const checkEveryInputStatus = (text, index, field, updatedCompanyInfo) => {
    if (field === 'joinedYear') {
      if (text !== '') {
        updatedCompanyInfo[index]['userJoinedYearSuccessIcon'] = 'check';
        updatedCompanyInfo[index]['userJoinedYearSuccessIconColor'] = '#238732';
      } else {
        updatedCompanyInfo[index]['userJoinedYearSuccessIcon'] = 'x';
        updatedCompanyInfo[index]['userJoinedYearSuccessIconColor'] = 'red';
      }
    } else if (field === 'joinedMonth') {
      if (text !== '') {
        updatedCompanyInfo[index]['userJoinedMonthSuccessIcon'] = 'check';
        updatedCompanyInfo[index]['userJoinedMonthSuccessIconColor'] = '#238732';
      } else {
        updatedCompanyInfo[index]['userJoinedMonthSuccessIcon'] = 'x';
        updatedCompanyInfo[index]['userJoinedMonthSuccessIconColor'] = 'red';
      }
    } else if (field === 'leaveYear') {
      if (text !== '') {
        updatedCompanyInfo[index]['userLeaveYearSuccessIcon'] = 'check';
        updatedCompanyInfo[index]['userLeaveYearSuccessIconColor'] = '#238732';
      } else {
        updatedCompanyInfo[index]['userLeaveYearSuccessIcon'] = 'x';
        updatedCompanyInfo[index]['userLeaveYearSuccessIconColor'] = 'red';
      }
    } else if (field === 'leaveMonth') {
      if (text !== '') {
        updatedCompanyInfo[index]['userLeaveMonthSuccessIcon'] = 'check';
        updatedCompanyInfo[index]['userLeaveMonthSuccessIconColor'] = '#238732';
      } else {
        updatedCompanyInfo[index]['userLeaveMonthSuccessIcon'] = 'x';
        updatedCompanyInfo[index]['userLeaveMonthSuccessIconColor'] = 'red';
      }
    } else if (field === 'position') {
      if (text.length >= 4) {
        updatedCompanyInfo[index]['userPositionSuccessIcon'] = 'check';
        updatedCompanyInfo[index]['userPositionSuccessIconColor'] = '#238732';
      } else {
        updatedCompanyInfo[index]['userPositionSuccessIcon'] = 'x';
        updatedCompanyInfo[index]['userPositionSuccessIconColor'] = 'red';
      }
    } else if (field === 'location') {
      if (text.length >= 4) {
        updatedCompanyInfo[index]['userLocationSuccessIcon'] = 'check';
        updatedCompanyInfo[index]['userLocationSuccessIconColor'] = '#238732';
      } else {
        updatedCompanyInfo[index]['userLocationSuccessIcon'] = 'x';
        updatedCompanyInfo[index]['userLocationSuccessIconColor'] = 'red';
      }
    }
  }

  const getAllCitiesFromApi = () => {
    // axios.get('https://countriesnow.space/api/v0.1/countries/')
    //   .then((response) => {
    //     const finalCities=[];
    //     if(!response.data.error){
    //       const data=response.data.data;
    //       console.log(data.length);
    //       for(const countries of data){
    //         const countryName=countries.country;
    //         const cities=countries.cities;
    //         for(const city of cities){
    //           finalCities.push(city+", "+countryName);
    //         }
    //       } 
    //       dispatch(CitiesFun(finalCities))
    //     }

    //   })
    //   .catch((error) => {
    //     console.log("error", JSON.stringify(error.message));
    //   })
  }

  const deleteCompanyFromList = (index) => {
    const updatedCompanyInfo = [...pastCompanyInfo];
    updatedCompanyInfo.splice(index, 1);
    setPastCompanyInfo(updatedCompanyInfo);
  }


  const fabRightButtonFun = () => {
    // const data = {
    //   SelectedDistrict: userDistrict,
    //   JoinedYear: userBatchJoined,
    //   PassedYear: userPassedOut,
    //   Degree: userDegree,
    //   SelectedCompany:userPlacedCompany
    // }
    // dispatch(CurriculumDetailsFun(data));
    props.fabRightButtonFun();
  }

  const fabLeftButtonFun = () => {
    props.fabLeftButtonFun();
  }


  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <CheckBox title='I have prior work experience.(Necessary)'
              checked={isUserExperiencedCheckbox}
              onPress={() => setIsUserExperiencedCheckbox(prevState => !prevState)}
            />

            {isUserExperiencedCheckbox &&
              <View>
                <View style={Styles.contaier}>
                  <View style={Styles.everyCompanyContainer}>
                    <Text style={Styles.companyTitle}>Working Company</Text>
                    <Text style={Styles.lableStyle}>Company Name</Text>
                    <Button
                      title={currentCompanyInfo.companyName.length > 0 ? currentCompanyInfo.companyName : 'Select Company'}
                      buttonStyle={Styles.buttonCompany}
                      titleStyle={Styles.buttonCompanyTitle}
                      onPress={() => { setShowUserCompanyOverlay(true); setUserPlacedCompanyOverlay('') }}
                      icon={<Icon name='chevron-down' type='feather' color='black' />}
                      iconPosition='right'
                      iconContainerStyle={Styles.buttonCompanyIcon}
                      onChangeText={(text) => handleInputChangeCurrentCompany(text, 'companyName')}
                    />
                    <Text style={Styles.lableStyle}>From</Text>
                    <View style={Styles.selectYearMonthContainer}>
                      <ModalSelector
                        style={Styles.selectYearMonth}
                        data={yearsArray}
                        onChange={(option) => {
                          handleInputChangeCurrentCompany(option.label, 'joinedYear')
                        }}>
                        <TouchableOpacity style={Styles.selectYearMonthInput}>
                          <Text style={[Styles.selectYearMonthOption]}>
                            {currentCompanyInfo.joinedYear === '' ? 'Select Year' : currentCompanyInfo.joinedYear}
                          </Text>
                          <Icon name={currentCompanyInfo.userJoinedYearSuccessIcon} type='feather' color={currentCompanyInfo.userJoinedYearSuccessIconColor} />
                        </TouchableOpacity>
                      </ModalSelector>
                      <ModalSelector
                        style={Styles.selectYearMonth}
                        data={monthsArray}
                        onChange={(option) => {
                          handleInputChangeCurrentCompany(option.label, 'joinedMonth')
                        }}>
                        <TouchableOpacity style={Styles.selectYearMonthInput}>
                          <Text style={[Styles.selectYearMonthOption]}>
                            {currentCompanyInfo.joinedMonth === '' ? 'Select Month' : currentCompanyInfo.joinedMonth}
                          </Text>
                          <Icon name={currentCompanyInfo.userJoinedMonthSuccessIcon} type='feather' color={currentCompanyInfo.userJoinedMonthSuccessIconColor} />
                        </TouchableOpacity>
                      </ModalSelector>

                    </View>

                    <Input
                      placeholder='Ex: Developer'
                      value={currentCompanyInfo.position}
                      style={Styles.input}
                      inputContainerStyle={Styles.inputContainer}
                      label='Position'
                      keyboardType='numeric'
                      labelStyle={Styles.lableStyle}
                      rightIcon={<Icon name={currentCompanyInfo.userPositionSuccessIcon} type="feather" color={currentCompanyInfo.userPositionSuccessIconColor} />}
                      onChangeText={(text) => handleCurrentChangePastCompany(text, 'position')}
                    />

                    <Text style={Styles.lableStyle}>Location</Text>
                    <Button
                      title={currentCompanyInfo.location.length > 0 ? currentCompanyInfo.location : 'Select Location'}
                      buttonStyle={Styles.buttonCompany}
                      titleStyle={Styles.buttonCompanyTitle}
                      onPress={() => { setShowUserCompanyOverlay(true); setUserPlacedCompanyOverlay('') }}
                      icon={<Icon name='chevron-down' type='feather' color='black' />}
                      iconPosition='right'
                      iconContainerStyle={Styles.buttonCompanyIcon}
                      onChangeText={(text) => handleInputChangeCurrentCompany(text, 'location')}
                    />
                  </View>

                  {/* <Overlay isVisible={showUserCompanyOverlay}
                    overlayStyle={Styles.showUserCompanyOverlayMain}>
                    <Icon name='x' type='feather' style={Styles.showUserCompanyOverlayCancelIcon} onPress={() => { setShowUserCompanyOverlay(false); Keyboard.dismiss() }} />

                    <TouchableOpacity >
                      <View style={Styles.showUserCompanyOverlayInnerView}>
                        <Input
                          placeholder='Search by company name'
                          style={Styles.input}
                          inputContainerStyle={Styles.inputContainer}
                          labelStyle={Styles.lableStyle}
                          value={userPlacedCompanyOverlay}
                          onChangeText={(text) => setUserPlacedCompanyOverlay(text)}
                        />
                        <FlatList
                          data={filteredComapanyData.length > 0 ? filteredComapanyData : ['No Result Found']}
                          renderItem={({ item }) =>
                            item !== 'No Result Found' ?
                              (<Button title={item} buttonStyle={Styles.companyFilterButtonOverlay}

                                onPress={() => selectedCompanyFromOverlay(item)} />
                              )
                              :
                              (<View style={Styles.overlayCompanyNoResultFoundView}>
                                <Text style={Styles.overlayCompanyNoResultFoundViewText}> {item} </Text>
                                <Button title='Add this Company'
                                  icon={<Icon name='plus-circle' type='feather' color='white' />}
                                  buttonStyle={Styles.overlayCompanyNoResultFoundViewButton}
                                  titleStyle={Styles.overlayCompanyNoResultFoundViewButtonTitle}
                                  onPress={() => setShowOverlayCompanyConfirmation(true)} />
                              </View>
                              )
                          }
                          keyExtractor={(item, index) => index.toString()}
                          style={{ maxHeight: screenHeightOrginal * 0.4 }}
                        />

                      </View>
                    </TouchableOpacity>

                  </Overlay> */}

                  {/* <Overlay
                    isVisible={showOverlayCompanyConfirmation}
                    overlayStyle={Styles.addCompanyOverlayConfirmationMain}>
                    <View style={Styles.addCompanyOverlayConfirmationView}>
                      <Text style={Styles.addCompanyOverlayConfirmationTitle}>
                        Confirm!
                      </Text>
                      <Text style={Styles.addCompanyOverlayConfirmationContent}>
                        Do you want to add this ({userPlacedCompanyOverlay}) company in our database?
                      </Text>
                      <View style={Styles.addCompanyOverlayConfirmationButtonsView}>
                        <Button
                          title='No'
                          icon={<Icon name='x' type='feather' color='white' style={Styles.addCompanyOverlayConfirmationButtonIcon} />}
                          buttonStyle={Styles.addCompanyOverlayConfirmationButtonNo}
                          onPress={() => setShowOverlayCompanyConfirmation(false)}
                        />
                        <Button
                          title='Yes'
                          icon={<Icon name='check' type='feather' color='white' style={Styles.addCompanyOverlayConfirmationButtonIcon} />}
                          buttonStyle={Styles.addCompanyOverlayConfirmationButtonYes}
                          onPress={() => selectedCompanyFromOverlay(userPlacedCompanyOverlay, true)}
                        />
                      </View>
                    </View>

                  </Overlay> */}


                  {/* <Overlay isVisible={showOverlayCompanyStoreInFirestore}
                    overlayStyle={Styles.CompanyStoreOverlayMain}>
                    <View style={Styles.CompanyStoreOverlayView}>
                      <Text style={Styles.CompanyStoreOverlayTitle}>Please Wait...</Text>
                      <Text style={Styles.CompanyStoreOverlayContent}>Adding your company in our database({userPlacedCompanyOverlay})</Text>
                      <ActivityIndicator size='large' />
                    </View>
                  </Overlay> */}
                </View>

                <View style={Styles.contaier}>
                  <Text style={Styles.pageTitle}>Past Company Details</Text>
                  {pastCompanyInfo.map((info, index) => (
                    <View key={index} style={Styles.everyCompanyContainer}>
                      <View style={Styles.everyCompanyTitleContainer}>
                        <Text style={Styles.companyTitle}>Company {index + 1}</Text>
                        <View style={Styles.everyCompanyTitleDeleteButtonContainer}>
                          <Icon name='trash-2' type='feather' color='#eb4236' style={Styles.everyCompanyTitleDeleteButton}
                            onPress={() => deleteCompanyFromList(index)} />
                        </View>
                      </View>
                      <Text style={Styles.lableStyle}>Company Name</Text>
                      <Button
                        title={info.companyName.length > 0 ? info.companyName : 'Company Name'}
                        buttonStyle={Styles.buttonCompany}
                        titleStyle={Styles.buttonCompanyTitle}
                        onPress={() => { setShowUserCompanyOverlay(true); setUserPlacedCompanyOverlay('') }}
                        icon={<Icon name='chevron-down' type='feather' color='black' />}
                        iconPosition='right'
                        iconContainerStyle={Styles.buttonCompanyIcon}
                        onChangeText={(text) => handleInputChangePastCompany(text, index, 'companyName')}
                      />
                      <Text style={Styles.lableStyle}>From</Text>
                      <View style={Styles.selectYearMonthContainer}>
                        <ModalSelector
                          style={Styles.selectYearMonth}
                          data={yearsArray}
                          onChange={(option) => {
                            handleInputChangePastCompany(option.label, index, 'joinedYear')
                          }}>
                          <TouchableOpacity style={Styles.selectYearMonthInput}>
                            <Text style={[Styles.selectYearMonthOption]}>
                              {info.joinedYear === '' ? 'Select Year' : info.joinedYear}
                            </Text>
                            <Icon name={info.userJoinedYearSuccessIcon} type='feather' color={info.userJoinedYearSuccessIconColor} />
                          </TouchableOpacity>
                        </ModalSelector>
                        <ModalSelector
                          style={Styles.selectYearMonth}
                          data={monthsArray}
                          onChange={(option) => {
                            handleInputChangePastCompany(option.label, index, 'joinedMonth')
                          }}>
                          <TouchableOpacity style={Styles.selectYearMonthInput}>
                            <Text style={[Styles.selectYearMonthOption]}>
                              {info.joinedMonth === '' ? 'Select Month' : info.joinedMonth}
                            </Text>
                            <Icon name={info.userJoinedMonthSuccessIcon} type='feather' color={info.userJoinedMonthSuccessIconColor} />
                          </TouchableOpacity>
                        </ModalSelector>

                      </View>

                      <Text style={Styles.lableStyle}>To</Text>
                      <View style={Styles.selectYearMonthContainer}>
                        <ModalSelector
                          style={Styles.selectYearMonth}
                          data={yearsArray}
                          onChange={(option) => {
                            handleInputChangePastCompany(option.label, index, 'leaveYear')
                          }}>
                          <TouchableOpacity style={Styles.selectYearMonthInput}>
                            <Text style={[Styles.selectYearMonthOption]}>
                              {info.leaveYear === '' ? 'Select Year' : info.leaveYear}
                            </Text>
                            <Icon name={info.userLeaveYearSuccessIcon} type='feather' color={info.userLeaveYearSuccessIconColor} />
                          </TouchableOpacity>
                        </ModalSelector>
                        <ModalSelector
                          style={Styles.selectYearMonth}
                          data={monthsArray}
                          onChange={(option) => {
                            handleInputChangePastCompany(option.label, index, 'leaveMonth')
                          }}>
                          <TouchableOpacity style={Styles.selectYearMonthInput}>
                            <Text style={[Styles.selectYearMonthOption]}>
                              {info.leaveMonth === '' ? 'Select Month' : info.leaveMonth}
                            </Text>
                            <Icon name={info.userLeaveMonthSuccessIcon} type='feather' color={info.userLeaveMonthSuccessIconColor} />
                          </TouchableOpacity>
                        </ModalSelector>

                      </View>

                      <Input
                        placeholder='Ex: Developer'
                        value={info.position}
                        style={Styles.input}
                        inputContainerStyle={Styles.inputContainer}
                        label='Position'
                        keyboardType='numeric'
                        labelStyle={Styles.lableStyle}
                        rightIcon={<Icon name={info.userPositionSuccessIcon} type="feather" color={info.userPositionSuccessIconColor} />}
                        onChangeText={(text) => handleInputChangePastCompany(text, index, 'position')}
                      />

                      <Button
                        title={info.location.length > 0 ? info.location : 'Select Location'}
                        buttonStyle={Styles.buttonCompany}
                        titleStyle={Styles.buttonCompanyTitle}
                        onPress={() => { setShowUserCompanyOverlay(true); setUserPlacedCompanyOverlay('') }}
                        icon={<Icon name='chevron-down' type='feather' color='black' />}
                        iconPosition='right'
                        iconContainerStyle={Styles.buttonCompanyIcon}
                        oonChangeText={(text) => handleInputChangePastCompany(text, index, 'location')}
                      />
                    </View>
                  ))}
                  <Button title="Add Company" onPress={addCompanyField}
                    icon={<Icon name='plus' type='feather' />}
                    iconPosition='bottom' />
                </View>
              </View>
            }



          </TouchableWithoutFeedback>
        </View>
      </ScrollView >

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
    </View >
  )
}