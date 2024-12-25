// ManualVerificationScreen.tsx

import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { processTransaction } from "../utils/api";
import { useStateContext } from "../context/StateContext";

const ManualVerificationScreen = ({ navigation, route }: any) => {
  const { recipient, amount } = route.params;
  const { dispatch } = useStateContext();
  const [verificationType, setVerificationType] = useState("passport");
  const [idNumber, setIdNumber] = useState("");

  const handleNext = async () => {
    Toast.show({ type: "info", text1: "Processing transaction..." });
    if (idNumber.trim()) {
      const success = await processTransaction("ManualVerify", 0); // Placeholder for API call
      if (success) {
        dispatch({
          type: "TRANSFER",
          payload: {
            recipient: recipient,
            amount: amount,
            date: new Date().toISOString(),
          },
        });
      }
      navigation.navigate("Home");
    } else {
      Toast.show({
        type: "error",
        text1: "An error occurred while processing the transaction.",
      });
      alert("Please fill in the ID number");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Verification Type:</Text>
      <Picker
        selectedValue={verificationType}
        style={styles.picker}
        onValueChange={(itemValue) => setVerificationType(itemValue)}
      >
        <Picker.Item label="Passport" value="passport" />
        <Picker.Item label="Old NRIC" value="old_nric" />
        <Picker.Item label="New NRIC" value="new_nric" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Enter ID Number"
        value={idNumber}
        onChangeText={setIdNumber}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default ManualVerificationScreen;
