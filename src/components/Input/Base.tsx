import React, { FC, HTMLProps } from 'react';
import styled, { css } from 'styled-components';

import { colors } from 'constants/colors';
import { IValidation, ValidationLevel } from 'form/validation';
import { getValidationLevelColor, IValidationMessageProps, ValidationMessages } from './ValidationMessages';

export const BaseInputStyle = css`
  width: 100%;

  background: ${colors.white};
  color: ${colors.lightBlack};
  border-radius: 5px;
  border: 2px solid ${colors.gray};

  padding: 0.6rem;
  box-sizing: border-box;

  :disabled {
    background: ${colors.gray2};
  }

  :focus {
    outline: none;
    border-color: ${colors.primary};
  }

  ::placeholder {
    color: ${colors.darkGray};
  }
`;

export const StyledInput = React.memo(styled.input<IValidationMessageProps>`
  ${BaseInputStyle}
  ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}

  ${({ highlight }) => highlight && `border-color: ${colors.primary};`}

  :focus {
    ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}
  }
`);

export const BaseLabelStyle = css`
  font-weight: bold;
  color: ${colors.darkGray};
  margin: 3px 0;
  font-size: 1.2rem;
`;

export const Label = React.memo(styled.label`
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

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  type?: string;
  validation?: IValidation[];
  validationLevel?: ValidationLevel;
  highlight?: boolean;
  interacted?: boolean;
}

export const Input: FC<IInputProps> = React.memo(
  ({ label, validation = [], validationLevel = ValidationLevel.NONE, interacted, ...rest }) => {
    /** Extract 'ref' and 'as' from props as styled-components types mismatch with React */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ref, as, ...props } = rest;

    return (
      <InputContainer>
        <Label>{label}</Label>
        <ValidationMessages display={Boolean(interacted)} validation={validation} />
        <StyledInput {...props} level={interacted ? validationLevel : undefined} />
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';
