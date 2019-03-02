import React, { useContext } from 'react';
import styled from 'styled-components';

import { FieldSet } from 'components/FieldSet';
import { CommitteeDropdown } from 'components/Input/CommitteeDropdown';
import { ReceiptNumberField } from 'components/Input/ReceiptNumberField';
import { ReceiptTextField } from 'components/Input/ReceiptTextField';
import { ReceiptTypeRadio } from 'components/Input/ReceiptTypeRadio';
import { ReceiptContext } from 'contexts/ReceiptData';

const RadioFieldSet = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.4rem 0;

  @media screen and (max-width: 768px) {
    margin: 1rem 1rem 0;
  }
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
  \$\{Vet ikke helt hva som burde stå her ennå, tar gjerne imot ideer?\}
`;

const RadioInfo = styled.p`
  color: #8e8e8e;
  font-size: 20px;
`;

export const BankInfo = () => {
  const { state } = useContext(ReceiptContext);
  return (
    <>
      <ContentFieldSet>
        <div>
          <RadioFieldSet>
            <ReceiptTypeRadio label="Utlegg" value="deposit" />
            <ReceiptTypeRadio label="Bankkort" value="card" />
          </RadioFieldSet>
        </div>
        <RadioInfo>{ABOUT_PAYMENT_TYPE}</RadioInfo>
      </ContentFieldSet>
      <FieldSet>
        {state.type === 'deposit' && (
          <ReceiptTextField field="account" label="Kontonummer" placeholder="Kontonummer for tilbakeføring" />
        )}
        {state.type === 'card' && (
          <ReceiptTextField
            field="cardDetails"
            label="Kortinformasjon"
            placeholder="Kortnummer/hvilken komite kortet tilhører"
          />
        )}
        <ReceiptNumberField field="amount" label="Beløp" placeholder="Beløpet i NOK" />
      </FieldSet>
      <FieldSet>
        <CommitteeDropdown />
        <ReceiptTextField field="intent" label="Anledning" placeholder="Grunnlaget for kjøpet" />
      </FieldSet>
    </>
  );
};
