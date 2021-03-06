import { useInjection } from "inversify-react";
import React, { FunctionComponent, useContext, useState } from "react";
import {View, ScrollView, Image, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { IAuthService } from "../../dependencies/model";
import { TYPES } from "../../dependencies/types";
import "reflect-metadata";
import { login } from "../../services/AuthService/AuthService";
import { AuthContext, extractUser } from "../../services/ContextService/ContextService";
import * as SecureStore from 'expo-secure-store';


interface SignInProps {
    navigation: any;
}

const SignIn:FunctionComponent<SignInProps> = ({navigation}) => {
const { height} = useWindowDimensions();
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const { setLoginState } = useContext(AuthContext)
// const authService = useInjection<IAuthService>(TYPES.AuthService);

const onSignInPressed = async () => {
    try {
        const loginRes = await login(email, password);
        if(!loginRes.activated) {
            navigation.navigate("ConfirmEmail", {email})
        } else {
            const user = extractUser(loginRes.accessToken) 
            setLoginState({isLoggedIn: true, user})
            await SecureStore.setItemAsync("token", loginRes.accessToken);
            
            navigation.navigate("Homepage");
        }
    } catch (error: any) {
        console.warn(error.message)
        // console.warn("Login error.");
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

