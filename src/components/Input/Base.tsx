import React, { FC, HTMLProps } from 'react';
import styled, { css } from 'styled-components';

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  type?: string;
}

export const BaseInputStyle = css`
  width: 100%;

  background: #fff;
  border-radius: 5px;
  border: 2px solid #E5E5E5;

  padding: 0.6rem;
  box-sizing: border-box;
`;

export const StyledInput = styled.input`
  ${BaseInputStyle}
`;

export const BaseLabelStyle = css`
  font-weight: bold;
  color: #8E8E8E;
  margin: 3px 0;
  font-size: 1.2rem;
`;

export const Label = styled.p`
  ${BaseLabelStyle}
`;

export const InputContainer = styled.div`
  width: 100%;
  margin: 0.8rem 0;
  box-sizing: border-box;
`;

export const Input: FC<IInputProps> = ({ label, type, ...props }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput type={type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
    </InputContainer>
  );
};
