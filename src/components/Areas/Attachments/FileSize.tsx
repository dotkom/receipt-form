import React from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';
import { FILE_SIZE_MAX, FILE_SIZE_WARN } from 'form/validation';
import { useSelector } from 'redux/hooks';
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
  color: ${colors.orange};
`;

const ErrorText = styled(StatusText)`
  color: ${colors.red};
`;

export const FileSize = () => {
  const totalSize = useSelector((state) => getTotalFileSize(state.form));
  const sizeText = formatBytes(totalSize);
  const sizeTextMax = formatBytes(FILE_SIZE_MAX);

  return (
    <StatusContainer>
      {totalSize >= FILE_SIZE_WARN ? (
        totalSize >= FILE_SIZE_MAX ? (
          <ErrorText>{`Opplastede filer overgår tillat størrelse: ${sizeText} / ${sizeTextMax}`}</ErrorText>
        ) : (
          <WarningText>{`Total størrelse på opplastede filer nærmer seg begrensningen: ${sizeText} / ${sizeTextMax}`}</WarningText>
        )
      ) : null}
    </StatusContainer>
  );
};
