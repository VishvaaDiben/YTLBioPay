import { NavigationContainer } from "@react-navigation/native";
import PaymentScreen from "./screens/PaymentScreen";
// App.tsx
import React from "react";
import { StateProvider } from "./context/StateContext";
import Toast from "react-native-toast-message";
import TransactionHistory from "./components/TransactionHistory";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Payment">
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="History" component={TransactionHistory} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </StateProvider>
  );
};

export default App;
