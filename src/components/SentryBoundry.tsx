import * as Sentry from '@sentry/browser';
import { Component, ErrorInfo, FC } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

const ErrorMessage = styled.h3`
  color: ${colors.lightBlack};
`;

const ErrorLink = styled.a``;

const ErrorDialog: FC = () => {
  return (
    <>
      <ErrorMessage>Det skjedde noe galt med siden</ErrorMessage>
      <ErrorLink onClick={() => Sentry.showReportDialog()}>Klikk her for å repportere feilen</ErrorLink>
    </>
  );
};

export class SentryBoundry extends Component {
  public state = { error: null };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error });
    Sentry.withScope((scope) => {
      Object.entries(errorInfo).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
      Sentry.captureException(error);
    });
  }

  public render() {
    return this.state.error ? <ErrorDialog /> : this.props.children;
  }
}
