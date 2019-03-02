import React, { FC } from 'react';
import styled from 'styled-components';

import { formatBytes } from 'utils/bytes';

const InfoBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

const FileSize = styled.p`
  color: #8e8e8e;
  margin: 0.4rem 0 0.4rem 0.8rem;
`;

export interface IFileInfoProps {
  file?: File | null;
}

export const FileInfo: FC<IFileInfoProps> = ({ file }) => {
  return file ? (
    <InfoBar>
      <FileSize>{`${file.type}`}</FileSize>
      <FileSize>{formatBytes(file.size)}</FileSize>
    </InfoBar>
  ) : null;
};
