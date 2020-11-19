import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

interface Props {
  statusCode: number;
  message: string;
}

interface MessageProps {
  statusCode: number;
}

const GOOD_STATUS_CODES = [200, 201, 418];
const BAD_STATUS_CODES = [400, 401, 403, 404, 500, 501, 502, 503, 504];

const getStatusCodeColor = (code: number) => {
  if (GOOD_STATUS_CODES.includes(code)) {
    return colors.validationSuccess;
  } else if (BAD_STATUS_CODES.includes(code)) {
    return colors.validationError;
  } else {
    return colors.validationWarning;
  }
};

const Message = styled.h3<MessageProps>`
  color: ${({ statusCode }) => getStatusCodeColor(statusCode)};
`;

const GENERIC_ERROR = `
Noe ser ut til å ha gått galt under prosesseringen.
`;

export const ResponseMessage: FC<Props> = ({ statusCode, message }) => {
  return <Message statusCode={statusCode}>{message || GENERIC_ERROR}</Message>;
};
