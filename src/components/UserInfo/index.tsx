import React from 'react';
import styled from 'styled-components';
import { LoginText } from './Logintext';
import { Button } from '../Button';
import { FileInput, Input } from '../Input';
import { FieldSet } from '../FieldSet';

const LoginContainer = styled.div`
  display: flex;
`;

export const UserInfo = () => {
  return (
    <>
      <LoginContainer>
        <LoginText />
        <Button>
          LOGG INN
        </Button>
      </LoginContainer>
      <FieldSet>
        <Input label="Navn" />
        <Input label="E-post" />
      </FieldSet>
      <FileInput label="Signatur" />
    </>
  );
};
