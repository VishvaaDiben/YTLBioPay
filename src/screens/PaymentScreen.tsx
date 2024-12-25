// PaymentScreen.tsx

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';

import Toast from 'react-native-toast-message';
import { authenticateBiometric } from '../utils/auth';
import { processTransaction } from '../utils/api';
import { useStateContext } from '../context/StateContext';

const PaymentScreen = ({ navigation }: any) => {
  const { state, dispatch } = useStateContext();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const showToast = (type: 'success' | 'error', message: string) => {
    Toast.show({
      type,
      text1: message,
    });
  };

  const handleTransfer = useCallback(async () => {
    const numericAmount = parseFloat(amount);

    if (!recipient || isNaN(numericAmount)) {
      showToast('error', 'Invalid recipient or amount.');
      return;
    }

    if (numericAmount > state.balance) {
      showToast('error', 'Insufficient funds.');
      return;
    }

    const isAuthenticated = await authenticateBiometric();

    if (isAuthenticated) {
      const success = await processTransaction(recipient, numericAmount);
      if (success) {
        dispatch({
          type: 'TRANSFER',
          payload: { recipient, amount: numericAmount, date: new Date().toISOString() },
        });
        showToast('success', `Transfer to ${recipient} of $${numericAmount} successful!`);
      } else {
        showToast('error', 'Transaction failed. Please try again.');
      }
    } else {
      showToast('error', 'Biometric authentication failed.');
    }
  }, [amount, recipient, state.balance, dispatch, showToast]);

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
      <Button title="View History" onPress={() => navigation.navigate('History')} />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default PaymentScreen;