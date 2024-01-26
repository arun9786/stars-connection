import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Styles } from '../../Styles/Features/OTPVerificationOverlayCss'
import { Button, Overlay } from 'react-native-elements'
import OTPTextView from 'react-native-otp-textinput'

const OTPVerificationOverlay=({setShowOTPOvelay, phone, otpVerifyButtonDisabled, setEntertedOtp, verifyOTP, sendOTPtoUserMobile})=> {
    return (
        <View>
            <Overlay overlayStyle={Styles.otpOverlayStyle}>
                <Text onPress={() => setShowOTPOvelay(false)} style={Styles.cancelButtonText}>x</Text>

                <View style={Styles.otpOverlayContainerStyle}>
                    <Text style={Styles.otpOverlayTitle}>Mobile Verification</Text>
                    <Text style={Styles.otpOverlayTitleHint}>OTP has sent to {phone}</Text>
                    <View style={Styles.otpInputContainerStyle}>
                        <OTPTextView
                            autoFocus
                            inputCount={6}
                            tintColor='#670d94'
                            containerStyle={Styles.otpContainerStyle}
                            textInputStyle={Styles.otpTextInputStyle}
                            handleTextChange={(text) => setEntertedOtp(text)} />

                        <Button
                            disabled={otpVerifyButtonDisabled}
                            title='Verify OTP'
                            buttonStyle={Styles.otpContainerVerifyButton}
                            onPress={() => verifyOTP()}
                        />
                    </View>
                    <Text style={Styles.otpOverlayResendOTPHint} >Didn't you receive any code?</Text>
                    <TouchableOpacity>
                        <Text style={Styles.otpOverlayResendOTP} onPress={() => sendOTPtoUserMobile()}>Resend New Code</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        </View>
    )
}

export default OTPVerificationOverlay;