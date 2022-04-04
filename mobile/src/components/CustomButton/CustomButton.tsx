import React, { FunctionComponent } from "react";
import {View, Text, Pressable, StyleSheet, GestureResponderEvent } from "react-native";

interface CustomButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    text: string;
    type: "PRIMARY" | "SECONDARY" | "TERTIARY";
    bgColor?: string;
    fgColor?: string;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({onPress, text, type, bgColor, fgColor}) => {
    return (
        <Pressable style={[styles.container,
         styles[`container_${type}`],
         bgColor ? {backgroundColor: bgColor} :
          {}]} onPress={onPress}>
            <Text style={[styles.text, 
                styles[`text_${type}`],
                fgColor ? { color: fgColor } : {}]}>{text}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 5,

    },

    container_PRIMARY: {
        backgroundColor: "#3B71F3",
    },
    container_SECONDARY: {
        borderColor: "#3B71F3",
        borderWidth: 2,
    },
    container_TERTIARY: {},
    text: {
        fontWeight: "bold",
    },
    text_PRIMARY: {
        color: "white",
    },
    text_SECONDARY: {
        color: "#3B71F3",
    },
    text_TERTIARY: {
        color: "gray",
    }
})

export default CustomButton;