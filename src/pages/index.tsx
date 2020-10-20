import React, { useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Main } from 'components/Main';
import { GetStaticProps, NextPage } from 'next';
import { getAllGroups, Group } from 'models/groups';
import { useDispatch } from 'react-redux';
import { loadGroups } from 'redux/reducers/groupsReducer';

const AppStyle = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

export const IndexPage: NextPage<StaticProps> = ({ groups }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGroups(groups));
  }, [dispatch, groups]);

  return (
    <>
      <Head>
        <title>Kvitteringsskjema | Linjeforeningen Online</title>
      </Head>
      <AppStyle>
        <Header />
        <Main />
        <Footer />
      </AppStyle>
    </>
  );
};

interface StaticProps {
  groups: Group[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const groups = await getAllGroups();
  return {
    props: {
      groups,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};

export default IndexPage;
