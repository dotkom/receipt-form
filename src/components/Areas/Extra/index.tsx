import React from 'react';

import { ReceiptTextArea } from 'components/Input/ReceiptTextArea';

const COMMENTS_PLACEHOLDER = `Andre kommentarer eller viktig informasjon rundt kjøpet kan skrives her

Hvis det gjelder teambuilding, skriv også inn navn på alle deltakere`;

export const ExtraInfo = () => {
  return (
    <>
      <ReceiptTextArea field="comments" label="Kommentarer" placeholder={COMMENTS_PLACEHOLDER} />
    </>
  );
};
