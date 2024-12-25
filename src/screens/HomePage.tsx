// HomePage.tsx

import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';

const HomePage = ({ navigation }: any) => {
  const accountHolderName = 'YTLCustomer';
  const accountDetails = {
    cifNumber: 1111,
    accountNumber: 11223546422,
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.text}>Account Holder: {accountHolderName}</Text>
        <Text style={styles.text}>CIF Number: {accountDetails.cifNumber}</Text>
        <Text style={styles.text}>Account Number: {accountDetails.accountNumber}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="View History" onPress={() => navigation.navigate('History')} />
        <Button title="Make Payment" onPress={() => navigation.navigate('Payment')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    detailsContainer: { marginBottom: 30 },
    text: { fontSize: 18, marginBottom: 10 },
    buttonContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
    },
  });
  
  export default HomePage;