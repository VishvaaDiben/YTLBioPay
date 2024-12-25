// api.ts

import Toast from 'react-native-toast-message';

export const processTransaction = async (recipient: string, amount: number): Promise<boolean> => {
  try {
    Toast.show({ type: 'info', text1: 'Processing transaction...' });
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call delay

    const success = true; // Simulate API response success/failure
    return success;
  } catch (error) {
    Toast.show({ type: 'error', text1: 'An error occurred while processing the transaction.' });
    return false;
  }
};