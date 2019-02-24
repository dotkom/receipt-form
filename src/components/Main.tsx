import React from 'react';
import styled from 'styled-components';
import { Area } from './Area';
import { UserInfo } from './UserInfo';
import { BankInfo } from './BankInfo';
import { ExtraInfo } from './ExtraInfo';

export const Main = () => {
  return (
    <>
      <Area><UserInfo /></Area>
      <Area color="#f2f2f2"><BankInfo /></Area>
      <Area><ExtraInfo /></Area>
    </>
  );
};
