import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Overlay, Text } from "react-native-elements";
import { Styles } from "../../Styles/Features/OverlayLoaderCss";

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
                    color='#2e4dbf' animating={true} />
            </Overlay>
        </View>
    )
}

export default OverlayLoader;