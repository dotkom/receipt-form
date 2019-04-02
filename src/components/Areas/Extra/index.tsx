import React, { useContext } from 'react';
import styled from 'styled-components';

import { Button } from 'components/Button';
import { SeparatedFieldSet } from 'components/FieldSet';
import { ReceiptTextArea } from 'components/Input/ReceiptTextArea';
import { colors } from 'constants/colors';
import { ReceiptContext } from 'contexts/ReceiptData';
import { ValidationLevel } from 'form/validation';
import { ActionType } from 'hooks/useReceiptData';

import { AttachmentsInputs } from './AttachmentInputs';
import { FileSize } from './FileSize';

const COMMENTS_PLACEHOLDER = `Andre kommentarer eller viktig informasjon rundt kjøpet kan skrives her

Hvis det gjelder teambuilding, skriv også inn navn på alle deltakere`;

const VALIDATION_COUNT = (count: number) => `
  Det er ${count === 1 ? 'én' : count} valideringsfeil i skjemaet, du må rette opp i ${
  count === 1 ? 'denne' : 'disse'
} før du kan sende!
`;

const WarningMessage = styled.h3`
  color: ${colors.red};
`;

export const ExtraInfo = () => {
  const { dispatch, validation } = useContext(ReceiptContext);

  const send = () => {
    dispatch({ type: ActionType.SEND, data: undefined });
  };

  const download = () => {
    dispatch({ type: ActionType.DOWNLOAD, data: undefined });
  };
  const errors = Object.values(validation)
    .flat()
    .filter((val) => val.level === ValidationLevel.REQUIRED && !val.valid);
  const valid = errors.length === 0;

  return (
    <>
      <ReceiptTextArea field="comments" label="Kommentarer" placeholder={COMMENTS_PLACEHOLDER} />
      <AttachmentsInputs />
      <FileSize />
      {!valid && <WarningMessage>{VALIDATION_COUNT(errors.length)}</WarningMessage>}
      <SeparatedFieldSet>
        <Button title="download" onClick={download} disabled={!valid}>
          Last ned PDF
        </Button>
        <Button title="send" onClick={send} disabled={!valid}>
          Send til Bankom
        </Button>
      </SeparatedFieldSet>
    </>
  );
};
