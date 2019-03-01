import React from 'react';
import styled from 'styled-components';

import { useUserInfo } from '../../../hooks/useUserInfo';
import { Button } from '../../Button';
import { FieldSet, SeparatedFieldSet } from '../../FieldSet';
import { OwLogo } from '../../Icons/OwLogo';
import { FileInput } from '../../Input';
import { ReceiptTextField } from '../../Input/ReceiptTextField';
import { LoginText } from './Logintext';

const InfoFieldSet = styled(FieldSet)`
  grid-template-columns: 2fr 1fr;
`;

const LoginButton = styled(Button)`
  display: flex;
  margin: auto;
`;

const OwButtonLogo = styled(OwLogo)`
  height: 1.4rem;
  margin-right: 0.6rem;
`;

const ButtonText = styled.p`
  margin: auto;
  font-size: 1.1rem;
`;

export const UserInfo = () => {
  const { logIn } = useUserInfo();
  return (
    <>
      <InfoFieldSet>
        <LoginText />
        <SeparatedFieldSet>
          <LoginButton onClick={logIn}>
            <OwButtonLogo />
            <ButtonText>LOGG INN</ButtonText>
          </LoginButton>
        </SeparatedFieldSet>
      </InfoFieldSet>
      <FieldSet>
        <ReceiptTextField label="Navn" field="fullname" />
        <ReceiptTextField label="E-post" field="email" />
      </FieldSet>
      <FileInput label="Signatur" />
    </>
  );
};
