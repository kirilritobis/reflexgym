import { useInjection } from "inversify-react";
import React, { FunctionComponent, useState } from "react";
import {View, ScrollView, Image, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { IAuthService } from "../../dependencies/model";
import { TYPES } from "../../dependencies/types";
import "reflect-metadata";


interface SignInProps {
    navigation: any;
}

const SignIn:FunctionComponent<SignInProps> = ({navigation}) => {
const { height} = useWindowDimensions();
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const authService = useInjection<IAuthService>(TYPES.AuthService);

const onSignInPressed = async () => {
    try {
        await authService.login(email, password);
        navigation.navigate("Homepage");
    } catch (error) {
        console.warn("Login error.");
    }
}

const onSignUpPressed = async () => {
    navigation.navigate("SignUp");
}

const onForgotPasswordPressed = async () => {
    navigation.navigate("ForgotPassword");
}

    return (
        <ScrollView>
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
            <CustomInput placeholder="Email" value={email} setValue={setEmail} />
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
            <CustomButton  text="Sign In" onPress={onSignInPressed} type="PRIMARY" />
            <CustomButton  text="Forgot password" onPress={onForgotPasswordPressed} type="TERTIARY" />
            <CustomButton  text="Don't have an account? Create one" onPress={onSignUpPressed} type="TERTIARY" />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },
    logo: {
        width: "70%",
        maxWidth: 500,
        maxHeight: 200,
    }
})

export default SignIn;

