import React, { FC, HTMLProps } from 'react';
import styled from 'styled-components';

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
  background: #fff;
  border: 2px solid #e5e5e5;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  margin-right: 0.6rem;

  :focus {
    border-color: #0060a3;
  }
`;

const StyledRadioChecked = styled(StyledRadio)`
  background: #0060a3;
`;

const RadioContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export interface IRadioProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

export const RadioButton: FC<IRadioProps> = ({ className, label, checked = false, onClick, ...rest }) => {
  /** Extract 'ref', 'type' and 'as' from props as styled-components types mismatch with React */
  const { ref, type, as, ...props } = rest;
  return (
    <RadioLabel className={className} onClick={onClick}>
      <RadioContainer>
        <HiddenRadio checked={checked} {...props} />
        {checked ? <StyledRadioChecked /> : <StyledRadio />}
      </RadioContainer>
      {label}
    </RadioLabel>
  );
};
