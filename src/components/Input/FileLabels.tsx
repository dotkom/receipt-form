import React, { FC } from 'react';
import styled from 'styled-components';

import { Label } from './Base';

const LabelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  height: 2rem;
  align-self: flex-end;

  & > svg {
    height: 2rem;
    width: 2rem;

    margin-left: 2rem;

    :hover {
      cursor: pointer;
    }
  }
`;

export interface IFileLabelsProps {
  label: string;
}

export const FileLabels: FC<IFileLabelsProps> = ({ label, children }) => {
  return (
    <LabelsContainer>
      <Label>{label}</Label>
      <IconContainer>{children}</IconContainer>
    </LabelsContainer>
  );
};
