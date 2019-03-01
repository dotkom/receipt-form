import React, { FC } from 'react';

import { IInputProps, InputContainer, Label, StyledInput } from './Base';

export const DateField: FC<IInputProps> = ({ label, ...props }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput type="date" value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
    </InputContainer>
  );
};
