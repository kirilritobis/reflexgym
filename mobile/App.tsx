import Barcode from '@kichiyaki/react-native-barcode-generator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ConfirmEmail from './src/screens/ConfirmEmail';
import ForgotPassword from './src/screens/ForgotPassword'
import NewPassword from './src/screens/NewPassword';
import Navigation from "./src/navigation"

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <ConfirmEmail /> */}
      {/* <ForgotPassword /> */}
      {/* <NewPassword /> */}
      <Navigation />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
