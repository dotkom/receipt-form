import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';
import { IValidation, ValidationLevel } from 'form/validation';

export interface IValidationMessageProps {
  level?: ValidationLevel;
  highlight?: boolean;
}

export const getValidationLevelColor = (level?: ValidationLevel) => {
  switch (level) {
    default:
      return colors.darkGray;
    case ValidationLevel.NONE:
      return colors.darkGray;
    case ValidationLevel.WARNING:
      return colors.orange;
    case ValidationLevel.REQUIRED:
      return colors.red;
    case ValidationLevel.VALID:
      return colors.green;
  }
};

export const ValidationMessage = React.memo(styled.p<IValidationMessageProps>`
  color: ${({ level }) => getValidationLevelColor(level)};
  margin: 0 0 4px 0;
  transition: opacity 1s linear;
`);

export interface IProps {
  display: boolean;
  validation: IValidation[];
}

export const ValidationMessages: FC<IProps> = ({ display, validation }) => {
  return (
    <>
      {display &&
        validation.map(({ level, message }) => (
          <ValidationMessage key={message} level={level}>
            {message}
          </ValidationMessage>
        ))}{' '}
    </>
  );
};
