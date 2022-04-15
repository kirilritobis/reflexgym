import React from "react";
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ConfirmEmail from '../screens/ConfirmEmail';
import ForgotPassword from '../screens/ForgotPassword'
import NewPassword from '../screens/NewPassword';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Homepage from "../screens/Homepage";
import CardDetails from "../screens/CardDetails";

const Stack = createNativeStackNavigator();

const Navigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="CardDetails" component={CardDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default Navigation;