import styled from 'styled-components';

import { colors } from 'constants/colors';

import { BaseInputStyle } from './Base';
import { getValidationLevelColor, IValidationMessageProps } from './ValidationMessages';

export const FakeInput = styled.div<IValidationMessageProps>`
  ${BaseInputStyle}

  display: grid;
  justify-content: center;

  ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}

  ${({ highlight }) => highlight && `border-color: ${colors.primary};`}

  :focus {
    ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}
  }
`;
