import React, { createContext, FC } from 'react';

import { IState } from 'form/state';
import { StateValidation } from 'form/validation';
import { Actions, useReceiptData } from 'hooks/useReceiptData';

const MOCK_DISPATCH = () => {
  throw new Error('Mock dispatch was called!');
};

export const INITIAL_STATE = {
  state: {} as IState,
  dispatch: MOCK_DISPATCH as (action: Actions) => void,
  validation: {} as StateValidation,
};

export const ReceiptContext = createContext(INITIAL_STATE);

export const ReceiptData: FC = ({ children }) => {
  const [state, dispatch, validation] = useReceiptData();
  return <ReceiptContext.Provider value={{ state, dispatch, validation }}>{children}</ReceiptContext.Provider>;
};
