import React, { FC } from 'react';
import styled from 'styled-components';
import { BaseInputStyle } from './Base';

const Label = styled.label`
`;

const Radio = styled.input`
  ${BaseInputStyle}
`;

export interface IRadioProps {
  label: string;
}

export const RadioButton: FC<IRadioProps> = ({ label }) => {
  return (
    <Label>
      <Radio type="radio" />
      { label }
    </Label>
  );
};
