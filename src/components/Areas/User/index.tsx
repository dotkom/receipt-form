import React from 'react';
import styled from 'styled-components';
import { Button } from '../../Button';
import { FieldSet, SeparatedFieldSet } from '../../FieldSet';
import { OwLogo } from '../../Icons/OwLogo';
import { FileInput, Input } from '../../Input';
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
  return (
    <>
      <InfoFieldSet>
        <LoginText />
        <SeparatedFieldSet>
          <LoginButton>
            <OwButtonLogo />
            <ButtonText>LOGG INN</ButtonText>
          </LoginButton>
        </SeparatedFieldSet>
      </InfoFieldSet>
      <FieldSet>
        <Input label="Navn" />
        <Input label="E-post" />
      </FieldSet>
      <FileInput label="Signatur" />
    </>
  );
};
