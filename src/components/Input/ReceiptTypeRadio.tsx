import React, { useContext } from 'react';

import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType, ReceiptType } from 'hooks/useReceiptData';

import { RadioButton } from './RadioButton';

export interface IProps {
  label: string;
  value: ReceiptType;
  tooltip: string;
}

export const ReceiptTypeRadio = (props: IProps) => {
  const { state, dispatch } = useContext(ReceiptContext);

  const handleClick = () => {
    dispatch({
      type: ActionType.CHANGE,
      data: { type: props.value },
    });
  };

  const checked = state.type === props.value;
  return <RadioButton checked={checked} onClick={handleClick} onChange={handleClick} {...props} />;
};
