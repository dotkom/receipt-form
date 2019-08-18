import React, { useEffect, useState } from 'react';
import { batch } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'components/Button';
import { SeparatedFieldSet } from 'components/FieldSet';
import { Spinner } from 'components/Spinner';
import { colors } from 'constants/colors';
import { ValidationLevel } from 'form/validation';
import { downloadFormAction, emailFormAction } from 'redux/actions/submitActions';
import { useDispatch, useSelector, useThunk } from 'redux/hooks';
import { ActionType as InteractionActionType } from 'redux/reducers/interactionReducer';
import { ActionType as StatusActionType } from 'redux/reducers/statusReducer';
import { State } from 'redux/types';

import { ResponseMessage } from './ResponseMessage';

const VALIDATION_COUNT = (count: number) => `
  Det er ${count === 1 ? 'én' : count} valideringsfeil i skjemaet, du må rette opp i ${
  count === 1 ? 'denne' : 'disse'
} før du kan sende!
`;

const WarningMessage = styled.h3`
  color: ${colors.red};
`;

const selectErrorCount = (state: State): number => {
  const errors = Object.values(state.validation)
    .flat()
    .filter((val) => val.level === ValidationLevel.REQUIRED && !val.valid);
  return errors.length;
};

export const Submit = () => {
  const dispatch = useDispatch();
  const errorCount = useSelector(selectErrorCount);
  const isValid = errorCount === 0;
  const downloadLoading = useSelector((state) => state.status.isDownloading);
  const mailLoading = useSelector((state) => state.status.isDownloading);
  const response = useSelector((state) => state.status.responseMessage);
  const loading = mailLoading || downloadLoading;
  const initDownload = useThunk(downloadFormAction());
  const initSendMail = useThunk(emailFormAction());

  const [interacted, setInteraction] = useState(false);

  useEffect(() => {
    if (loading) {
      dispatch({ type: StatusActionType.SET_RESPONSE_MESSAGE, data: null });
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInteraction = () => {
    batch(() => {
      dispatch({ type: InteractionActionType.SET_ALL_INTERACTED });
      setInteraction(true);
    });
  };

  const download = async () => {
    handleInteraction();
    if (isValid) {
      initDownload();
    }
  };

  const send = async () => {
    handleInteraction();
    if (isValid) {
      initSendMail();
    }
  };

  return (
    <>
      {!isValid && interacted && <WarningMessage>{VALIDATION_COUNT(errorCount)}</WarningMessage>}
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
