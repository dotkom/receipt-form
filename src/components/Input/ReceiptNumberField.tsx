import React, { FC, useContext } from 'react';
import { Input } from '.';

import { ReceiptContext } from '../../contexts/ReceiptData';
import { ActionType, IState } from '../../hooks/useReceiptData';

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

  return <Input type="number" label={label} value={state[field] || ''} onChange={change} />;
};