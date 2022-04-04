import React, { FunctionComponent, useState } from "react";
import {View, ScrollView, Text, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

interface ForgotPasswordProps {
    navigation: any;
}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = ({navigation}) => {
const [username, setUsername] = useState<string>("");

const onSendPressed = () => {
    console.warn("resend")
}

const onSignInPressed = () => {
    navigation.navigate("SignIn")
}

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your password</Text>
            <CustomInput placeholder="Enter your confirmation code" value={username} setValue={setUsername} />
            <CustomButton  text="Send" onPress={onSendPressed} type="PRIMARY" />
            <CustomButton  text="Back to Sign in" onPress={onSignInPressed} type="TERTIARY" />
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

export default ForgotPassword;

