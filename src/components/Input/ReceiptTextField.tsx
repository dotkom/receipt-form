import React, { FC } from 'react';

import { IState } from 'form/state';
import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { useDispatch, useSelector } from 'redux/hooks';
import { formDataUpdated } from 'redux/reducers/formReducer';

import { Input } from './Base';

interface IProps {
  field: keyof IState;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  format?: (value: string) => string;
  temp?: string;
}

export const ReceiptTextField: FC<IProps> = ({ temp, field, format, ...props }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form[field] || (temp || ''));

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = format ? format(event.target.value) : event.target.value;
    dispatch(
      formDataUpdated({
        [field]: val,
      })
    );
  };

  if (typeof value !== 'string') {
    throw new Error('ReceiptTextField supplied field value is not a string');
  }

  const { validation, level } = useValidation(field);
  const { interacted, setInteracted } = useInteraction(field);

  return (
    <Input
      value={value}
      onChange={change}
      {...props}
      validation={validation}
      validationLevel={level}
      onBlur={setInteracted}
      interacted={interacted}
    />
  );
};
