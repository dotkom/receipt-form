import React, { FC } from 'react';
import styled from 'styled-components';

export interface IAreaProps {
  color?: string;
}

const AreaContainer = styled.div`
  background: ${(props) => props.color || '#fff'};
  width: 100%;
`;

const AreaContent = styled.div`
  width: 54rem;
  max-width: 96vw;
  margin: auto;
  padding: 1rem;
`;

export const Area: FC<IAreaProps> = (props) => {
  return (
    <AreaContainer color={props.color}>
      <AreaContent>{props.children}</AreaContent>
    </AreaContainer>
  );
};
