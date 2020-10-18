import React, { FC } from 'react';

import { IState } from 'form/state';
import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { useDispatch, useSelector } from 'redux/hooks';
import { ActionType } from 'redux/reducers/formReducer';

import { Input } from './Base';

interface IProps {
  field: keyof IState;
  label: string;
  placeholder?: string;
}

export const ReceiptNumberField: FC<IProps> = ({ field, ...props }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form[field]);

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        [field]: Number(event.target.value),
      },
    });
  };

  if (!!value && typeof value !== 'number') {
    throw new Error('ReceiptTextField supplied field value is not a number');
  }

  const { validation, level } = useValidation(field);
  const { interacted, setInteracted } = useInteraction(field);

  return (
    <Input
      type="number"
      value={value || ''}
      onChange={change}
      validation={validation}
      validationLevel={level}
      interacted={interacted}
      onBlur={setInteracted}
      {...props}
    />
  );
};
