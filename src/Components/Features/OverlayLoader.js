import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Overlay, Text } from "react-native-elements";
import { Styles } from "../../Styles/Features/OverlayLoaderCss";
import appColors from '../../Others/appColors.json'

const OverlayLoader = ({content}) => {
    return (
        <View>
            <Overlay overlayStyle={Styles.overlayStyle}>
                <Text style={Styles.overlayPleaseWait}>
                    Please Wait...
                </Text>
                <Text style={Styles.overlayContent}>
                    {content}
                </Text>
                <ActivityIndicator size="large" style={Styles.overlayActivityIndicator}
                    color={appColors.basicRed} animating={true} />
            </Overlay>
        </View>
    )
}

export default OverlayLoader;