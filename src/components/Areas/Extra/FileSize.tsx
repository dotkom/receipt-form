import React, { useContext } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';
import { ReceiptContext } from 'contexts/ReceiptData';
import { formatBytes } from 'utils/bytes';
import { getTotalFileSize } from 'utils/getTotalFileSize';

const StatusContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const StatusText = styled.h3`
  color: ${colors.darkGray};
`;

const WarningText = styled(StatusText)`
  color: ${colors.red};
`;

const MAX_SIZE = 19 * 1024 * 1024; // 19 MB

export const FileSize = () => {
  const { state } = useContext(ReceiptContext);
  const totalSize = getTotalFileSize(state);
  const sizeText = formatBytes(totalSize);

  return (
    <StatusContainer>
      {totalSize >= MAX_SIZE ? (
        <WarningText>{`Opplastede filer overgår tillat størrelse: ${sizeText} / ${formatBytes(MAX_SIZE)}`}</WarningText>
      ) : null}
    </StatusContainer>
  );
};
