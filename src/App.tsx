import React from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';

const AppStyle = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

export const App = () => {
  return (
    <AppStyle>
      <Header />
      <Main />
      <Footer />
    </AppStyle>
  );
};

export default App;
