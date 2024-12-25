// StateContext.tsx

import React, { createContext, useContext, useReducer } from 'react';

interface State {
  balance: number;
  transactionHistory: Array<{ id: string; recipient: string; amount: number; date: string }>;
  isBiometricEnabled: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  balance: 1000,
  transactionHistory: [],
  isBiometricEnabled: true,
};

const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TRANSFER':
      return {
        ...state,
        balance: state.balance - action.payload.amount,
        transactionHistory: [
          { id: Date.now().toString(), ...action.payload },
          ...state.transactionHistory.slice(0, 1),
        ],
      };
    case 'DISABLE_BIOMETRIC':
      return {
        ...state,
        isBiometricEnabled: false,
      };
    default:
      return state;
  }
};

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);