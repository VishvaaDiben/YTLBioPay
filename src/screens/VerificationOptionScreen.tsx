// VerificationOptionScreen.tsx

import { Button, StyleSheet, View } from 'react-native';

import React from 'react';
import { useStateContext } from '../context/StateContext';

const VerificationOptionScreen = ({ navigation }: any) => {
  const { state } = useStateContext();

  return (
    <View style={styles.container}>
      <Button
        title="Biometric Verification"
        onPress={() => navigation.navigate('Payment')}
        disabled={!state.isBiometricEnabled}
      />
      <Button title="Manual Verification" onPress={() => navigation.navigate('ManualVerify')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});

export default VerificationOptionScreen;