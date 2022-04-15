import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import {View, ScrollView, Text, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { logout } from "../../services/AuthService/AuthService";
import { AuthContext, getToken } from "../../services/ContextService/ContextService";

interface HomepageProps {
    navigation: any;
}

const Homepage: FunctionComponent<HomepageProps> = ({navigation}) => {
    const { user } = useContext(AuthContext)

    const onOpenCardPressed = async () => {
        navigation.navigate("CardDetails");
    }

    const onLogoutPressed = async () => {
        await logout();
        navigation.navigate("SignIn");
    }

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Homepage</Text>
            <CustomButton  text="Open my card" onPress={onOpenCardPressed} type="PRIMARY" />
            <CustomButton  text="Logout" onPress={onLogoutPressed} type="PRIMARY" />
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

export default Homepage;

