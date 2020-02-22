import React, { FC, HTMLProps } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

import { BaseLabelStyle } from './Base';

const RadioLabel = styled.div`
  ${BaseLabelStyle}
  display: flex;

  :hover {
    cursor: pointer;
  }
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledRadio = styled.div`
  display: inline-block;
  background: ${colors.white};
  border: 2px solid ${colors.gray};
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  margin-right: 0.6rem;

  display: grid;
  justify-content: center;
  align-content: center;

  :focus {
    border-color: ${colors.primary};
  }
`;

const RadioContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Checked = styled.div`
  background: ${colors.primary};
  width: 10px;
  height: 10px;
  border-radius: 10px;
`;

const StyledRadioChecked = () => {
  return (
    <StyledRadio>
      <Checked />
    </StyledRadio>
  );
};

const Container = styled.div``;

const Tooltip = styled.p`
  color: ${colors.darkGray};
`;

export interface IRadioProps extends HTMLProps<HTMLInputElement> {
  label: string;
  tooltip: string;
}

export const RadioButton: FC<IRadioProps> = ({ className, label, checked = false, onClick, ...rest }) => {
  /** Extract 'ref', 'type' and 'as' from props as styled-components types mismatch with React */
  const { ref, type, as, tooltip, ...props } = rest;
  return (
    <Container>
      <RadioLabel className={className} onClick={onClick}>
        <RadioContainer>
          <HiddenRadio checked={checked} {...props} />
          {checked ? <StyledRadioChecked /> : <StyledRadio />}
        </RadioContainer>
        {label}
      </RadioLabel>
      <Tooltip>{tooltip}</Tooltip>
    </Container>
  );
};
