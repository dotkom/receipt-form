import React, { FC } from 'react';
import styled from 'styled-components';

import { FakeInput } from './FakeInput';
import { FileImage } from './FileImage';

import { colors } from 'constants/colors';

const FileName = styled.p`
  color: ${colors.darkGray};
`;

export interface IFileDisplayProps {
  file: File;
  image: string | null;
}

export const FileDisplay: FC<IFileDisplayProps> = ({ file, image }) => {
  return <FakeInput>{image ? <FileImage src={image} /> : <FileName>{file.name}</FileName>}</FakeInput>;
};
