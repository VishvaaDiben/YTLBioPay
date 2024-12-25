// PaymentScreen.tsx

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import { useStateContext } from '../context/StateContext';

// import { authenticateBiometric } from '../utils/auth';
// import { processTransaction } from '../utils/api';

const PaymentScreen = () => {
  const { state, dispatch } = useStateContext();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    const numericAmount = parseFloat(amount);

    if (!recipient || isNaN(numericAmount)) {
      alert('Invalid recipient or amount.');
      return;
    }

    if (numericAmount > state.balance) {
      alert('Insufficient funds.');
      return;
    }

    // const isAuthenticated = await authenticateBiometric();

    // if (isAuthenticated) {
    //   const success = await processTransaction(recipient, numericAmount);
    //   if (success) {
    //     dispatch({
    //       type: 'TRANSFER',
    //       payload: { recipient, amount: numericAmount, date: new Date().toISOString() },
    //     });
    //     alert(`Transfer to ${recipient} of $${numericAmount} successful!`);
    //   } else {
    //     alert('Transaction failed. Please try again.');
    //   }
    // } else {
    //   alert('Biometric authentication failed.');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Balance: ${state.balance.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipient"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Transfer" onPress={handleTransfer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default PaymentScreen;