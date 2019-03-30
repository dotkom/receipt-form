import React, { FC, HTMLProps, useState } from 'react';
import styled, { css } from 'styled-components';

import { IValidation, ValidationLevel } from 'form/validation';

export const BaseInputStyle = css`
  width: 100%;

  background: #fff;
  color: #333333;
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

export const StyledInput = React.memo(styled.input<IValidationMessageProps>`
  ${BaseInputStyle}
  ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}

  :focus {
    ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}
  }
`);

export const BaseLabelStyle = css`
  font-weight: bold;
  color: #8e8e8e;
  margin: 3px 0;
  font-size: 1.2rem;
`;

export const Label = React.memo(styled.p`
  ${BaseLabelStyle}
`);

export const InputContainer = React.memo(styled.div`
  width: 100%;
  margin: 0.8rem 0;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`);

export interface IValidationMessageProps {
  level?: ValidationLevel;
}

export const getValidationLevelColor = (level?: ValidationLevel) => {
  switch (level) {
    default:
      return '#8e8e8e';
    case ValidationLevel.NONE:
      return '#8e8e8e';
    case ValidationLevel.WARNING:
      return '#faa21b';
    case ValidationLevel.REQUIRED:
      return '#eb536e';
  }
};

export const ValidationMessage = React.memo(styled.p<IValidationMessageProps>`
  color: ${({ level }) => getValidationLevelColor(level)};
  margin: 0 0 4px 0;
  transition: opacity 1s linear;
`);

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  type?: string;
  validation?: IValidation[];
  validationLevel?: ValidationLevel;
}

export const Input: FC<IInputProps> = React.memo(
  ({ label, validation = [], validationLevel = ValidationLevel.NONE, ...rest }) => {
    /** Extract 'ref' and 'as' from props as styled-components types mismatch with React */
    const { ref, as, ...props } = rest;

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
        <StyledInput {...props} onBlur={showValidation} level={interacted ? validationLevel : undefined} />
      </InputContainer>
    );
  }
);
