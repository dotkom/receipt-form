import React, { useEffect, useState } from 'react';
import { batch, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'components/Button';
import { SeparatedFieldSet } from 'components/FieldSet';
import { Spinner } from 'components/Spinner';
import { colors } from 'constants/colors';
import { ValidationLevel } from 'form/validation';
import { downloadFormAction, emailFormAction } from 'redux/actions/submitActions';
import { useDispatch, useSelector } from 'redux/hooks';
import { setAllInteracted } from 'redux/reducers/interactionReducer';
import { setResponse } from 'redux/reducers/statusReducer';
import { State } from 'redux/store';

import { ResponseMessage } from './ResponseMessage';

const VALIDATION_COUNT = (count: number) => `
  Det er ${count === 1 ? 'én' : count} valideringsfeil i skjemaet, du må rette opp i ${
  count === 1 ? 'denne' : 'disse'
} før du kan sende!
`;

const WarningMessage = styled.h3`
  color: ${colors.validationError};
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
  const response = useSelector((state) => state.status.response, shallowEqual);
  const loading = mailLoading || downloadLoading;

  const [interacted, setInteraction] = useState(false);

  useEffect(() => {
    if (loading) {
      dispatch(setResponse(null));
    }
  }, [loading, dispatch]);

  const handleInteraction = () => {
    batch(() => {
      dispatch(setAllInteracted());
      setInteraction(true);
    });
  };

  const download = async () => {
    handleInteraction();
    if (isValid) {
      dispatch(downloadFormAction());
    }
  };

  const send = async () => {
    handleInteraction();
    if (isValid) {
      dispatch(emailFormAction());
    }
  };

  return (
    <>
      {!isValid && interacted && <WarningMessage>{VALIDATION_COUNT(errorCount)}</WarningMessage>}
      {!!response && <ResponseMessage statusCode={response.statusCode} message={response.body.message} />}
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
