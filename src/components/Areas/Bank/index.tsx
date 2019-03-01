import React, { useContext } from 'react';
import styled from 'styled-components';

import { FieldSet } from '../../FieldSet';
import { RadioButton } from '../../Input';
import { ReceiptNumberField } from '../../Input/ReceiptNumberField';
import { ReceiptTextField } from '../../Input/ReceiptTextField';

import { ReceiptContext } from '../../../contexts/ReceiptData';

const RadioFieldSet = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.4rem 0;
`;

const ContentFieldSet = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ABOUT_PAYMENT_TYPE = `
  Hvis dette velger du det, hvis det andre velger du det andre.
  Og sånn fungerer denne funksjonaliteten!
`;

const RadioInfo = styled.p`
  color: #8e8e8e;
  font-size: 20px;
`;

export const BankInfo = () => {
  const { state } = useContext(ReceiptContext);
  const disableAccount = state.type === 'deposit';
  return (
    <>
      <ContentFieldSet>
        <div>
          <RadioFieldSet>
            <RadioButton label="Utlegg" />
            <RadioButton label="Bankkort" />
          </RadioFieldSet>
        </div>
        <RadioInfo>{ABOUT_PAYMENT_TYPE}</RadioInfo>
      </ContentFieldSet>
      <FieldSet>
        <ReceiptTextField field="account" label="Kontonummer" disabled={disableAccount} />
        <ReceiptNumberField field="amount" label="Beløp" />
      </FieldSet>
      <FieldSet>
        <ReceiptTextField label="Komité" field="committee" />
        <ReceiptTextField field="intent" label="Anledning" />
      </FieldSet>
    </>
  );
};
