import React, { FC, useContext } from 'react';

import { ReceiptContext } from 'contexts/ReceiptData';
import { IState } from 'form/state';
import { useInteraction } from 'hooks/useInteraction';
import { ActionType } from 'hooks/useReceiptData';
import { useValidation } from 'hooks/useValidation';

import { TextArea } from './TextArea';

export interface IProps {
  field: keyof IState;
  label: string;
  disabled?: boolean;
  placeholder?: string;
}

export const ReceiptTextArea: FC<IProps> = ({ field, ...props }) => {
  const { state, dispatch } = useContext(ReceiptContext);

  const change = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        [field]: event.target.value,
      },
    });
  };

  const value = state[field] || '';
  if (typeof value !== 'string') {
    throw new Error('ReceiptTextField supplied field value is not a string');
  }

  const { validation, level } = useValidation(field);
  const { interacted, setInteracted } = useInteraction(field);

  return (
    <TextArea
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
