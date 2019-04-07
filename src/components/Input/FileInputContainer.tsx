import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

import { BaseInputStyle, StyledInput } from './Base';
import { getValidationLevelColor, IValidationMessageProps } from './ValidationMessages';

const StyledFileInput = styled(StyledInput)`
  position: absolute;
  height: 6rem;
  z-index: 100;
  opacity: 0;
`;

const FilePlaceholder = styled.div<IValidationMessageProps>`
  ${BaseInputStyle}
  position: absolute;
  height: 6rem;
  top: 0;
  left: 0;
  margin: 0;
  text-align: center;
  justify-content: center;
  color: ${colors.figmaGray};
  background: ${colors.white};
  display: grid;

  ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}

  ${({ highlight }) => highlight && `border-color: ${colors.blue};`}

  :focus {
    ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}
  }
`;

const PlaceholderText = styled.p`
  margin: auto;
`;

const Container = styled.div`
  position: relative;
  height: 6rem;
`;

const DEFAULT_PLACEHOLDER = `Klikk på dette feltet, eller dra en fil hit for å laste opp`;

/** Copy props from StyledInput */
export type IProps = Parameters<typeof StyledInput>[0];

export const FileInputContainer: FC<Parameters<typeof StyledInput>[0]> = ({
  level,
  highlight,
  placeholder = DEFAULT_PLACEHOLDER,
  ...props
}) => {
  return (
    <Container>
      <StyledFileInput {...props} />
      <FilePlaceholder level={level} highlight={highlight}>
        <PlaceholderText>{placeholder}</PlaceholderText>
      </FilePlaceholder>
    </Container>
  );
};
