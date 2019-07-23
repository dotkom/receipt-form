import React, { FC } from 'react';
import styled from 'styled-components';

import { StoreProvider } from 'redux/store';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';

const AppStyle = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

export const App: FC = () => {
  return (
    <StoreProvider>
      <AppStyle>
        <Header />
        <Main />
        <Footer />
      </AppStyle>
    </StoreProvider>
  );
};

export default App;
