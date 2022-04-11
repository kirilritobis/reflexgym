import { useInjection } from "inversify-react";
import React, { FunctionComponent, useEffect, useState } from "react";
import {View, ScrollView, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { IAuthService } from "../../dependencies/model";
import { TYPES } from "../../dependencies/types";

interface ConfirmEmailProps {
    navigation: any;
}

const ConfirmEmail: FunctionComponent<ConfirmEmailProps> = ({navigation}) => {
const [code, setCode] = useState<string>("");
const [timer, setTimer] = useState<number>(10);
const authService = useInjection<IAuthService>(TYPES.AuthService);

useEffect(() => {
    let interval = setInterval(() => {
        setTimer(lastTimerCount => {
          if(lastTimerCount <= 1) clearInterval(interval);
          return lastTimerCount - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, []);

const onConfirmPressed = async () => {
    try {
        await authService.confirmAccount(code);
        navigation.navigate("Homepage");
    } catch (error) {
        console.warn("wrong code");
    }
}

const onSignInPressed = () => {
    navigation.navigate("SignIn")
}

const onResendPressed = () => {
    console.warn("resend")
}

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your email</Text>
            <CustomInput placeholder="Enter your confirmation code" value={code} setValue={setCode} />
            <CustomButton  text="Confirm" onPress={onConfirmPressed} type="PRIMARY" />
            <Text style={styles.expiration}>The code will expire in {timer} seconds</Text>
            <CustomButton  text="Resend code" onPress={onResendPressed} type="SECONDARY" disabled={timer>0}/>
            <CustomButton  text="Back to Sign in" onPress={onSignInPressed} type="TERTIARY" />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },
    expiration: {
        fontSize: 12,
        color: "#051C60",
        margin: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,
    }
})

export default ConfirmEmail;

