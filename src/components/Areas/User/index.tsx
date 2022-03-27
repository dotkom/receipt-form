import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'components/Button';
import { FieldSet, SeparatedFieldSet } from 'components/FieldSet';
import { OwLogo } from 'components/Icons/OwLogo';
import { ReceiptTextField } from 'components/Input/ReceiptTextField';
import { useUserInfo } from 'hooks/useUserInfo';

import { CreateSignature } from './CreateSignature';
import { LoginText } from './Logintext';
import { SignatureInput } from './SignatureInput';

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
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <InfoFieldSet>
        <LoginText />
        <SeparatedFieldSet>
          <LoginButton onClick={logIn}>
            <OwButtonLogo />
            <ButtonText>HENT BRUKERDATA</ButtonText>
          </LoginButton>
        </SeparatedFieldSet>
      </InfoFieldSet>
      <FieldSet>
        <ReceiptTextField label="Navn" field="fullname" placeholder="Ditt fulle navn" />
        <ReceiptTextField label="E-post" field="email" placeholder="Din e-postadresse. Onlinemail hvis du har" />
      </FieldSet>
      {editMode ? (
        <CreateSignature editClick={() => setEditMode(false)} />
      ) : (
        <SignatureInput editClick={() => setEditMode(true)} />
      )}
    </>
  );
};
