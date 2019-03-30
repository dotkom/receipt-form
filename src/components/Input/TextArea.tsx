import React, { FC, HTMLProps, useState } from 'react';
import styled from 'styled-components';

import { IValidation, ValidationLevel } from 'form/validation';

import { BaseInputStyle, getValidationLevelColor, InputContainer, Label, ValidationMessage } from './Base';

export interface ITextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  label: string;
  validation?: IValidation[];
  validationLevel?: ValidationLevel;
}

export interface IMultiLineInputProps {
  level?: ValidationLevel;
}

const MultilineInput = styled.textarea<IMultiLineInputProps>`
  ${BaseInputStyle}

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
  ...props
}) => {
  const [interacted, setInteracted] = useState(false);

  const showValidation = () => {
    if (props.value !== props.defaultValue) {
      setInteracted(true);
    }
  };

  return (
    <InputContainer>
      <Label>{label}</Label>
      {interacted &&
        validation.map(({ level, message }) => (
          <ValidationMessage key={message} level={level}>
            {message}
          </ValidationMessage>
        ))}
      <MultilineInput
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        level={interacted ? validationLevel : undefined}
        onBlur={showValidation}
      />
    </InputContainer>
  );
};
