import React, { FunctionComponent, useState } from "react";
import {View, ScrollView, Text, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

const ConfirmEmail: FunctionComponent<{}> = () => {
const [code, setCode] = useState<string>("");

const onConfirmPressed = () => {
    console.warn("confirm");
}

const onSignInPressed = () => {
    console.warn("sign in")
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
            <CustomButton  text="Resend code" onPress={onResendPressed} type="SECONDARY" />
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

export default ConfirmEmail;

