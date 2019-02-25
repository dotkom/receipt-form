import React from 'react';
import styled from 'styled-components';
import { Area } from './Area';
import { BankInfo } from './Areas/Bank';
import { ExtraInfo } from './Areas/Extra';
import { UserInfo } from './Areas/User';

export const Main = () => {
  return (
    <>
      <Area>
        <UserInfo />
      </Area>
      <Area color="#f2f2f2">
        <BankInfo />
      </Area>
      <Area>
        <ExtraInfo />
      </Area>
    </>
  );
};
