// auth.ts

import * as LocalAuthentication from "expo-local-authentication";

import Toast from "react-native-toast-message";

export const authenticateBiometric = async (): Promise<boolean> => {
  const compatible = await LocalAuthentication.hasHardwareAsync();

  if (!compatible) {
    Toast.show({
      type: "error",
      text1: "An error occurred while processing the transaction.",
    });

    return false;
  }

  const biometricAuth = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate to complete payment",
    fallbackLabel: "Use passcode",
  });

  return biometricAuth.success;
};
