import React, { FunctionComponent, useState } from "react";
import {View, ScrollView, Text, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

const NewPassword: FunctionComponent<{}> = () => {
const [code, setCode] = useState<string>("");
const [newPassword, setNewPassword] = useState<string>("");

const onSignInPressed = () => {
    console.warn("sign in")
}

const onSubmitPressed = () => {
    console.warn("submit");
}

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your password</Text>
            <CustomInput placeholder="Code" value={code} setValue={setCode} />
            <CustomInput placeholder="Enter your new password" value={newPassword} setValue={setNewPassword} />
            <CustomButton  text="Submit" onPress={onSubmitPressed} type="PRIMARY" />
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

export default NewPassword;

