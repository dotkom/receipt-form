import React from 'react';
import styled from 'styled-components';
import { Area } from './Area';
import { UserInfo } from './Areas/User';
import { BankInfo } from './Areas/Bank';
import { ExtraInfo } from './Areas/Extra';

export const Main = () => {
  return (
    <>
      <Area><UserInfo /></Area>
      <Area color="#f2f2f2"><BankInfo /></Area>
      <Area><ExtraInfo /></Area>
    </>
  );
};
