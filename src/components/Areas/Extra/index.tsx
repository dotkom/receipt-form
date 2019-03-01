import React, { useContext } from 'react';
import { Button } from '../../Button';
import { FieldSet, SeparatedFieldSet } from '../../FieldSet';
import { FileInput, Input, TextArea } from '../../Input';

import { ReceiptContext } from '../../../contexts/ReceiptData';
import { ActionType } from '../../../hooks/useReceiptData';
import { ReceiptTextField } from '../../Input/ReceiptTextField';

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
