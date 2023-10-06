import { View, Text } from 'react-native'
import React from 'react'
import { FAB, Icon } from 'react-native-elements'
import { useState } from 'react';

export default function Company(props) {


  const [showFabRight, setShowFabRight] = useState(false);



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
    <View>
      <Text>Company</Text>

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