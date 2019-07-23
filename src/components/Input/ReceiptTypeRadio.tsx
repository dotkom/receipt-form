import React, { FC } from 'react';

import { ReceiptType } from 'form/state';
import { useDispatch, useSelector } from 'redux/hooks';
import { ActionType } from 'redux/reducers/formReducer';

import { RadioButton } from './RadioButton';

export interface IProps {
  label: string;
  value: ReceiptType;
  tooltip: string;
}

export const ReceiptTypeRadio: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.form.type);

  const handleClick = () => {
    dispatch({
      type: ActionType.CHANGE,
      data: { type: props.value },
    });
  };

  const checked = type === props.value;
  return <RadioButton checked={checked} onClick={handleClick} onChange={handleClick} {...props} />;
};
