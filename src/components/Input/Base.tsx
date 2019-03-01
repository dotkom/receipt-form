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
  border: 2px solid #e5e5e5;

  padding: 0.6rem;
  box-sizing: border-box;

  :disabled {
    background: #efefef;
  }

  :focus {
    outline: none;
    border-color: #0060a3;
  }
`;

export const StyledInput = styled.input`
  ${BaseInputStyle}
`;

export const BaseLabelStyle = css`
  font-weight: bold;
  color: #8e8e8e;
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

export const Input: FC<IInputProps> = ({ label, ...rest }) => {
  /** Extract 'ref' and 'as' from props as styled-components types mismatch with React */
  const { ref, as, ...props } = rest;
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput {...props} />
    </InputContainer>
  );
};
