import { useInjection } from "inversify-react";
import React, { FunctionComponent, useState } from "react";
import {View, ScrollView, Text, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { IAuthService } from "../../dependencies/model";
import { TYPES } from "../../dependencies/types";

interface SignUpProps {
    navigation: any;
}

const SignUp: FunctionComponent<SignUpProps> = ({navigation}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const authService = useInjection<IAuthService>(TYPES.AuthService);

const onSignInPressed = () => {
    navigation.navigate("SignIn")
}

const onRegisterPressed = async () => {
    try {
        await authService.register(email, password, phoneNumber);
        console.warn(process.env.PUBLIC_IP);
    } catch (error: any) {
        const test = error;
        console.warn(error.message)
    }
}

const onTestPressed = () => {
    navigation.navigate("ConfirmEmail")
}

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} />
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
            <CustomInput placeholder="Repeat Password" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry />
            <CustomInput placeholder="Phone Number" value={phoneNumber} setValue={setPhoneNumber} />
            <CustomButton  text="Register" onPress={onRegisterPressed} type="PRIMARY" />
            <CustomButton  text="Have an account? Sign in" onPress={onSignInPressed} type="TERTIARY" />
            <CustomButton  text="testtest" onPress={onTestPressed} type="TERTIARY" />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,
    }
})

export default SignUp;

