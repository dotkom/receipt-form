import React, { FC, HTMLProps } from 'react';
import styled from 'styled-components';
import { Label } from './Base';

const Radio = styled.div`
  background: #fff;
  border: 2px solid #e5e5e5;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  margin-right: 0.6rem;
`;

const RadioLabel = styled(Label)`
  display: flex;
`;

export interface IRadioProps extends HTMLProps<HTMLElement> {
  label: string;
  checked?: boolean;
}

export const RadioButton: FC<IRadioProps> = ({ label, checked = false, onClick }) => {
  return (
    <RadioLabel>
      <Radio onClick={onClick} />
      { label }
    </RadioLabel>
  );
};
