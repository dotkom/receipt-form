import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Button } from 'components/Button';
import { SeparatedFieldSet } from 'components/FieldSet';
import { ReceiptTextArea } from 'components/Input/ReceiptTextArea';
import { colors } from 'constants/colors';
import { InteractionContext } from 'contexts/Interaction';
import { ReceiptContext } from 'contexts/ReceiptData';
import { interactAll } from 'form/interaction';
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
  const { updateInteraction } = useContext(InteractionContext);

  const [interacted, setInteraction] = useState(false);

  const send = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      dispatch({ type: ActionType.SEND, data: undefined });
      updateInteraction(interactAll());
      setInteraction(true);
    });
  };

  const download = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      dispatch({ type: ActionType.DOWNLOAD, data: undefined });
      updateInteraction(interactAll());
      setInteraction(true);
    });
  };
  const errors = Object.values(validation)
    .flat()
    .filter((val) => val.level === ValidationLevel.REQUIRED && !val.valid);
  const isValid = errors.length === 0;

  return (
    <>
      <ReceiptTextArea field="comments" label="Kommentarer" placeholder={COMMENTS_PLACEHOLDER} />
      <AttachmentsInputs />
      <FileSize />
      {!isValid && interacted && <WarningMessage>{VALIDATION_COUNT(errors.length)}</WarningMessage>}
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
