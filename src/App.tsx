import { NavigationContainer } from '@react-navigation/native';
import PaymentScreen from './screens/PaymentScreen';
// App.tsx
import React from 'react';
import { StateProvider } from './context/StateContext';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Payment">
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;