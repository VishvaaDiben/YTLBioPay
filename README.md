# PaymentApp YTLSEA - YTLBioPay
A secure payment transfer module built with React Native and TypeScript, featuring biometric authentication.

## Features
Payment Transfer: User-friendly interface to transfer funds securely.
Biometric Authentication: Supports Touch ID, or fingerprint for user authentication.
Error Handling: Provides detailed error messages for invalid inputs and transaction failures.
Performance: Optimized list rendering and efficient state management.
Stretch Goals:
Access recipient contacts.
View recent transaction history.

## Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/PaymentApp.git
cd PaymentApp
checkout master branch

2. Install Dependencies
npm install
3. Start the App
npm start

## Usage
Open the app on your mobile device using the Expo Go app.
Navigate from Home screen.
Fill in the recipient, amount.
Authenticate using your biometric method (Touch ID, etc.).
Other optional methods available as manual verify.
View the confirmation screen for successful transactions.

## Technologies Used
React Native
TypeScript
Expo
Local Authentication: expo-local-authentication
State Management: Context Api 

## Demo
[gdrive link]

## Design Decisions
Component Reusability: Separate components for PaymentForm and TransactionHistory.
State Management: Used hooks (useState) and memoization (useMemo) for optimized performance.
Error Handling: Implemented robust error feedback for a better user experience.
Scalability: Modular folder structure ensures ease of future enhancements.
## Challenges
Handling biometric authentication fallback for older devices.
Simulating a realistic API response with asynchronous delays.
Ensuring smooth rendering for larger transaction datasets.
## Contact
For queries, please reach out to [dibenvishvaa@gmail.com/https://www.linkedin.com/in/diben-thivagar-a76386137/].

