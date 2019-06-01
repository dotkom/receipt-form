import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Button } from 'components/Button';
import { SeparatedFieldSet } from 'components/FieldSet';
import { Spinner } from 'components/Spinner';
import { colors } from 'constants/colors';
import { InteractionContext } from 'contexts/Interaction';
import { ReceiptContext } from 'contexts/ReceiptData';
import { interactAll } from 'form/interaction';
import { ValidationLevel } from 'form/validation';
import { NonNullableState } from 'lambda/generatePDF';
import { IResultMessage } from 'lambda/handler';
import { getFileName } from 'lambda/tools/format';
import { downloadFile } from 'utils/download';
import { postReceipt } from 'utils/postReceipt';
import { readDataUrlAsFile } from 'utils/readDataUrlAsFile';

import { ResponseMessage } from './ResponseMessage';

const VALIDATION_COUNT = (count: number) => `
  Det er ${count === 1 ? 'én' : count} valideringsfeil i skjemaet, du må rette opp i ${
  count === 1 ? 'denne' : 'disse'
} før du kan sende!
`;

const WarningMessage = styled.h3`
  color: ${colors.red};
`;

const handleDownload = async (response: IResultMessage, state: NonNullableState) => {
  /** Just make sure it exists, because the server may not return our pre-defined format, e.g. NGINX */
  if (response && response.body && response.body.data) {
    /** Use the same filename that would be generated when sending a mail */
    const fileName = getFileName(state);
    const pdfFile = await readDataUrlAsFile(response.body.data, fileName);
    if (pdfFile) {
      downloadFile(pdfFile);
    }
  }
};

export const Submit = () => {
  const { validation, state } = useContext(ReceiptContext);
  const { updateInteraction } = useContext(InteractionContext);

  const [interacted, setInteraction] = useState(false);
  const [response, setResponse] = useState<IResultMessage | null>(null);

  const [downloadLoading, setDownloadLoading] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);
  const loading = mailLoading || downloadLoading;

  useEffect(() => {
    if (loading) {
      setResponse(null);
    }
  }, [loading]);

  const errors = Object.values(validation)
    .flat()
    .filter((val) => val.level === ValidationLevel.REQUIRED && !val.valid);
  const isValid = errors.length === 0;

  const handleInteraction = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      updateInteraction(interactAll());
      setInteraction(true);
    });
  };

  const handleResponse = useMemo(
    () => (res: IResultMessage | null) => {
      ReactDOM.unstable_batchedUpdates(() => {
        setResponse(res || null);
        setDownloadLoading(false);
        setMailLoading(false);
      });
    },
    []
  );

  const send = async () => {
    handleInteraction();
    if (isValid) {
      setMailLoading(true);
      const res = await postReceipt({ ...state, mode: 'email' });
      handleResponse(res);
    }
  };

  const download = async () => {
    handleInteraction();
    if (isValid) {
      setDownloadLoading(true);
      const res = await postReceipt({ ...state, mode: 'download' });
      handleResponse(res);
      /** Response status 201, signifies 'Created' */
      if (res && res.statusCode === 201) {
        /** Intent cannot be null since a valid form is required to get here. Let us just hope that is true :) */
        handleDownload(res, state as NonNullableState);
      }
    }
  };

  return (
    <>
      {!isValid && interacted && <WarningMessage>{VALIDATION_COUNT(errors.length)}</WarningMessage>}
      {!!response && <ResponseMessage response={response} />}
      {loading && <Spinner />}
      <SeparatedFieldSet>
        <Button title="Last ned PDF til egen maskin" onClick={download} disabled={loading}>
          Last ned PDF
        </Button>
        <Button title="Send skjemaet direkte til Bankom" onClick={send} disabled={loading}>
          Send til Bankom
        </Button>
      </SeparatedFieldSet>
    </>
  );
};
