import React, { FunctionComponent, useState } from "react";
import {View, ScrollView, Text, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/images/Logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

interface HomepageProps {
    navigation: any;
}

const Homepage: FunctionComponent<HomepageProps> = ({navigation}) => {

    const onOpenCardPressed = () => {
        console.warn("opening cards")
    }

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Homepage</Text>
            <CustomButton  text="Open my card" onPress={onOpenCardPressed} type="PRIMARY" />
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

