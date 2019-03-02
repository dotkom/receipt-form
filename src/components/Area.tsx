import React, { FC } from 'react';
import styled from 'styled-components';

export interface IAreaProps {
  color?: string;
  header: string;
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
  box-sizing: border-box;
`;

const AreaHeader = styled.h2`
  color: #8e8e8e;
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
