# PaymentApp YTLSEA - YTLBioPay
A secure payment transfer module built with React Native and TypeScript, featuring biometric authentication.

## Features
Payment Transfer: User-friendly interface to transfer funds securely.<br />
Biometric Authentication: Supports Touch ID, or fingerprint for user authentication.<br />
Error Handling: Provides detailed error messages for invalid inputs and transaction failures.<br />
Performance: Optimized list rendering and efficient state management.<br />
Stretch Goals:<br />
Access recipient contacts.<br />
View recent transaction history.

## Setup Instructions
1. Clone the Repository:<br />
git clone https://github.com/your-username/PaymentApp.git<br />
cd PaymentApp<br />
checkout master branch<br />
2. Install Dependencies:<br />
npm install<br />
3. Start the App:<br />
npm start

## Usage
Open the app on your mobile device using the Expo Go app.
Navigate from Home screen.
Fill in the recipient, amount.
Authenticate using your biometric method (Touch ID, etc.).
Other optional methods available as manual verify.
View the confirmation screen for successful transactions.

## Technologies Used<br />
React Native<br />
TypeScript<br />
Expo<br />
Local Authentication: expo-local-authentication<br />
State Management: Context Api <br />

## Demo
https://photos.app.goo.gl/6cdYm1mP3fvRBn3V7 

## Design Decisions<br />
Component Reusability: Separate components for PaymentForm and TransactionHistory.<br />
State Management: Used hooks (useState) and memoization (useMemo) for optimized performance.<br />
Error Handling: Implemented robust error feedback for a better user experience.<br />
Scalability: Modular folder structure ensures ease of future enhancements.<br />
## Challenges<br />
Handling biometric authentication fallback for older devices.<br />
Simulating a realistic API response with asynchronous delays.<br />
Ensuring smooth rendering for larger transaction datasets.<br />
## Contact<br />
For queries, please reach out to [dibenvishvaa@gmail.com/https://www.linkedin.com/in/diben-thivagar-a76386137/].

