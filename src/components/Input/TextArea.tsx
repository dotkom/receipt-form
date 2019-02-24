import React, { FC, HTMLProps, useRef, useLayoutEffect, useEffect } from 'react';
import { InputContainer, Label, BaseInputStyle } from './Base';
import styled from 'styled-components';

export interface ITextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  label: string;
}

const MultilineInput = styled.textarea`
  ${BaseInputStyle}

  resize: none;
  min-height: 6rem;
`;

export const TextArea: FC<ITextAreaProps> = ({ label, ...props }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <MultilineInput
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </InputContainer>
  );
};
