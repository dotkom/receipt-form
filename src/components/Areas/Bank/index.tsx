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
  const disableAccount = state.type === 'deposit';
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
        <ReceiptTextField field="account" label="Kontonummer" disabled={disableAccount} />
        <ReceiptNumberField field="amount" label="Beløp" />
      </FieldSet>
      <FieldSet>
        <CommitteeDropdown />
        <ReceiptTextField field="intent" label="Anledning" />
      </FieldSet>
    </>
  );
};
