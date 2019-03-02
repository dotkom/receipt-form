import React, { useContext } from 'react';

import { Button } from 'components/Button';
import { SeparatedFieldSet } from 'components/FieldSet';
import { TextArea } from 'components/Input';
import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType } from 'hooks/useReceiptData';

import { AttachmentsInputs } from './AttachmentInputs';
import { FileSize } from './FileSize';

const COMMENTS_PLACEHOLDER = `Andre kommentarer eller viktig informasjon rundt kjøpet kan skrives her

Hvis det gjelder teambuilding, skriv også inn navn på alle deltakere`;

export const ExtraInfo = () => {
  const { dispatch } = useContext(ReceiptContext);

  const send = () => {
    dispatch({ type: ActionType.SEND, data: undefined });
  };

  const download = () => {
    dispatch({ type: ActionType.DOWNLOAD, data: undefined });
  };

  return (
    <>
      <TextArea label="Kommentarer" placeholder={COMMENTS_PLACEHOLDER} />
      <AttachmentsInputs />
      <FileSize />
      <SeparatedFieldSet>
        <Button title="download" onClick={download}>
          Last ned PDF
        </Button>
        <Button title="send" onClick={send}>
          Send til Bankom
        </Button>
      </SeparatedFieldSet>
    </>
  );
};
