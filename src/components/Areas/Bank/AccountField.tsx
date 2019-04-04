import React, { FC } from 'react';

import { ReceiptTextField } from 'components/Input/ReceiptTextField';

const FORMAT_ACCOUNT_VALUE = (value: string): string => {
  const chars = value.replace(/\ /g, '').split('');
  let insertedSpace = '';
  for (let i = 0; i < chars.length; i++) {
    if (i >= 11) {
      break;
    } else if (i === 4 || i === 6) {
      insertedSpace += ' ';
    }
    const char = chars[i];
    insertedSpace += char;
  }
  return insertedSpace;
};

export const AccountField: FC = () => {
  return (
    <ReceiptTextField
      field="account"
      label="Kontonummer"
      placeholder="Kontonummer for tilbakeføring"
      format={FORMAT_ACCOUNT_VALUE}
    />
  );
};
