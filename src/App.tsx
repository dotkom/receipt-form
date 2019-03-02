import React, { FC } from 'react';
import styled from 'styled-components';

import { ReceiptData } from 'contexts/ReceiptData';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';

const AppStyle = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const Contexts: FC = ({ children }) => {
  return <ReceiptData>{children}</ReceiptData>;
};

export const App = () => {
  return (
    <Contexts>
      <AppStyle>
        <Header />
        <Main />
        <Footer />
      </AppStyle>
    </Contexts>
  );
};

export default App;
