import React, { FC, useContext } from 'react';

import { ReceiptContext } from 'contexts/ReceiptData';
import { IState } from 'form/state';
import { useInteraction } from 'hooks/useInteraction';
import { ActionType } from 'hooks/useReceiptData';
import { useValidation } from 'hooks/useValidation';

import { Input } from './Base';

export interface IProps {
  field: keyof IState;
  label: string;
  placeholder?: string;
}

export const ReceiptNumberField: FC<IProps> = ({ field, ...props }) => {
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
