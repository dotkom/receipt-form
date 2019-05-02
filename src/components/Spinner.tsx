import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

const Container = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`;

const SpinnerSVG = styled.svg`
  width: 50px;
  margin-left: -25px;
`;

const SpinnerPath = styled.path`
  fill: none;
  stroke: ${colors.blue};
  stroke-width: 6;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  transform: rotate(0deg);
  transform-origin: 50% 50%;
  animation: 1.3s spin infinite;

  @keyframes spin {
    from {
      transfrom: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner: FC = () => {
  return (
    <Container>
      <SpinnerSVG version="1.1" x="0px" y="0px" viewBox="0 0 50 50">
        <SpinnerPath d="M25,8.2C15.72,8.2,8.2,15.72,8.2,25" />
      </SpinnerSVG>
    </Container>
  );
};
