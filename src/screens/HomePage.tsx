// HomePage.tsx

import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";

import Toast from "react-native-toast-message";
import { useStateContext } from "../context/StateContext";

const HomePage = ({ navigation }: any) => {
  const { state } = useStateContext();

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      Toast.show({
        type,
        text1: message,
      });
    },
    []
  );

  const renderTransaction = ({ item }: any) => (
    <Text
      style={styles.transactionItem}
      onPress={() => {
        navigation.navigate("Payment", { recipient: item.recipient });
        showToast("success", "click the below log to auto fill name.");
        alert("click the below log to auto fill name.");
      }}
    >
      {item.recipient} - ${item.amount}
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.accountDetails}>
        <Text>Account Holder: YTLCustomer</Text>
        <Text>CIF Number: 1111</Text>
        <Text>Account Number: 11223546422</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View History"
          onPress={() => navigation.navigate("History")}
        />
        <Button
          title="Make a Payment"
          onPress={() => navigation.navigate("Payment")}
        />
      </View>
      <Text style={styles.header}>Recent Transactions:</Text>
      <FlatList
        data={state.transactionHistory.slice(0, 2)}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.history}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  accountDetails: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    gap: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    borderRadius: 5,
  },
  history: {
    marginTop: 20,
  },
});

export default HomePage;
