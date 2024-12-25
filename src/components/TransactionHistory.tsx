// TransactionHistory.tsx

import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';

import { useStateContext } from '../context/StateContext';

interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  date: string;
}

const TransactionHistory = () => {
  const { state } = useStateContext();

  const memoizedTransactions = useMemo(() => state.transactionHistory, [state.transactionHistory]);

  const renderItem: ListRenderItem<Transaction> = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item.recipient}</Text>
        <Text>${item.amount.toFixed(2)}</Text>
        <Text>{new Date(item.date).toLocaleString()}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={memoizedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 18, marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1 },
});


export default TransactionHistory;