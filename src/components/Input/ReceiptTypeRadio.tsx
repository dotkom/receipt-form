import React, { useContext } from 'react';

import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType, ReceiptType } from 'hooks/useReceiptData';

import { RadioButton } from './RadioButton';

export interface IProps {
  label: string;
  value: ReceiptType;
}

export const ReceiptTypeRadio = ({ label, value }: IProps) => {
  const { state, dispatch } = useContext(ReceiptContext);

  const handleClick = () => {
    dispatch({
      type: ActionType.CHANGE,
      data: { type: value },
    });
  };

  const checked = state.type === value;
  return <RadioButton label={label} checked={checked} onClick={handleClick} value={value} onChange={handleClick} />;
};
