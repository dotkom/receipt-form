import React from 'react';

import { colors } from 'constants/colors';

import { Area } from './Area';
import { BankInfo } from './Areas/Bank';
import { ExtraInfo } from './Areas/Extra';
import { UserInfo } from './Areas/User';

export const Main = () => {
  return (
    <main>
      <Area header="Personinformasjon">
        <UserInfo />
      </Area>
      <Area header="Kvitteringsinformasjon" color={colors.backgroundGray}>
        <BankInfo />
      </Area>
      <Area header="Extrainformasjon">
        <ExtraInfo />
      </Area>
    </main>
  );
};
