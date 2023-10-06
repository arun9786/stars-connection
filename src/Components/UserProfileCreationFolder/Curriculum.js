import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import ModalSelector from 'react-native-modal-selector'
import { Button, CheckBox, FAB, Icon, Input, LinearProgress, Overlay } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';

import { CurriculumDetailsFun } from '../../Redux/Slice/UserProfileSlice';
import { CompaniesFun } from '../../Redux/Slice/CompaniesSlice'
import { Styles } from '../../Styles/UserProfileCreationFolder/CurriculumCss'
import { ActivityIndicator } from 'react-native'

import { firestore } from '../../config/firebase'
import { setDoc, doc } from 'firebase/firestore'



export default function Curriculum(props) {

  const dispatch = useDispatch();
  const userCompaniesDataRedux = useSelector((state) => state.CompaniesReducer.companies_array).slice().sort();
  const userCurriculumnDataRedux = useSelector((state) => state.UserProfileReducer.curriculumn);

  const [showFabRight, setShowFabRight] = useState(false);
  const [visibleMainComponent, setVisibleMainComponent] = useState(false);

  const [userDistrict, setUserDistrict] = useState('');
  const [userBatchJoined, setUserBatchJoined] = useState('');
  const [userPassedOut, setUserPassedOut] = useState('');
  const [userDegree, setUserDegree] = useState('');
  const [userPlacedCompany, setUserPlacedCompany] = useState('');
  const [userPlacedCompanyOverlay, setUserPlacedCompanyOverlay] = useState('');

  const [showUserCompanyComponent, setShowUserCompanyComponent] = useState(true);
  const [isUserCompanyVerified, setIsUserCompanyVerified] = useState(false);
  const [showUserCompanyOverlay, setShowUserCompanyOverlay] = useState(false);
  const [showOverlayCompanyConfirmation, setShowOverlayCompanyConfirmation] = useState(false);
  const [showOverlayCompanyStoreInFirestore, setShowOverlayCompanyStoreInFirestore] = useState(false);


  const [userDistrictSuccessIcon, setUserDistrictSuccessIcon] = useState('x');
  const [userDistrictSuccessIconColor, setUserDistrictSuccessIconColor] = useState('red');
  const [userJoinedBatchSuccessIcon, setUserJoinedBatchSuccessIcon] = useState('x');
  const [userJoinedBatchSuccessIconColor, setUserJoinedBatchSuccessIconColor] = useState('red');
  const [userPassedOutBatchSuccessIcon, setUserPassedOutBatchSuccessIcon] = useState('x');
  const [userPassedOutBatchSuccessIconColor, setUserPassedOutBatchSuccessIconColor] = useState('red');
  const [userDegreeSuccessIcon, setUserDegreeSuccessIcon] = useState('x');
  const [userDegreeSuccessIconColor, setUserDegreeSuccessIconColor] = useState('red');

  const [userCompanySuccessIcon, setUserCompanySuccessIcon] = useState('');
  const [userCompanySuccessIconColor, setUserCompanySuccessIconColor] = useState('');

  const [filteredComapanyData, setFilteredComapanyData] = useState([]);

  const screenHeightOrginal = Dimensions.get('window').height;

  const userDistrictsArr = [
    { key: 'Ariyalur', label: 'Ariyalur' },
    { key: 'Chengalpattu', label: 'Chengalpattu' },
    { key: 'Chennai', label: 'Chennai' },
    { key: 'Coimbatore', label: 'Coimbatore' },
    { key: 'Cuddalore', label: 'Cuddalore' },
    { key: 'Dharmapuri', label: 'Dharmapuri' },
    { key: 'Dindigul', label: 'Dindigul' },
    { key: 'Erode', label: 'Erode' },
    { key: 'Kallakurichi', label: 'Kallakurichi' },
    { key: 'Kancheepuram', label: 'Kancheepuram' },
    { key: 'Karur', label: 'Karur' },
    { key: 'Krishnagiri', label: 'Krishnagiri' },
    { key: 'Madurai', label: 'Madurai' },
    { key: 'Mayiladuthurai', label: 'Mayiladuthurai' },
    { key: 'Nagapattinam', label: 'Nagapattinam' },
    { key: 'Kanniyakumari', label: 'Kanniyakumari' },
    { key: 'Namakkal', label: 'Namakkal' },
    { key: 'Perambalur', label: 'Perambalur' },
    { key: 'Pudukottai', label: 'Pudukottai' },
    { key: 'Ramanathapuram', label: 'Ramanathapuram' },
    { key: 'Ranipet', label: 'Ranipet' },
    { key: 'Salem', label: 'Salem' },
    { key: 'Sivagangai', label: 'Sivagangai' },
    { key: 'Tenkasi', label: 'Tenkasi' },
    { key: 'Thanjavur', label: 'Thanjavur' },
    { key: 'Theni', label: 'Theni' },
    { key: 'Thiruvallur', label: 'Thiruvallur' },
    { key: 'Thiruvarur', label: 'Thiruvarur' },
    { key: 'Thoothukudi', label: 'Thoothukudi' },
    { key: 'Trichirappalli', label: 'Trichirappalli' },
    { key: 'Thirunelveli', label: 'Thirunelveli' },
    { key: 'Tirupathur', label: 'Tirupathur' },
    { key: 'Tiruppur', label: 'Tiruppur' },
    { key: 'Tiruvannamalai', label: 'Tiruvannamalai' },
    { key: 'The Nilgiris', label: 'The Nilgiris' },
    { key: 'Vellore', label: 'Vellore' },
    { key: 'Viluppuram', label: 'Viluppuram' },
    { key: 'Virudhunagar', label: 'Virudhunagar' }
  ];

  const batchJoinedYear = [
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
  ];


  const batchPassedOutYear = [
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
    { key: '2031', label: '2031' },
    { key: '2032', label: '2032' },
    { key: '2033', label: '2033' },
    { key: '2034', label: '2034' },
    { key: '2035', label: '2035' },
  ]

  const degreesArray = [
    { key: 'B.Tech - Biotechnology', label: 'B.Tech - Biotechnology' },
    { key: 'B.Tech - Chemical Engineering', label: 'B.Tech - Chemical Engineering' },
    { key: 'B.Tech - Civil Engineering', label: 'B.Tech - Civil Engineering' },
    { key: 'B.Tech - Computer Science and Engineering', label: 'B.Tech - Computer Science and Engineering' },
    { key: 'B.Tech - Computer Science and Engineering (Bioinformatics)', label: 'B.Tech - Computer Science and Engineering (Bioinformatics)' },
    { key: 'B.Tech - Computer Science and Engineering (Information Security)', label: 'B.Tech - Computer Science and Engineering (Information Security)' },
    { key: 'B.Tech - Computer Science and Engineering (Internet of Things)', label: 'B.Tech - Computer Science and Engineering (Internet of Things)' },
    { key: 'B.Tech - Computer Science and Engineering and Business Systems(in collaboration with TCS)', label: 'B.Tech - Computer Science and Engineering and Business Systems(in collaboration with TCS)' },
    { key: 'B.Tech - Computer Science and Engineering (Data Science)', label: 'B.Tech - Computer Science and Engineering (Data Science)' },
    { key: 'B.Tech - Computer Science and Engineering (Block Chain Technology)', label: 'B.Tech - Computer Science and Engineering (Block Chain Technology)' },
    { key: 'B.Tech - Computer Science and Engineering (Artificial Intelligence and Machine Learning)', label: 'B.Tech - Computer Science and Engineering (Artificial Intelligence and Machine Learning)' },
    { key: 'B.Tech - Electrical and Electronics Engineering', label: 'B.Tech - Electrical and Electronics Engineering' },
    { key: 'B.Tech - Electrical and Computer Science Engineering', label: 'B.Tech - Electrical and Computer Science Engineering' },
    { key: 'B.Tech - Electronics and Communication Engineering', label: 'B.Tech - Electronics and Communication Engineering' },
    { key: 'B.Tech - Electronics and Instrumentation Engineering', label: 'B.Tech - Electronics and Instrumentation Engineering' },
    { key: 'B.Tech - Electronics and Communication Engineering (Biomedical Engineering)', label: 'B.Tech - Electronics and Communication Engineering (Biomedical Engineering)' },
    { key: 'B.Tech. Electronics Engineering (VLSI Design and Technology)', label: 'B.Tech. Electronics Engineering (VLSI Design and Technology)' },
    { key: 'B.Tech - Information Technology', label: 'B.Tech - Information Technology' },
    { key: 'B.Tech - Mechanical Engineering', label: 'B.Tech - Mechanical Engineering' },
    { key: 'B.Tech - Mechanical Engineering (Automotive Engineering)', label: 'B.Tech - Mechanical Engineering (Automotive Engineering)' },
    { key: 'B.Tech - Mechanical Engineering (Manufacturing Engineering)', label: 'B.Tech - Mechanical Engineering (Manufacturing Engineering)' },
    { key: 'B.Des. Industrial Design', label: 'B.Des. Industrial Design' },
    { key: 'B.Arch', label: 'B.Arch' },
    { key: 'B.Sc. (Hons.) Agriculture', label: 'B.Sc. (Hons.) Agriculture' },
    { key: 'B.Sc. in Hospitality and Hotel Administration', label: 'B.Sc. in Hospitality and Hotel Administration' },
    { key: 'B.Sc. Computer Science', label: 'B.Sc. Computer Science' },
    { key: 'B.Sc. Multimedia & Animation', label: 'B.Sc. Multimedia & Animation' },
    { key: 'B.Sc. Visual Communication', label: 'B.Sc. Visual Communication' },
    { key: 'B.B.A (Bachelor of Business Administration)', label: 'B.B.A (Bachelor of Business Administration)' },
    { key: 'B.Com (Bachelor of Commerce)', label: 'B.Com (Bachelor of Commerce)' },
    { key: 'B.Com. - Business Process Services', label: 'B.Com. - Business Process Services' },
    { key: 'B.Com. – Banking and Capital Markets', label: 'B.Com. – Banking and Capital Markets' },
    { key: 'B.Com. – Financial Technology', label: 'B.Com. – Financial Technology' },
    { key: 'B.C.A (Bachelor of Computer Applications)', label: 'B.C.A (Bachelor of Computer Applications)' },
    { key: 'Integrated M.Tech. Software Engineering', label: 'Integrated M.Tech. Software Engineering' },
    { key: 'Integrated M.Tech. Computer Science and Engineering in collaboration with Virtusa', label: 'Integrated M.Tech. Computer Science and Engineering in collaboration with Virtusa' },
    { key: 'Integrated M.Tech. Computer Science and Engineering (Data Science)', label: 'Integrated M.Tech. Computer Science and Engineering (Data Science)' },
    { key: 'Integrated M.Sc. Biotechnology (5 Year)', label: 'Integrated M.Sc. Biotechnology (5 Year)' },
    { key: 'Integrated M.Sc. Food Science and Technology (5 Year)', label: 'Integrated M.Sc. Food Science and Technology (5 Year)' },
    { key: 'Integrated M.Sc Computational Statistics and Data Analytics (5 Year)', label: 'Integrated M.Sc Computational Statistics and Data Analytics (5 Year)' },
    { key: 'Integrated M.Sc. Physics (5 Year) with exit option B.Sc. Physics (3 Year) or B.Sc. Physics (Hon) (4 Year)', label: 'Integrated M.Sc. Physics (5 Year) with exit option B.Sc. Physics (3 Year) or B.Sc. Physics (Hon) (4 Year)' },
    { key: 'Integrated M.Sc. Chemistry (5 Year) with exit option B.Sc. Chemistry (3 Year) or B.Sc. Chemistry (Hon) (4 Year)', label: 'Integrated M.Sc. Chemistry (5 Year) with exit option B.Sc. Chemistry (3 Year) or B.Sc. Chemistry (Hon) (4 Year)' },
    { key: 'Integrated M.Sc. Mathematics (5 Year) with exit option B.Sc. Mathematics (3 Year) or B.Sc. Mathematics (Hon) (4 Year)', label: 'Integrated M.Sc. Mathematics (5 Year) with exit option B.Sc. Mathematics (3 Year) or B.Sc. Mathematics (Hon) (4 Year)' },
    { key: 'M.Tech. Biomedical Engineering', label: 'M.Tech. Biomedical Engineering' },
    { key: 'M.Tech CAD / CAM', label: 'M.Tech CAD / CAM' },
    { key: 'M.Tech.Construction Technology and Management', label: 'M.Tech.Construction Technology and Management' },
    { key: 'M.Tech. Control and Automation', label: 'M.Tech. Control and Automation' },
    { key: 'M.Tech. IoT and Sensor Systems', label: 'M.Tech. IoT and Sensor Systems' },
    { key: 'M.Tech. Mechatronics', label: 'M.Tech. Mechatronics' },
    { key: 'M.Tech. Power Electronics and Drives', label: 'M.Tech. Power Electronics and Drives' },
    { key: 'M.Tech. Structural Engineering', label: 'M.Tech. Structural Engineering' },
    { key: 'M.Tech. Applied Computational Fluid Dynamics', label: 'M.Tech. Applied Computational Fluid Dynamics' },
    { key: 'M.Tech. Automotive Electronics', label: 'M.Tech. Automotive Electronics' },
    { key: 'M.Tech - Automotive Engineering', label: 'M.Tech - Automotive Engineering' },
    { key: 'M.Tech. Biotechnology', label: 'M.Tech. Biotechnology' },
    { key: 'M.Tech Electronics and Communication Engineering (Intelligent Communication Systems)', label: 'M.Tech Electronics and Communication Engineering (Intelligent Communication Systems)' },
    { key: 'M.Tech. Manufacturing Engineering', label: 'M.Tech. Manufacturing Engineering' },
    { key: 'M.Tech. Computer Science and Engineering', label: 'M.Tech. Computer Science and Engineering' },
    { key: 'M. Tech. Computer Science and Engineering (Artificial Intelligence and Machine Learning)', label: 'M. Tech. Computer Science and Engineering (Artificial Intelligence and Machine Learning)' },
    { key: 'M. Tech. Computer Science and Engineering (Big Data Analytics)', label: 'M. Tech. Computer Science and Engineering (Big Data Analytics)' },
    { key: 'M. Tech. Computer Science and Engineering (Information Security)', label: 'M. Tech. Computer Science and Engineering (Information Security)' },
    { key: 'M.Tech. Embedded Systems', label: 'M.Tech. Embedded Systems' },
    { key: 'M.Tech. VLSI Design', label: 'M.Tech. VLSI Design' },
    { key: 'M.Des. (Industrial Design)', label: 'M.Des. (Industrial Design)' },
    { key: 'M.C.A. (Master of Computer Applications)', label: 'M.C.A. (Master of Computer Applications)' },
    { key: 'MBA (Master of Business Administration)', label: 'MBA (Master of Business Administration)' },
    { key: 'M.Sc. Applied MicroBiology', label: 'M.Sc. Applied MicroBiology' },
    { key: 'M.Sc. Biomedical Genetics', label: 'M.Sc. Biomedical Genetics' },
    { key: 'M.Sc. Biotechnology', label: 'M.Sc. Biotechnology' },
    { key: 'M.Sc. Business Statistics', label: 'M.Sc. Business Statistics' },
    { key: 'M.Sc. Chemistry', label: 'M.Sc. Chemistry' },
    { key: 'M.Sc. Data Science', label: 'M.Sc. Data Science' },
    { key: 'M.Sc. Physics', label: 'M.Sc. Physics' },
    { key: 'Master of Social Work', label: 'Master of Social Work' },
    { key: 'Ph.D - Internal Full Time only', label: 'Ph.D - Internal Full Time only' }
  ];


  useEffect(() => {
    
    if (userCurriculumnDataRedux) {
      setUserDistrict(userCurriculumnDataRedux.SelectedDistrict);
      setUserBatchJoined(userCurriculumnDataRedux.JoinedYear);
      setUserPassedOut(userCurriculumnDataRedux.PassedYear);
      setUserDegree(userCurriculumnDataRedux.Degree);
      if (userCurriculumnDataRedux.SelectedCompany.length > 0) {
        setShowUserCompanyComponent(true);
        setUserPlacedCompany(userCurriculumnDataRedux.SelectedCompany);
      } else {
        setShowUserCompanyComponent(false);
        setUserPlacedCompany('');
      }
      setVisibleMainComponent(true);
    }else{
      console.log("curriculumn");
      setVisibleMainComponent(true);
    }
    
  }, [])


  useEffect(() => {
    if (userDistrict !== '') {
      setUserDistrictSuccessIcon('check');
      setUserDistrictSuccessIconColor('#238732');
    } else {
      setUserDistrictSuccessIcon('x');
      setUserDistrictSuccessIconColor('#8c0a1b');
    }
  }, [userDistrict]);

  useEffect(() => {
    if (userBatchJoined !== '') {
      if(userPassedOut !==''){
        if( userPassedOut > (userBatchJoined+1)){
          setUserPassedOutBatchSuccessIcon('check');
          setUserPassedOutBatchSuccessIconColor('#238732');
          setUserJoinedBatchSuccessIcon('check');
          setUserJoinedBatchSuccessIconColor('#238732');
        }else{
          setUserPassedOutBatchSuccessIcon('x');
          setUserPassedOutBatchSuccessIconColor('#8c0a1b');
          setUserJoinedBatchSuccessIcon('x');
          setUserJoinedBatchSuccessIconColor('#8c0a1b');
        }
      }else{
        setUserJoinedBatchSuccessIcon('check');
        setUserJoinedBatchSuccessIconColor('#238732');
      }
    }else if (userPassedOut !== '') {
      if(userBatchJoined!==''){
        if( userPassedOut > (userBatchJoined+1)){
          setUserPassedOutBatchSuccessIcon('check');
          setUserPassedOutBatchSuccessIconColor('#238732');
          setUserJoinedBatchSuccessIcon('check');
          setUserJoinedBatchSuccessIconColor('#238732');
        }else{
          setUserPassedOutBatchSuccessIcon('x');
          setUserPassedOutBatchSuccessIconColor('#8c0a1b');
          setUserJoinedBatchSuccessIcon('x');
          setUserJoinedBatchSuccessIconColor('#8c0a1b');
        }
      }else{
        setUserPassedOutBatchSuccessIcon('check');
        setUserPassedOutBatchSuccessIconColor('#238732');
      }
    }
  }, [userBatchJoined, userPassedOut]);

  useEffect(() => {
    if (userDegree !== '') {
      setUserDegreeSuccessIcon('check');
      setUserDegreeSuccessIconColor('#238732');
    } else {
      setUserDegreeSuccessIcon('x');
      setUserDegreeSuccessIconColor('#8c0a1b');
    }
  }, [userDegree]);

  useEffect(() => {
    Keyboard.dismiss();
    if (isUserCompanyVerified) {
      setUserCompanySuccessIcon('check');
      setUserCompanySuccessIconColor('#238732');
    } else {
      setUserCompanySuccessIcon('x');
      setUserCompanySuccessIconColor('#8c0a1b');
    }
  }, [userPlacedCompany]);

  useEffect(() => {
    setFilteredComapanyData(userCompaniesDataRedux.filter(item => item.trim().toLowerCase().includes(userPlacedCompanyOverlay.trim().toLowerCase())))
  }, [userPlacedCompanyOverlay]);

  useEffect(() => {
    if (userDistrict.length > 3 && userBatchJoined.length > 0 && userPassedOut.length > 0 && userPassedOut > (userBatchJoined+1) 
    && userDegree.length > 0) {
      if (showUserCompanyComponent) {
        if (userPlacedCompany.length > 0) {
          setShowFabRight(true);
        } else {
          setShowFabRight(false);
        }
      } else {
        setShowFabRight(true);
      }
    } else {
      setShowFabRight(false);
    }
  }, [userDistrict, userBatchJoined, userPassedOut, userDegree, userPlacedCompany, showUserCompanyComponent]);

  const selectedCompanyFromOverlay = (company, newCompany = false) => {
    setShowOverlayCompanyConfirmation(false)
    setIsUserCompanyVerified(true);
    if (newCompany) {
      StoreCompanyinFirestore(company);
    } else {
      setUserPlacedCompany(company);
    }
    setShowUserCompanyOverlay(false);
  }

  const showUserCompanyFun = () => {
    setShowUserCompanyComponent(prevState => !prevState)
    setUserPlacedCompany('');
  }

  const StoreCompanyinFirestore = async (company) => {
    setShowOverlayCompanyStoreInFirestore(true);
    const newCompany = company.trim().replace(/\b\w/g, (match) => match.toUpperCase());
    let newCompanyList = userCompaniesDataRedux;
    newCompanyList.push(newCompany);
    newCompanyList = newCompanyList.slice().sort();
    try {
      console.log(newCompanyList);
      setDoc(doc(firestore, "Companies", "Data"), { "companies": newCompanyList });
      dispatch(CompaniesFun(newCompanyList));
      setUserPlacedCompany(company);
      setShowOverlayCompanyStoreInFirestore(false);
      console.log("Success")
    } catch (e) {
      setShowOverlayCompanyStoreInFirestore(false);
      ToastAndroid.show("Please try again...", ToastAndroid.LONG);
      console.log(e);
    }
  }

  const fabRightButtonFun = () => {
    const data = {
      SelectedDistrict: userDistrict,
      JoinedYear: userBatchJoined,
      PassedYear: userPassedOut,
      Degree: userDegree,
      SelectedCompany: userPlacedCompany
    }
    dispatch(CurriculumDetailsFun(data));
    props.fabRightButtonFun();
  }

  const fabLeftButtonFun = () => {
    const data = {
      SelectedDistrict: userDistrict,
      JoinedYear: userBatchJoined,
      PassedYear: userPassedOut,
      Degree: userDegree,
      SelectedCompany: userPlacedCompany
    }
    dispatch(CurriculumDetailsFun(data));
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
          <View style={Styles.contaier}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View>
                <Text style={Styles.pageTitle}>Curriculum Details</Text>

                <Text style={Styles.districtText}>Setected District Name</Text>
                <ModalSelector
                  style={Styles.selectPost}
                  data={userDistrictsArr}
                  onChange={(option) => {
                    setUserDistrict(option.label)
                  }}
                >
                  <TouchableOpacity style={Styles.selectPostInput}>
                    <Text style={Styles.selectPostOption}>
                      {userDistrict === '' ? 'Select District' : userDistrict}
                    </Text>
                    <Icon name={userDistrictSuccessIcon} type='feather' color={userDistrictSuccessIconColor} />
                  </TouchableOpacity>
                </ModalSelector>


                <Text style={Styles.batchJoinedText}>Batch Joined</Text>
                <ModalSelector
                  style={Styles.selectPost}
                  data={batchJoinedYear}
                  onChange={(option) => {
                    setUserBatchJoined(option.label)
                  }}
                >
                  <TouchableOpacity style={Styles.selectPostInput}>
                    <Text style={Styles.selectPostOption}>
                      {userBatchJoined === '' ? 'Select Year' : userBatchJoined}
                    </Text>
                    <Icon name={userJoinedBatchSuccessIcon} type='feather' color={userJoinedBatchSuccessIconColor} />
                  </TouchableOpacity>
                </ModalSelector>


                <Text style={Styles.batchpassedOutText}>Passed out year or expected</Text>
                <ModalSelector
                  style={Styles.selectPost}
                  data={batchPassedOutYear}
                  onChange={(option) => {
                    setUserPassedOut(option.label)
                  }}
                >
                  <TouchableOpacity style={Styles.selectPostInput}>
                    <Text style={Styles.selectPostOption}>
                      {userPassedOut === '' ? 'Select Year' : userPassedOut}
                    </Text>
                    <Icon name={userPassedOutBatchSuccessIcon} type='feather' color={userPassedOutBatchSuccessIconColor} />
                  </TouchableOpacity>
                </ModalSelector>


                <Text style={Styles.degreeText}>Degree & Branch</Text>
                <ModalSelector
                  style={Styles.selectPost}
                  data={degreesArray}
                  onChange={(option) => {
                    setUserDegree(option.label)
                  }}
                >
                  <TouchableOpacity style={Styles.selectPostInput}>
                    <Text style={Styles.selectPostOption}>
                      {userDegree === '' ? 'Select Degree' : userDegree}
                    </Text>
                    <Icon name={userDegreeSuccessIcon} type='feather' color={userDegreeSuccessIconColor} />
                  </TouchableOpacity>
                </ModalSelector>

                <CheckBox title='I successfully secured a job through a campus interview at my college.(if applicable)'
                  checked={showUserCompanyComponent}
                  onPress={() => showUserCompanyFun()}
                />
                {showUserCompanyComponent &&
                  <Button
                    title={userPlacedCompany.length > 0 ? userPlacedCompany : 'Select Company'}
                    buttonStyle={Styles.buttonCompany}
                    titleStyle={Styles.buttonCompanyTitle}
                    onPress={() => { setShowUserCompanyOverlay(true); setUserPlacedCompanyOverlay('') }}
                    icon={<Icon name='chevron-down' type='feather' color='blue' />}
                    iconPosition='right'
                    iconContainerStyle={Styles.buttonCompanyIcon}
                  />
                }
              </View>
            </TouchableWithoutFeedback>

            <Overlay isVisible={showUserCompanyOverlay}
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

            </Overlay>

            <Overlay
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

            </Overlay>


            <Overlay isVisible={showOverlayCompanyStoreInFirestore}
              overlayStyle={Styles.CompanyStoreOverlayMain}>
              <View style={Styles.CompanyStoreOverlayView}>
                <Text style={Styles.CompanyStoreOverlayTitle}>Please Wait...</Text>
                <Text style={Styles.CompanyStoreOverlayContent}>Adding your company in our database({userPlacedCompanyOverlay})</Text>
                <ActivityIndicator size='large' />
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
}