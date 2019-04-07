import React, { FC } from 'react';
import styled from 'styled-components';

import { FakeInput } from './FakeInput';
import { FileImage } from './FileImage';

import { colors } from 'constants/colors';
import { ValidationLevel } from 'form/validation';

const FileName = styled.p`
  color: ${colors.darkGray};
`;

export interface IFileDisplayProps {
  file: File;
  image: string | null;
  level?: ValidationLevel;
}

export const FileDisplay: FC<IFileDisplayProps> = ({ file, image, level }) => {
  return <FakeInput level={level}>{image ? <FileImage src={image} alt={`File: ${file.name}`} /> : <FileName>{file.name}</FileName>}</FakeInput>;
};
