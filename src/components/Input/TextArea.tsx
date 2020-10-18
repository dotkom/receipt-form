import React, { FC, HTMLProps } from 'react';
import styled from 'styled-components';

import { IValidation, ValidationLevel } from 'form/validation';

import { BaseInputStyle, InputContainer, Label } from './Base';
import { getValidationLevelColor, ValidationMessages } from './ValidationMessages';

export interface ITextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  label: string;
  validation?: IValidation[];
  validationLevel?: ValidationLevel;
  interacted?: boolean;
}

export interface IMultiLineInputProps {
  level?: ValidationLevel;
}

const MultilineInput = styled.textarea<IMultiLineInputProps>`
  ${BaseInputStyle}

  font-family: 'Source Sans Pro';
  resize: none;
  min-height: 6rem;

  ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}

  :focus {
    ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}
  }
`;

export const TextArea: FC<ITextAreaProps> = ({
  label,
  validationLevel = ValidationLevel.NONE,
  validation = [],
  interacted,
  ref, // eslint-disable-line @typescript-eslint/no-unused-vars
  as, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <ValidationMessages display={Boolean(interacted)} validation={validation} />
      <MultilineInput level={interacted ? validationLevel : undefined} {...props} />
    </InputContainer>
  );
};
