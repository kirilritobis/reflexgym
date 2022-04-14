import Barcode from '@kichiyaki/react-native-barcode-generator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./src/navigation"
import { Provider } from 'inversify-react';
import { myContainer } from './src/dependencies/container'
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import { AuthContext, extractUser, getToken } from "./src/services/ContextService/ContextService"
import { useEffect, useState } from 'react';


export default function App() {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: false,
    user: { email: "", iat: 0, exp: 0 }
  });

  useEffect(() => {
    (async () => {
      const token = await getToken();
      console.warn(token)
      if(token) {
        const { email, exp, iat } = extractUser(token);
        setAuthValue({
          isLoggedIn: true,
          user: {email, exp, iat},
        })
      }
    })()
  }, [])



  return (
    <AuthContext.Provider value={{ ...authValue, setLoginState: setAuthValue }}>
    <View style={styles.container}>
      <Navigation />
    </View>
    </AuthContext.Provider>
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
