import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

import { AttachmentsInputs } from './AttachmentInputs';
import { FileSize } from './FileSize';

const Info = styled.h4`
  color: ${colors.figmaGray};
  margin-bottom: 0;
`;

const INFO_MESSAGE = `
Bruk scanner eller scanner-app for å få et utsnitt og tydelig bilde av kvitteringen. Kvitteringen må være gyldig, utskrift fra bankkortterminal holder ikke.
`;

export const Attachments: FC = () => {
  return (
    <>
      <Info>{INFO_MESSAGE}</Info>
      <AttachmentsInputs />
      <FileSize />
    </>
  );
};
