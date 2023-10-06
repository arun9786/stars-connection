import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { Styles } from "../Styles/OtpVerificationCss";

export default function OtpVerification(props) {

    const [userOtp, setUserOtp] = useState('');
    const [otpVisible, setOtpVisible] = useState(true);
    const [otpEyeIcon, setOtpEyeIcon] = useState('eye');
    const [userOtpSuccessIcon, setUserOtpSuccessIcon] = useState('');
    const [userOtpSuccessIconColor, setUserOtpSuccessIconColor] = useState('');

    const [resendOtp, setResendOtp] = useState(false);
    const [otpResendTime, setOtpResendTime] = useState(5);

    useEffect(() => {
        let interval;
        if(!resendOtp && otpResendTime>0){
            interval=setInterval(()=>{
                setOtpResendTime(otpResendTime-1);
            },1000);
        }else if(otpResendTime<=0){
            setResendOtp(true);
            clearInterval(interval);
        }
        return ()=>clearInterval(interval);
    },[otpResendTime]);

    useEffect(() => {
        if (userOtp.length === 6) {
            setUserOtpSuccessIcon('check');
            setUserOtpSuccessIconColor('#238732');
        } else if (userOtp.length > 0) {
            setUserOtpSuccessIcon('x');
            setUserOtpSuccessIconColor('#8c0a1b');
        } else {
            setUserOtpSuccessIcon('');
            setUserOtpSuccessIconColor('');
        }
    }, [userOtp]);

    useEffect(() => {
        if (otpVisible) {
            setOtpEyeIcon('eye');
        } else {
            setOtpEyeIcon('eye-off');
        }
    }, [otpVisible]);

    const OTPTimerFun=()=>{
        
    }

    const resendOtpFun=()=>{
        setOtpResendTime(5);
        setResendOtp(false);
        
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={Styles.contaier}>
                    <Input placeholder="Enter 6 digit Otp"
                        style={Styles.input}
                        secureTextEntry={!otpVisible}
                        inputContainerStyle={Styles.inputContainer}
                        label='OTP'
                        labelStyle={Styles.lableStyle}
                        leftIcon={<Icon name="key" type='feather' color='#87888a' />}
                        keyboardType='numeric'
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name={userOtpSuccessIcon} type="feather" color={userOtpSuccessIconColor} />
                                <Icon name={otpEyeIcon} type="feather" color='#737475'
                                    onPress={() => setOtpVisible(!otpVisible)} />
                            </View>
                        }
                        onChangeText={(text) => setUserOtp(text)}
                        value={userOtp}
                    />

                    <Button title='RESENT OTP'
                        disabled={!resendOtp}
                        icon={<Icon name='repeat' type='feather' color='white' style={Styles.buttonIcon} />}
                        iconPosition='right'
                        buttonStyle={Styles.buttonOtp}
                        onPress={resendOtpFun}
                    />

                    {!resendOtp && <Text style={Styles.otpTimer}>Resend OTP in {otpResendTime} sec</Text>}

                    <Button title='REGISTER'
                        icon={<Icon name='fast-forward' type='feather' color='white' style={Styles.buttonIcon} />}
                        iconPosition='right'
                        loading={false} buttonStyle={Styles.buttonRegister}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}