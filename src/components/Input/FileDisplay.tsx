import React, { FC } from 'react';
import styled from 'styled-components';

import { FakeInput } from './FakeInput';
import { FileImage } from './FileImage';

const FileName = styled.p`
  color: #8e8e8e;
`;

export interface IFileDisplayProps {
  file: File;
  image: string | null;
}

export const FileDisplay: FC<IFileDisplayProps> = ({ file, image }) => {
  return <FakeInput>{image ? <FileImage src={image} /> : <FileName>{file.name}</FileName>}</FakeInput>;
};
