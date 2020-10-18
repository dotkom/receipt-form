import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { StoreProvider } from 'redux/store';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Main } from 'components/Main';

const AppStyle = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

export const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Kvitteringsskjema | Linjeforeningen Online</title>
      </Head>
      <StoreProvider>
        <AppStyle>
          <Header />
          <Main />
          <Footer />
        </AppStyle>
      </StoreProvider>
    </>
  );
};

export default IndexPage;
