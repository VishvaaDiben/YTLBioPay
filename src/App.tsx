import * as SplashScreen from 'expo-splash-screen';

import React, { useEffect } from 'react';

import HomePage from "./screens/HomePage";
import ManualVerificationScreen from './screens/ManualVerificationScreen';
// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import PaymentScreen from "./screens/PaymentScreen";
import { StateProvider } from "./context/StateContext";
import Toast from "react-native-toast-message";
import TransactionHistory from "./components/TransactionHistory";
import VerificationOptionScreen from './screens/VerificationOptionScreen';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      // Perform any loading tasks here
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000); // Simulate a 2-second loading delay
    };

    prepare();
  }, []);
  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="History" component={TransactionHistory} />
          <Stack.Screen name="VerifyOptions" component={VerificationOptionScreen} />
          <Stack.Screen name="ManualVerify" component={ManualVerificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </StateProvider>
  );
};

export default App;
