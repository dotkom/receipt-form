import React, { createContext, FC } from 'react';
import { Actions, IState, useReceiptData } from '../hooks/useReceiptData';

const MOCK_DISPATCH = () => {
  throw new Error('Mock dispatch was called!');
};

export const INITIAL_STATE = {
  state: {} as IState,
  dispatch: MOCK_DISPATCH as (action: Actions) => void,
};

export const ReceiptContext = createContext(INITIAL_STATE);

export const ReceiptData: FC = ({ children }) => {
  const [state, dispatch] = useReceiptData();
  return <ReceiptContext.Provider value={{ state, dispatch }}>{children}</ReceiptContext.Provider>;
};
