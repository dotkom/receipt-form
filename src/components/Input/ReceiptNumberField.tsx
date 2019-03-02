import React, { FC, useContext } from 'react';

import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType, IState } from 'hooks/useReceiptData';

import { Input } from './Base';

export interface IProps {
  field: keyof IState;
  label: string;
}

export const ReceiptNumberField: FC<IProps> = ({ field, label }) => {
  const { state, dispatch } = useContext(ReceiptContext);

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        [field]: Number(event.target.value),
      },
    });
  };

  const value = state[field];
  if (value !== null && typeof value !== 'number') {
    throw new Error('ReceiptTextField supplied field value is not a number');
  }

  return <Input type="number" label={label} value={value || ''} onChange={change} />;
};
