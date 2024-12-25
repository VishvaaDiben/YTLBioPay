import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';

const ManualVerificationScreen = ({ navigation }: any) => {
  const [verificationType, setVerificationType] = useState('passport');
  const [idNumber, setIdNumber] = useState('');

  const handleNext = () => {
    if (idNumber.trim()) {
      navigation.navigate('Payment');
    } else {
      alert('Please fill in the ID number');
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
    justifyContent: 'center',
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
