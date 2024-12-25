// PaymentScreen.tsx

import * as Contacts from "expo-contacts";

import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";

import Dialog from "react-native-dialog";
import Toast from "react-native-toast-message";
import { authenticateBiometric } from "../utils/auth";
import { processTransaction } from "../utils/api";
import { useStateContext } from "../context/StateContext";

const PaymentScreen = ({ navigation }: any) => {
  const { state, dispatch } = useStateContext();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      Toast.show({
        type,
        text1: message,
      });
    },
    []
  );

  const handleTransfer = useCallback(() => {
    setDialogVisible(true);
  }, []);

  const processTransactionAndHandle = async () => {
    const numericAmount = parseFloat(amount);

    if (!recipient || isNaN(numericAmount)) {
      showToast("error", "Invalid recipient or amount.");
      return;
    }

    if (numericAmount > state.balance) {
      showToast("error", "Insufficient funds.");
      return;
    }

    const success = await processTransaction(recipient, numericAmount);
    if (success) {
      dispatch({
        type: "TRANSFER",
        payload: {
          recipient,
          amount: numericAmount,
          date: new Date().toISOString(),
        },
      });
      showToast(
        "success",
        `Transfer to ${recipient} of $${numericAmount} successful!`
      );
      navigation.navigate("Home");
    } else {
      showToast("error", "Transaction failed. Please try again.");
    }
  };

  const selectRecipientFromContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();
      if (data.length > 0) {
        const contact = data[0]; // Select the first contact for simplicity
        setRecipient(contact.name || "");
      }
    } else {
      showToast("error", "Permission denied to access contacts.");
    }
  };

  const renderTransaction = ({ item }: any) => (
    <Text
      style={styles.transactionItem}
      onPress={() => {
        setRecipient(item.recipient);
        navigation.navigate("Payment");
      }}
    >
      {item.recipient} - ${item.amount}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Balance: ${state.balance}</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipient"
        value={recipient}
        onChangeText={setRecipient}
      />
      <Button
        title="Select from Contacts"
        onPress={selectRecipientFromContacts}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Transfer" onPress={handleTransfer} />
      <Text style={styles.header}>Log Transactions:</Text>
      <FlatList
        data={state.transactionHistory}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.history}
      />
      <Toast />

      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Verification Required</Dialog.Title>
        <Dialog.Description>
          Choose a verification method to proceed with the transfer.
        </Dialog.Description>
        <Dialog.Button
          label="Biometric"
          onPress={async () => {
            setDialogVisible(false);
            const isAuthenticated = await authenticateBiometric();
            if (isAuthenticated) {
              processTransactionAndHandle();
            } else {
              dispatch({ type: "DISABLE_BIOMETRIC" });
              showToast("error", "Biometric authentication failed.");
            }
          }}
        />
        <Dialog.Button
          label="Manual"
          onPress={() => {
            setDialogVisible(false);
            navigation.navigate("ManualVerify", { recipient: recipient, amount: amount });
          }}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  transactionItem: {
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    borderRadius: 5,
  },
  history: { marginTop: 20 },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
});

export default PaymentScreen;
