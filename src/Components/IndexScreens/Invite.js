import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { Provider } from "react-native-paper";

import appColors from '../../Others/appColors.json'
import { Appbar } from "react-native-paper";

const Invite=()=> {
  return (
    <Provider>
        <Appbar.Header style={{backgroundColor:appColors.basicRed}}>
                <Appbar.Content title="Invite & Get Rewards" color='white' />
            </Appbar.Header>
    </Provider>
    
  )
}

export default Invite
