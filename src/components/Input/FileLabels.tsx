import React, { FC } from 'react';
import styled from 'styled-components';

import { Cross } from 'components/Icons/Cross';

import { Label } from './Base';

const LabelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CrossContainer = styled.span`
  height: 2rem;
  width: 2rem;

  :hover {
    cursor: pointer;
  }
`;

export interface IFileLabelsProps {
  label: string;
  onCrossClick: () => void;
  displayCross: boolean;
}

export const FileLabels: FC<IFileLabelsProps> = ({ label, onCrossClick, displayCross }) => {
  return (
    <LabelsContainer>
      <Label>{label}</Label>
      {displayCross ? (
        <CrossContainer>
          <Cross onClick={onCrossClick} />
        </CrossContainer>
      ) : null}
    </LabelsContainer>
  );
};
