import React from 'react';

import { Area } from './Area';
import { BankInfo } from './Areas/Bank';
import { ExtraInfo } from './Areas/Extra';
import { UserInfo } from './Areas/User';

export const Main = () => {
  return (
    <>
      <Area header="Personinformasjon">
        <UserInfo />
      </Area>
      <Area header="Kvitteringsinformasjon" color="#f2f2f2">
        <BankInfo />
      </Area>
      <Area header="Extrainformasjon">
        <ExtraInfo />
      </Area>
    </>
  );
};
