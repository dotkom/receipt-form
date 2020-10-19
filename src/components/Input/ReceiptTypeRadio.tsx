import React, { FC } from 'react';

import { ReceiptType } from 'form/state';
import { useDispatch, useSelector } from 'redux/hooks';

import { RadioButton } from './RadioButton';
import { formDataUpdated } from 'redux/reducers/formReducer';

interface IProps {
  label: string;
  value: ReceiptType;
  tooltip: string;
}

export const ReceiptTypeRadio: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.form.type);

  const handleClick = () => {
    dispatch(formDataUpdated({ type: props.value }));
  };

  const checked = type === props.value;
  return <RadioButton checked={checked} onClick={handleClick} onChange={handleClick} {...props} />;
};
