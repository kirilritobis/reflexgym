import { useInjection } from "inversify-react";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import {View, ScrollView, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { IAuthService } from "../../dependencies/model";
import { TYPES } from "../../dependencies/types";
import { confirmAccount, resendCode } from "../../services/AuthService/AuthService";
import { AuthContext, extractUser } from "../../services/ContextService/ContextService";
import * as SecureStore from 'expo-secure-store';

interface ConfirmEmailProps {
    navigation: any;
    route: any;
}

const ConfirmEmail: FunctionComponent<ConfirmEmailProps> = ({navigation, route}) => {
const [code, setCode] = useState<string>("");
const [timer, setTimer] = useState<number>(10);
const { setLoginState } = useContext(AuthContext)

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
        const response = await confirmAccount(code);
        const user = extractUser(response.accessToken) 
        setLoginState({isLoggedIn: true, user})
        await SecureStore.setItemAsync("token", response.accessToken);

        navigation.navigate("Homepage");
    } catch (error) {
        console.warn("wrong code");
    }
}

const onSignInPressed = () => {
    navigation.navigate("SignIn")
}

const onResendPressed = async () => {
    try {
        await resendCode(route.params.email);
        setTimer(10);
    } catch (error) {
        console.warn("There was a problem with resending code.")
    }
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

