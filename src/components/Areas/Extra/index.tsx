import React, { useContext } from 'react';

import { Button } from 'components/Button';
import { SeparatedFieldSet } from 'components/FieldSet';
import { FileInput, TextArea } from 'components/Input';
import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType } from 'hooks/useReceiptData';

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
      <TextArea label="Kommentarer" />
      <FileInput label="Vedlegg" />
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
