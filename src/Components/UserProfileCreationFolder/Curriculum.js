import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import ModalSelector from 'react-native-modal-selector'
import { Button, CheckBox, FAB, Icon, Input, Overlay } from 'react-native-elements'

import { useSelector, useDispatch } from 'react-redux';

import { CurriculumDetailsFun } from '../../Redux/Slice/UserProfileSlice';
import { Styles } from '../../Styles/UserProfileCreationFolder/CurriculumCss'

export default function Curriculum(props) {

  const dispatch = useDispatch();
  const userCompaniesDataRedux = useSelector((state) => state.CompaniesReducer.companies_array);

  const [showFabRight, setShowFabRight] = useState(false);
  const [visibleMainComponent, setVisibleMainComponent] = useState(true);

  const [userDistrict, setUserDistrict] = useState('Select District');
  const [userBatchJoined, setUserBatchJoined] = useState('Select Year');
  const [userPassedOut, setUserPassedOut] = useState('Select Year');
  const [userDegree, setUserDegree] = useState('Select Degree');
  const [userPlacedCompany, setUserPlacedCompany] = useState('');
  const [userPlacedCompanyOverlay, setUserPlacedCompanyOverlay] = useState('');

  const [showUserCompanyComponent, setShowUserCompanyComponent] = useState(true);
  const [isUserCompanyVerified, setIsUserCompanyVerified] = useState(false);
  const [showUserCompanyOverlay, setShowUserCompanyOverlay] = useState(false);


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


  const userCompanyList = [
    "Reliance Industries Limited",
    "Tata Consultancy Services Limited",
    "HDFC Bank Limited",
    "ICICI Bank Limited",
    "Hindustan Unilever Limited",
    "Infosys Limited",
    "Housing Development Finance Corporation Limited",
    "ITC Limited",
    "State Bank of India",
    "Bharti Airtel Limited",
    "Kotak Mahindra Bank Limited",
    "Bajaj Finance Limited",
    "Life Insurance Corporation Of India",
    "Larsen & Toubro Limited",
    "HCL Technologies Limited",
    "Asian Paints Limited",
    "Axis Bank Limited",
    "Maruti Suzuki India Limited",
    "Sun Pharmaceutical Industries Limited",
    "Titan Company Limited",
    "Avenue Supermarts Limited",
    "UltraTech Cement Limited",
    "Bajaj Finserv Limited",
    "Wipro Limited",
    "Adani Enterprises Limited",
    "Oil & Natural Gas Corporation Limited",
    "NTPC Limited",
    "JSW Steel Limited",
    "Power Grid Corporation of India Limited",
    "Mahindra & Mahindra Limited",
    "LTIMindtree Limited",
    "Tata Motors Limited",
    "Adani Green Energy Limited",
    "Adani Ports and Special Economic Zone Limited",
    "Coal India Limited",
    "Tata Steel Limited",
    "Hindustan Zinc Limited",
    "Pidilite Industries Limited",
    "Siemens Limited",
    "Adani Transmission Limited",
    "SBI Life Insurance Company Limited",
    "Indian Oil Corporation Limited",
    "Bajaj Auto Limited",
    "Grasim Industries Limited",
    "Tech Mahindra Limited",
    "HDFC Life Insurance Company Limited",
    "Britannia Industries Limited",
    "Vedanta Limited",
    "Godrej Consumer Products Limited",
    "Dabur India Limited",
    "Adani Total Gas Limited",
    "SHREE CEMENT LIMITED",
    "Hindustan Aeronautics Limited",
    "Hindalco Industries Limited",
    "Varun Beverages Limited",
    "DLF Limited",
    "Bank of Baroda",
    "IndusInd Bank Limited",
    "Eicher Motors Limited",
    "Dr. Reddy's Laboratories Limited",
    "Divi's Laboratories Limited",
    "Bharat Petroleum Corporation Limited",
    "Havells India Limited",
    "Adani Power Limited",
    "InterGlobe Aviation Limited",
    "Cipla Limited",
    "Ambuja Cements Limited",
    "SRF Limited",
    "ABB India Limited",
    "Bharat Electronics Limited",
    "SBI Cards and Payment Services Limited",
    "GAIL (India) Limited",
    "Bajaj Holdings & Investment Limited",
    "TATA CONSUMER PRODUCTS LIMITED",
    "ICICI Prudential Life Insurance Company Limited",
    "Cholamandalam Investment and Finance Company Limited",
    "Marico Limited",
    "Apollo Hospitals Enterprise Limited",
    "Tata Power Company Limited",
    "Bosch Limited",
    "Berger Paints (I) Limited",
    "Jindal Steel & Power Limited",
    "United Spirits Limited",
    "UPL Limited",
    "Adani Wilmar Limited",
    "ICICI Lombard General Insurance Company Limited",
    "Torrent Pharmaceuticals Limited",
    "Canara Bank",
    "Punjab National Bank",
    "TVS Motor Company Limited",
    "Zydus Lifesciences Limited",
    "Tube Investments of India Limited",
    "Trent Limited",
    "IDBI Bank Limited",
    "Info Edge (India) Limited",
    "Shriram Finance Limited",
    "Hero MotoCorp Limited",
    "The Indian Hotels Company Limited",
    "PI Industries Limited",
    "Indian Railway Catering And Tourism Corporation Limited",
    "CG Power and Industrial Solutions Limited",
    "Union Bank of India",
    "Samvardhana Motherson International Limited",
    "Cummins India Limited",
    "Schaeffler India Limited",
    "Macrotech Developers Limited",
    "Zomato Limited",
    "Procter & Gamble Hygiene and Health Care Limited",
    "Yes Bank Limited",
    "Polycab India Limited",
    "Max Healthcare Institute Limited",
    "Indian Overseas Bank",
    "Page Industries Limited",
    "Colgate Palmolive (India) Limited",
    "Ashok Leyland Limited",
    "Alkem Laboratories Limited",
    "NHPC Limited",
    "One 97 Communications Limited",
    "Power Finance Corporation Limited",
    "JSW Energy Limited",
    "Muthoot Finance Limited",
    "AU Small Finance Bank Limited",
    "Indus Towers Limited",
    "Balkrishna Industries Limited",
    "United Breweries Limited",
    "Aditya Birla Capital Limited",
    "Tata Elxsi Limited",
    "Dalmia Bharat Limited",
    "HDFC Asset Management Company Limited",
    "Indian Bank",
    "Astral Limited",
    "Bharat Forge Limited",
    "L&T Technology Services Limited",
    "MRF Limited",
    "Tata Communications Limited",
    "FSN E-Commerce Ventures Limited",
    "Container Corporation of India Limited",
    "Persistent Systems Limited",
    "Patanjali Foods Limited",
    "Indian Railway Finance Corporation Limited",
    "Linde India Limited",
    "IDFC First Bank Limited",
    "Petronet LNG Limited",
    "Solar Industries India Limited",
    "Steel Authority of India Limited",
    "MphasiS Limited",
    "Hindustan Petroleum Corporation Limited",
    "APL Apollo Tubes Limited",
    "Gujarat Fluorochemicals Limited",
    "NMDC Limited",
    "Honeywell Automation India Limited",
    "Supreme Industries Limited",
    "Gujarat Gas Limited",
    "Bandhan Bank Limited",
    "ACC Limited",
    "Oberoi Realty Limited",
    "Bank of India",
    "REC Limited",
    "Aurobindo Pharma Limited",
    "Star Health and Allied Insurance Company Limited",
    "Indraprastha Gas Limited",
    "Lupin Limited",
    "UCO Bank",
    "Jubilant Foodworks Limited",
    "PB Fintech Limited",
    "Godrej Properties Limited",
    "Mahindra & Mahindra Financial Services Limited",
    "Vodafone Idea Limited",
    "Oracle Financial Services Software Limited",
    "The Federal Bank Limited",
    "Vedant Fashions Limited",
    "UNO Minda Limited",
    "AIA Engineering Limited",
    "Thermax Limited",
    "Oil India Limited",
    "Voltas Limited",
    "3M India Limited",
    "Coromandel International Limited",
    "Sundaram Finance Limited",
    "KPIT Technologies Limited",
    "Deepak Nitrite Limited",
    "Escorts Kubota Limited",
    "Biocon Limited",
    "Tata Chemicals Limited",
    "Torrent Power Limited",
    "GMR Airports Infrastructure Limited",
    "Bharat Heavy Electricals Limited",
    "Sona BLW Precision Forgings Limited",
    "Delhivery Limited",
    "Syngene International Limited",
    "CRISIL Limited",
    "General Insurance Corporation of India",
    "Coforge Limited",
    "The Phoenix Mills Limited",
    "JK Cement Limited",
    "Poonawalla Fincorp Limited",
    "GlaxoSmithKline Pharmaceuticals Limited",
    "Max Financial Services Limited",
    "Metro Brands Limited",
    "Motherson Sumi Wiring India Limited",
    "Sumitomo Chemical India Limited",
    "Relaxo Footwears Limited",
    "Navin Fluorine International Limited",
    "SKF India Limited",
    "Central Bank of India",
    "Gland Pharma Limited",
    "Kansai Nerolac Paints Limited",
    "Grindwell Norton Limited",
    "Timken India Limited",
    "IPCA Laboratories Limited",
    "Sundram Fasteners Limited",
    "Atul Limited",
    "Zee Entertainment Enterprises Limited",
    "L&T Finance Holdings Limited",
    "Aditya Birla Fashion and Retail Limited",
    "Apollo Tyres Limited",
    "K.P.R. Mill Limited",
    "ZF Commercial Vehicle Control Systems India Limited",
    "Fortis Healthcare Limited",
    "Aarti Industries Limited",
    "Hatsun Agro Product Limited",
    "Carborundum Universal Limited",
    "Vinati Organics Limited",
    "IIFL Finance Limited",
    "Bata India Limited",
    "Bharat Dynamics Limited",
    "LIC Housing Finance Limited",
    "Rajesh Exports Limited",
    "The Ramco Cements Limited",
    "Endurance Technologies Limited",
    "Devyani International Limited",
    "Punjab & Sind Bank",
    "Dixon Technologies (India) Limited",
    "Kajaria Ceramics Limited",
    "Whirlpool of India Limited",
    "Bank of Maharashtra",
    "Sun TV Network Limited",
    "Piramal Enterprises Limited",
    "Prestige Estates Projects Limited",
    "The New India Assurance Company Limited",
    "Radico Khaitan Limited",
    "Pfizer Limited",
    "Narayana Hrudayalaya Ltd.",
    "Emami Limited",
    "Laurus Labs Limited",
    "Five-Star Business Finance Limited",
    "Ajanta Pharma Limited",
    "Indiamart Intermesh Limited",
    "360 ONE WAM LIMITED",
    "KEI Industries Limited",
    "JB Chemicals & Pharmaceuticals Limited",
    "Dr. Lal Path Labs Ltd.",
    "Jindal Stainless Limited",
    "IRB Infrastructure Developers Limited",
    "Exide Industries Limited",
    "PVR Limited",
    "Gujarat State Petronet Limited",
    "Blue Dart Express Limited",
    "National Aluminium Company Limited",
    "Rail Vikas Nigam Limited",
    "CREDITACCESS GRAMEEN LIMITED",
    "Trident Limited",
    "Hitachi Energy India Limited",
    "Global Health Limited",
    "Gillette India Limited",
    "Ratnamani Metals & Tubes Limited",
    "Elgi Equipments Limited",
    "ICICI Securities Limited",
    "Capri Global Capital Limited",
    "Godrej Industries Limited",
    "Clean Science and Technology Limited",
    "Mazagon Dock Shipbuilders Limited",
    "Mahindra CIE Automotive Limited",
    "Aegis Logistics Limited",
    "Fertilizers and Chemicals Travancore Limited",
    "Blue Star Limited",
    "Sanofi India Limited",
    "Fine Organic Industries Limited",
    "Affle (India) Limited",
    "Glenmark Pharmaceuticals Limited",
    "Nippon Life India Asset Management Limited",
    "SJVN Limited",
    "Redington Limited",
    "Aavas Financiers Limited",
    "IDFC Limited",
    "Finolex Cables Limited",
    "Nuvoco Vistas Corporation Limited",
    "Bajaj Electricals Limited",
    "Aptus Value Housing Finance India Limited",
    "Suven Pharmaceuticals Limited",
    "Aster DM Healthcare Limited",
    "RHI MAGNESITA INDIA LIMITED",
    "KEC International Limited",
    "Sonata Software Limited",
    "Aether Industries Limited",
    "DCM Shriram Limited",
    "Indian Energy Exchange Limited",
    "Happiest Minds Technologies Limited",
    "Krishna Institute of Medical Sciences Limited",
    "Alkyl Amines Chemicals Limited",
    "Cyient Limited",
    "Chambal Fertilizers & Chemicals Limited",
    "Asahi India Glass Limited",
    "Castrol India Limited",
    "Brigade Enterprises Limited",
    "Kalyan Jewellers India Limited",
    "Tata Teleservices (Maharashtra) Limited",
    "V-Guard Industries Limited",
    "NLC India Limited",
    "Lakshmi Machine Works Limited",
    "Triveni Turbine Limited",
    "Finolex Industries Limited",
    "Akzo Nobel India Limited",
    "Manappuram Finance Limited",
    "EIH Limited",
    "Century Plyboards (India) Limited",
    "Natco Pharma Limited",
    "KIOCL Limited",
    "Cholamandalam Financial Holdings Limited",
    "Campus Activewear Limited",
    "Computer Age Management Services Limited",
    "Amara Raja Batteries Limited",
    "Zydus Wellness Limited",
    "BASF India Limited",
    "Tejas Networks Limited",
    "Alembic Pharmaceuticals Limited",
    "Mahanagar Gas Limited",
    "G R Infraprojects Limited",
    "Angel One Limited",
    "Sheela Foam Limited",
    "TTK Prestige Limited",
    "Apar Industries Limited",
    "Hindustan Copper Limited",
    "Central Depository Services (India) Limited",
    "Godfrey Phillips India Limited",
    "Shree Renuka Sugars Limited",
    "City Union Bank Limited",
    "JK Lakshmi Cement Limited",
    "Anupam Rasayan India Limited",
    "Mangalore Refinery and Petrochemicals Limited",
    "The Great Eastern Shipping Company Limited",
    "Poly Medicure Limited",
    "NMDC Steel Limited",
    "Bikaji Foods International Limited",
    "Motilal Oswal Financial Services Limited",
    "Aditya Birla Sun Life AMC Limited",
    "CESC Limited",
    "Tata Investment Corporation Limited",
    "Allcargo Logistics Limited",
    "Kalpataru Power Transmission Limited",
    "PNB Housing Finance Limited",
    "Housing & Urban Development Corporation Limited",
    "ITI Limited",
    "ROUTE MOBILE LIMITED",
    "RITES Limited",
    "Vardhman Textiles Limited",
    "RBL Bank Limited",
    "HFCL Limited",
    "Karur Vysya Bank Limited",
    "Cera Sanitaryware Limited",
    "EID Parry India Limited",
    "Ingersoll Rand (India) Limited",
    "Galaxy Surfactants Limited",
    "Piramal Pharma Limited",
    "UTI Asset Management Company Limited",
    "KRBL Limited",
    "Raymond Limited",
    "AstraZeneca Pharma India Limited",
    "VIP Industries Limited",
    "Archean Chemical Industries Limited",
    "Balrampur Chini Mills Limited",
    "Suzlon Energy Limited",
    "Godrej Agrovet Limited",
    "Gujarat Narmada Valley Fertilizers and Chemicals Limited",
    "Eris Lifesciences Limited",
    "Procter & Gamble Health Limited",
    "Medplus Health Services Limited",
    "Sapphire Foods India Limited",
    "Data Patterns (India) Limited",
    "Sundaram Clayton Limited",
    "JBM Auto Limited",
    "Easy Trip Planners Limited",
    "CCL Products (India) Limited",
    "Equitas Small Finance Bank Limited",
    "Chalet Hotels Limited",
    "Rainbow Childrens Medicare Limited",
    "PNC Infratech Limited",
    "Firstsource Solutions Limited",
    "Ksb Limited",
    "BIRLASOFT LIMITED",
    "KNR Constructions Limited",
    "Shoppers Stop Limited",
    "Symphony Limited",
    "Century Textiles & Industries Limited",
    "Can Fin Homes Limited",
    "Granules India Limited",
    "Tanla Platforms Limited",
    "Jyothy Labs Limited",
    "Supreme Petrochem Limited",
    "Deepak Fertilizers and Petrochemicals Corporation Limited",
    "Craftsman Automation Limited",
    "Birla Corporation Limited",
    "BLS International Services Limited",
    "Shyam Metalics and Energy Limited",
    "NCC Limited",
    "GMM Pfaudler Limited",
    "Latent View Analytics Limited",
    "Usha Martin Limited",
    "Home First Finance Company India Limited",
    "JK Paper Limited",
    "Tamilnad Mercantile Bank Limited",
    "Jindal Worldwide Limited",
    "Metropolis Healthcare Limited",
    "Saregama India Limited",
    "NBCC (India) Limited",
    "eClerx Services Limited",
    "Balaji Amines Limited",
    "Welspun India Limited",
    "Praj Industries Limited",
    "Cochin Shipyard Limited",
    "Zensar Technologies Limited",
    "Amber Enterprises India Limited",
    "Lemon Tree Hotels Limited",
    "Prince Pipes And Fittings Limited",
    "Triveni Engineering & Industries Limited",
    "Garware Technical Fibres Limited",
    "Laxmi Organic Industries Limited",
    "Sterlite Technologies Limited",
    "CEAT Limited",
    "BSE Limited",
    "Sun Pharma Advanced Research Company Limited",
    "Alok Industries Limited",
    "Orient Electric Limited",
    "The India Cements Limited",
    "Jubilant Ingrevia Limited",
    "Kirloskar Oil Engines Limited",
    "TCI Express Limited",
    "JM Financial Limited",
    "Network18 Media & Investments Limited",
    "Bombay Burmah Trading Corporation Limited",
    "Swan Energy Limited",
    "Gujarat Pipavav Port Limited",
    "Kaynes Technology India Limited",
    "VRL Logistics Limited",
    "Intellect Design Arena Limited",
    "Sterling and Wilson Renewable Energy Limited",
    "Chemplast Sanmar Limited",
    "Quess Corp Limited",
    "Rolex Rings Limited",
    "Mahindra Lifespace Developers Limited",
    "Esab India Limited",
    "Mahindra Holidays & Resorts India Limited",
    "Go Fashion (India) Limited",
    "Hinduja Global Solutions Limited",
    "BOROSIL RENEWABLES LIMITED",
    "Gujarat Ambuja Exports Limited",
    "C.E. Info Systems Limited",
    "Prism Johnson Limited",
    "Keystone Realtors Limited",
    "Ircon International Limited",
    "Rashtriya Chemicals and Fertilizers Limited",
    "Welspun Corp Limited",
    "BEML Limited",
    "Garden Reach Shipbuilders & Engineers Limited",
    "EPL Limited",
    "Minda Corporation Limited",
    "Graphite India Limited",
    "H.G. Infra Engineering Limited",
    "Olectra Greentech Limited",
    "Reliance Infrastructure Limited",
    "Just Dial Limited",
    "Rain Industries Limited",
    "ION Exchange (India) Limited",
    "Edelweiss Financial Services Limited",
    "Ujjivan Small Finance Bank Limited",
    "TV18 Broadcast Limited",
    "Godawari Power And Ispat limited",
    "Mtar Technologies Limited",
    "Transport Corporation of India Limited",
    "RattanIndia Enterprises Limited",
    "VST Industries Limited",
    "Safari Industries (India) Limited",
    "Action Construction Equipment Limited",
    "Maharashtra Scooters Limited",
    "Delta Corp Limited",
    "Glenmark Life Sciences Limited",
    "GHCL Limited",
    "Indigo Paints Limited",
    "Maharashtra Seamless Limited",
    "Suprajit Engineering Limited",
    "Kfin Technologies Limited",
    "Gujarat State Fertilizers & Chemicals Limited",
    "The Jammu & Kashmir Bank Limited",
    "Religare Enterprises Limited",
    "Mastek Limited",
    "SIS LIMITED",
    "Jindal Saw Limited",
    "Tega Industries Limited",
    "Syrma SGS Technology Limited",
    "Avanti Feeds Limited",
    "Star Cement Limited",
    "Indiabulls Housing Finance Limited",
    "Ramkrishna Forgings Limited",
    "Caplin Point Laboratories Limited",
    "Vaibhav Global Limited",
    "Restaurant Brands Asia Limited",
    "Jubilant Pharmova Limited",
    "Sharda Cropchem Limited",
    "NIIT Limited",
    "PCBL LIMITED",
    "MAS Financial Services Limited",
    "Shipping Corporation Of India Limited",
    "PDS Limited",
    "Gujarat Alkalies and Chemicals Limited",
    "Elecon Engineering Company Limited",
    "CMS Info Systems Limited",
    "V-Mart Retail Limited",
    "ICRA Limited",
    "JSW Holdings Limited",
    "FDC Limited",
    "CSB Bank Limited",
    "The Karnataka Bank Limited",
    "MMTC Limited",
    "Engineers India Limited",
    "Sunteck Realty Limited",
    "Privi Speciality Chemicals Limited",
    "Paradeep Phosphates Limited",
    "Sobha Limited",
    "Fusion Micro Finance Limited",
    "Gujarat Mineral Development Corporation Limited",
    "Vijaya Diagnostic Centre Limited",
    "Jamna Auto Industries Limited",
    "Anant Raj Limited",
    "Sansera Engineering Limited",
    "Meghmani Finechem Limited",
    "Ahluwalia Contracts (India) Limited",
    "Bombay Super Hybrid Seeds Limited",
    "Tata Coffee Limited",
    "Teamlease Services Limited",
    "JK Tyre & Industries Limited",
    "Varroc Engineering Limited",
    "Greenlam Industries Limited",
    "Jaiprakash Power Ventures Limited",
    "Infibeam Avenues Limited",
    "Spandana Sphoorty Financial Limited",
    "Himadri Speciality Chemical Limited",
    "Bharat Rasayan Limited",
    "Rajratan Global Wire Limited",
    "La Opala RG Limited",
    "Sarda Energy & Minerals Limited",
    "Rallis India Limited",
    "Borosil Limited",
    "Rategain Travel Technologies Limited",
    "Schneider Electric Infrastructure Limited",
    "Reliance Power Limited",
    "Arvind Fashions Limited",
    "Tatva Chintan Pharma Chem Limited",
    "Power Mech Projects Limited",
    "Healthcare Global Enterprises Limited",
    "Nesco Limited",
    "HeidelbergCement India Limited",
    "Techno Electric & Engineering Company Limited",
    "Polyplex Corporation Limited",
    "Surya Roshni Limited",
    "Automotive Axles Limited",
    "Jupiter Wagons Limited",
    "National Fertilizers Limited",
    "HEG Limited",
    "Raj Rayon Industries Limited",
    "Chennai Petroleum Corporation Limited",
    "West Coast Paper Mills Limited",
    "Lux Industries Limited",
    "Hikal Limited",
    "Mishra Dhatu Nigam Limited",
    "HLE Glascoat Limited",
    "Share India Securities Limited",
    "NOCIL Limited",
    "Nazara Technologies Limited",
    "Bannari Amman Sugars Limited",
    "Anand Rathi Wealth Limited",
    "Prudent Corporate Advisory Services Limited",
    "Gravita India Limited",
    "Greenpanel Industries Limited",
    "Vesuvius India Limited",
    "DCB Bank Limited",
    "Rossari Biotech Limited",
    "Responsive Industries Limited",
    "The Tinplate Company of India Limited",
    "Kirloskar Brothers Limited",
    "Railtel Corporation Of India Limited",
    "Ami Organics Limited",
    "Isgec Heavy Engineering Limited",
    "Neogen Chemicals Limited",
    "Marksans Pharma Limited",
    "NAVA LIMITED",
    "Newgen Software Technologies Limited",
    "Mrs. Bectors Food Specialities Limited",
    "Titagarh Wagons Limited",
    "Aarti Drugs Limited",
    "Ujjivan Financial Services Limited",
    "Gateway Distriparks Limited",
    "Sula Vineyards Limited",
    "LT Foods Limited",
    "The South Indian Bank Limited",
    "GE T&D India Limited",
    "Harsha Engineers International Limited",
    "PG Electroplast Limited",
    "R Systems International Limited",
    "Indoco Remedies Limited",
    "Mold-Tek Packaging Limited",
    "IFB Industries Limited",
    "Shivalik Bimetal Controls Limited",
    "Brightcom Group Limited",
    "Greaves Cotton Limited",
    "MOIL Limited",
    "Tata Steel Long Products Limited",
    "Tarsons Products Limited",
    "Shanthi Gears Limited",
    "Choice International Limited",
    "Technocraft Industries (India) Limited",
    "Dhanuka Agritech Limited",
    "Johnson Controls - Hitachi Air Conditioning India Limited",
    "Dodla Dairy Limited",
    "Dalmia Bharat Sugar and Industries Limited",
    "Voltamp Transformers Limited",
    "Astec LifeSciences Limited",
    "Sudarshan Chemical Industries Limited",
    "Kaveri Seed Company Limited",
    "Sunflag Iron And Steel Company Limited",
    "Indiabulls Real Estate Limited",
    "Thomas Cook (India) Limited",
    "HBL Power Systems Limited",
    "Inox Wind Limited",
    "Nilkamal Limited",
    "Zen Technologies Limited",
    "TCNS Clothing Co. Limited",
    "Advanced Enzyme Technologies Limited",
    "Strides Pharma Science Limited",
    "Fineotex Chemical Limited",
    "Kewal Kiran Clothing Limited",
    "Hindware Home Innovation Limited",
    "Mahindra Logistics Limited",
    "Electronics Mart India Limited",
    "Jtekt India Limited",
    "Man Infraconstruction Limited",
    "India Tourism Development Corporation Limited",
    "Apcotex Industries Limited",
    "Pricol Limited",
    "PTC India Limited",
    "Aarti Pharmalabs Limited",
    "Madhya Bharat Agro Products Limited",
    "Sagar Cements Limited",
    "TD Power Systems Limited",
    "Jai Corp Limited",
    "Dilip Buildcon Limited",
    "Barbeque Nation Hospitality Limited",
    "Uniparts India Limited",
    "UFLEX Limited",
    "Wonderla Holidays Limited",
    "PSP Projects Limited",
    "Kirloskar Industries Limited",
    "India Pesticides Limited",
    "Dish TV India Limited",
    "Tata Metaliks Limited",
    "Paisalo Digital Limited",
    "Prime Focus Limited",
    "Hemisphere Properties India Limited",
    "LG Balakrishnan & Bros Limited",
    "Maithan Alloys Limited",
    "Steel Strips Wheels Limited",
    "Neuland Laboratories Limited",
    "Hathway Cable & Datacom Limited",
    "Thyrocare Technologies Limited",
    "Orient Cement Limited",
    "Dreamfolks Services Limited",
    "Ethos Limited",
    "Globus Spirits Limited",
    "Ganesh Housing Corporation Limited",
    "Arvind Limited",
    "Indo Count Industries Limited",
    "Shriram Pistons & Rings Limited",
    "Wockhardt Limited",
    "D B Realty Limited",
    "ISMT Limited",
    "Jindal Poly Films Limited",
    "VA Tech Wabag Limited",
    "Bajaj Consumer Care Limited",
    "Genus Power Infrastructures Limited",
    "Butterfly Gandhimathi Appliances Limited",
    "Navneet Education Limited",
    "Gokaldas Exports Limited",
    "Apollo Pipes Limited",
    "Landmark Cars Limited",
    "IFCI Limited",
    "Agro Tech Foods Limited",
    "Eveready Industries India Limited",
    "AGI Greenpac Limited",
    "Tilaknagar Industries Limited",
    "Ashoka Buildcon Limited",
    "Somany Ceramics Limited",
    "Hindustan Construction Company Limited",
    "Jain Irrigation Systems Limited",
    "Vindhya Telelinks Limited",
    "Fiem Industries Limited",
    "Tasty Bite Eatables Limited",
    "Jayaswal Neco Industries Limited",
    "Honda India Power Products Limited",
    "Unichem Laboratories Limited",
    "Mukand Limited",
    "Cigniti Technologies Limited",
    "MM Forgings Limited",
    "Venky's (India) Limited",
    "Ramky Infrastructure Limited",
    "Divgi Torqtransfer Systems Limited",
    "Camlin Fine Sciences Limited",
    "Shilpa Medicare Limited",
    "Gulf Oil Lubricants India Limited",
    "Meghmani Organics Limited",
    "Dollar Industries Limited",
    "V.S.T Tillers Tractors Limited",
    "Subros Limited",
    "Dishman Carbogen Amcis Limited",
    "Gabriel India Limited",
    "Max Ventures and Industries Limited",
    "Siyaram Silk Mills Limited",
    "TVS Srichakra Limited",
    "Astra Microwave Products Limited",
    "J.Kumar Infraprojects Limited",
    "Jagran Prakashan Limited",
    "Electrosteel Castings Limited",
    "CARE Ratings Limited",
    "India Glycols Limited",
    "Balmer Lawrie & Company Limited",
    "Kolte - Patil Developers Limited",
    "Imagicaaworld Entertainment Limited",
    "Welspun Enterprises Limited",
    "TIPS Industries Limited",
    "Swaraj Engines Limited",
    "Mayur Uniquoters Ltd",
    "Ganesha Ecosphere Limited",
    "Paras Defence and Space Technologies Limited",
    "Lumax Auto Technologies Limited",
    "Accelya Solutions India Limited",
    "Kesoram Industries Limited",
    "Cartrade Tech Limited",
    "MPS Limited",
    "Sequent Scientific Limited",
    "HIL Limited",
    "Gufic Biosciences Limited",
    "ITD Cementation India Limited",
    "Pilani Investment and Industries Corporation Limited",
    "Mstc Limited",
    "Lloyds Steels Industries Limited",
    "Panama Petrochem Limited",
    "Optiemus Infracom Limited",
    "Sirca Paints India Limited",
    "Thirumalai Chemicals Limited",
    "Dynamatic Technologies Limited",
    "Sundaram Finance Holdings Limited",
    "Time Technoplast Limited",
    "D.B.Corp Limited",
    "Ashiana Housing Limited",
    "Confidence Petroleum India Limited",
    "Prataap Snacks Limited",
    "Nucleus Software Exports Limited",
    "Greenply Industries Limited",
    "Jaiprakash Associates Limited",
    "Wendt (India) Limited",
    "Fino Payments Bank Limited",
    "Federal-Mogul Goetze (India) Limited.",
    "Sanghi Industries Limited",
    "Vakrangee Limited",
    "GNA Axles Limited",
    "Amrutanjan Health Care Limited",
    "eMudhra Limited",
    "Datamatics Global Services Limited",
    "Sharda Motor Industries Limited",
    "IOL Chemicals and Pharmaceuticals Limited",
    "Lumax Industries Limited",
    "Bajaj Hindusthan Sugar Limited",
    "Stylam Industries Limited",
    "ANDHRA PAPER LIMITED",
    "Savita Oil Technologies Limited",
    "ADF Foods Limited",
    "Vidhi Specialty Food Ingredients Limited",
    "Kabra Extrusion Technik Limited",
    "Bhansali Engineering Polymers Limited",
    "Rupa & Company Limited",
    "NACL Industries Limited",
    "Vardhman Special Steels Limited",
    "Vishnu Chemicals Limited",
    "Dwarikesh Sugar Industries Limited",
    "Dhani Services Limited",
    "Banco Products (I) Limited",
    "Kingfa Science & Technology (India) Limited",
    "Subex Limited",
    "Hindustan Oil Exploration Company Limited",
    "RattanIndia Power Limited",
    "Vadilal Industries Limited",
    "Black Box Limited",
    "Orchid Pharma Limited",
    "Puravankara Limited",
    "COSMO FIRST LIMITED",
    "Indian Metals & Ferro Alloys Limited",
    "Supriya Lifescience Limited",
    "Saksoft Limited",
    "IIFL Securities Limited",
    "Sanghvi Movers Limited",
    "Gokul Agro Resources Limited",
    "Alembic Limited",
    "Venus Pipes & Tubes Limited",
    "Seamec Limited",
    "Tamil Nadu Newsprint & Papers Limited",
    "KPI Green Energy Limited",
    "BF Investment Limited",
    "Seshasayee Paper and Boards Limited",
    "Dhampur Sugar Mills Limited",
    "The Andhra Sugars Limited",
    "Kiri Industries Limited",
    "TTK Healthcare Limited",
    "CARYSIL LIMITED",
    "GOCL Corporation Limited",
    "JSW Ispat Special Products Limited",
    "Sterling Tools Limited",
    "Shalby Limited",
    "Tide Water Oil Company (India) Limited",
    "Krsnaa Diagnostics Limited",
    "Krishana Phoschem Limited",
    "Huhtamaki India Limited",
    "Bharat Bijlee Limited",
    "SEPC Limited",
    "The Orissa Minerals Development Company Limited",
    "Filatex India Limited",
    "Thejo Engineering Limited",
    "Aptech Limited",
    "Oriental Hotels Limited",
    "DCX Systems Limited",
    "Foseco India Limited",
    "Goldiam International Limited",
    "Shankara Building Products Limited",
    "Insecticides (India) Limited",
    "Thangamayil Jewellery Limited",
    "S H Kelkar and Company Limited",
    "Texmaco Rail & Engineering Limited",
    "Cantabil Retail India Limited",
    "Gallantt Ispat Limited",
    "Heritage Foods Limited",
    "KCP Limited",
    "Morepen Laboratories Limited",
    "GATI Limited",
    "Rama Steel Tubes Limited",
    "Hester Biosciences Limited",
    "NRB Bearing Limited",
    "IndoStar Capital Finance Limited",
    "Monte Carlo Fashions Limited",
    "Kalyani Steels Limited",
    "KDDL Limited",
    "TCPL Packaging Limited",
    "Marathon Nextgen Realty Limited",
    "Arvind SmartSpaces Limited",
    "DCW Limited",
    "Den Networks Limited",
    "STEEL EXCHANGE INDIA LIMITED",
    "EIH Associated Hotels Limited",
    "IG Petrochemicals Limited",
    "Nitin Spinners Limited",
    "Expleo Solutions Limited",
    "Veranda Learning Solutions Limited",
    "Salasar Techno Engineering Limited",
    "Styrenix Performance Materials Limited",
    "Ador Welding Limited",
    "Bhagiradha Chemicals & Industries Limited",
    "PC Jeweller Limited",
    "Genesys International Corporation Limited",
    "Stove Kraft Limited",
    "Rane Holdings Limited",
    "New Delhi Television Limited",
    "Xpro India Limited",
    "Manorama Industries Limited",
    "Garware Hi-Tech Films Limited",
    "Hariom Pipe Industries Limited",
    "Sandhar Technologies Limited",
    "AVT Natural Products Limited",
    "Inox Wind Energy Limited",
    "S.J.S. Enterprises Limited",
    "Everest Industries Limited",
    "Fairchem Organics Limited",
    "Sasken Technologies Limited",
    "Oriental Aromatics Limited",
    "NELCO Limited",
    "Reliance Industrial Infrastructure Limited",
    "Solara Active Pharma Sciences Limited",
    "Taj GVK Hotels & Resorts Limited",
    "Bombay Dyeing & Mfg Company Limited",
    "Mangalore Chemicals & Fertilizers Limited",
    "Goodluck India Limited",
    "RPG Life Sciences Limited",
    "Patel Engineering Limited",
    "Southern Petrochemicals Industries Corporation Limited",
    "Inox Green Energy Services Limited",
    "Gujarat Industries Power Company Limited",
    "Universal Cables Limited",
    "Nalwa Sons Investments Limited",
    "HMT Limited",
    "Matrimony.Com Limited",
    "Mahanagar Telephone Nigam Limited",
    "Som Distilleries & Breweries Limited",
    "Valiant Organics Limited",
  ];



  useEffect(() => {
    if (userDistrict !== 'Select District') {
      setUserDistrictSuccessIcon('check');
      setUserDistrictSuccessIconColor('#238732');
    } else {
      setUserDistrictSuccessIcon('x');
      setUserDistrictSuccessIconColor('#8c0a1b');
    }
  }, [userDistrict]);

  useEffect(() => {
    if (userBatchJoined !== 'Select Year') {
      setUserJoinedBatchSuccessIcon('check');
      setUserJoinedBatchSuccessIconColor('#238732');
    } else {
      setUserJoinedBatchSuccessIcon('x');
      setUserJoinedBatchSuccessIconColor('#8c0a1b');
    }
  }, [userBatchJoined]);

  useEffect(() => {
    if (userPassedOut !== 'Select Year') {
      setUserPassedOutBatchSuccessIcon('check');
      setUserPassedOutBatchSuccessIconColor('#238732');
    } else {
      setUserPassedOutBatchSuccessIcon('x');
      setUserPassedOutBatchSuccessIconColor('#8c0a1b');
    }
  }, [userPassedOut]);

  useEffect(() => {
    if (userDegree !== 'Select Degree') {
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
    setFilteredComapanyData(userCompaniesDataRedux.filter(item => item.toLowerCase().includes(userPlacedCompanyOverlay.toLowerCase())))
  }, [userPlacedCompanyOverlay])

  const selectedCompanyFromOverlay = (company, newCompany = false) => {
    setIsUserCompanyVerified(true);
    if (newCompany) {
      addComapnyInDatabase(company);
    } else {
      setUserPlacedCompany(company);
    }
    setShowUserCompanyOverlay(false);
  }

  const addComapnyInDatabase = (company) => {
    // userCompanyList.push(company);
    setUserPlacedCompany(company);
  }

  const showUserCompanyFun=()=>{
    setShowUserCompanyComponent(prevState => !prevState)
    setUserPlacedCompany('');
  }

  const fabRightButtonFun = () => {
    // const data = {
    //   Place: userPlace,
    //   Pincode: userPincode,
    //   Post: userPost,
    //   Taluk: userTaluk,
    //   District: userDistrict,
    //   State: userState,
    //   Country: userCountry
    // }
    // dispatch(AddressDetailsFun(data));
    props.fabRightButtonFun();
  }

  const fabLeftButtonFun = () => {
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
                      {userDistrict}
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
                      {userBatchJoined}
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
                      {userPassedOut}
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
                      {userDegree}
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
                    title={userPlacedCompany.length>0 ? userPlacedCompany:'Company Name'}
                    buttonStyle={Styles.buttonCompany}
                    inputContainerStyle={Styles.inputContainer}
                    onPress={() => setShowUserCompanyOverlay(true)}
                    rightIcon={<Icon name='user' type="feather" color='white' />}
                  />
                  // <Input


                  //   label='Company Name'
                  //   labelStyle={Styles.lableStyle}
                  //   onFocus={() => setShowUserCompanyOverlay(true)}
                  //   onBlur={() => setShowUserCompanyOverlay(false)}
                  //   onPressIn ={() => setShowUserCompanyOverlay(true)}
                  //   value={userPlacedCompany}

                  //   />
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
                            onPress={() => selectedCompanyFromOverlay(userPlacedCompanyOverlay, true)} />
                        </View>
                        )
                    }
                    keyExtractor={(item, index) => index.toString()}
                    style={{ maxHeight: screenHeightOrginal * 0.4 }}
                  />

                </View>
              </TouchableOpacity>

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