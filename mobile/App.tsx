import Barcode from '@kichiyaki/react-native-barcode-generator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./src/navigation"
import { Provider } from 'inversify-react';
import { myContainer } from './src/dependencies/container'
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';


export default function App() {
  return (
    <Provider key={1} container={myContainer}>
    <View style={styles.container}>
      <Navigation />
    </View>
    </Provider>
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
