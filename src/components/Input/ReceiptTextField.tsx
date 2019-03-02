import React, { FC, useContext } from 'react';

import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType, IState } from 'hooks/useReceiptData';

import { Input } from './Base';

export interface IProps {
  field: keyof IState;
  label: string;
  disabled?: boolean;
}

export const ReceiptTextField: FC<IProps> = ({ field, label, disabled }) => {
  const { state, dispatch } = useContext(ReceiptContext);

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        [field]: event.target.value,
      },
    });
  };

  const value = state[field] || '';
  if (typeof value !== 'string') {
    throw new Error('ReceiptTextField supplied field value is not a string');
  }

  return <Input label={label} value={value} onChange={change} disabled={disabled} />;
};
