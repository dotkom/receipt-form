import React, { FC, useContext } from 'react';
import { Input } from '.';

import { ReceiptContext } from '../../contexts/ReceiptData';
import { ActionType, IState } from '../../hooks/useReceiptData';

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

  return <Input label={label} value={state[field] || ''} onChange={change} disabled={disabled} />;
};
