import React from 'react';

import { colors } from 'constants/colors';

import { Area } from './Area';
import { Attachments } from './Areas/Attachments';
import { BankInfo } from './Areas/Bank';
import { ExtraInfo } from './Areas/Extra';
import { Submit } from './Areas/Submit';
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
      <Area header="Vedlegg/kvitteringer">
        <Attachments />
      </Area>
      <Area header="">
        <Submit />
      </Area>
    </main>
  );
};
