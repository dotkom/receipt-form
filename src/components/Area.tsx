import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

export interface IAreaProps {
  color?: string;
  header: string;
}

const AreaContainer = styled.div`
  background: ${(props) => props.color || colors.white};
  width: 100%;
`;

const AreaContent = styled.div`
  width: 54rem;
  max-width: 96vw;
  margin: auto;
  padding: 1rem;
  box-sizing: border-box;
`;

const AreaHeader = styled.h2`
  color: ${colors.darkGray};
`;

export const Area: FC<IAreaProps> = (props) => {
  return (
    <AreaContainer color={props.color}>
      <AreaContent>
        <AreaHeader>{props.header}</AreaHeader>
        {props.children}
      </AreaContent>
    </AreaContainer>
  );
};
