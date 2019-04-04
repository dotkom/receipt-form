import React, { useContext } from 'react';
import styled from 'styled-components';

import { FieldSet } from 'components/FieldSet';
import { CommitteeDropdown } from 'components/Input/CommitteeDropdown';
import { ReceiptNumberField } from 'components/Input/ReceiptNumberField';
import { ReceiptTextField } from 'components/Input/ReceiptTextField';
import { ReceiptTypeRadio } from 'components/Input/ReceiptTypeRadio';
import { ReceiptContext } from 'contexts/ReceiptData';

import { AccountField } from './AccountField';

const RadioFieldSet = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;

const ContentFieldSet = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BankInfo = () => {
  const { state } = useContext(ReceiptContext);

  return (
    <>
      <ContentFieldSet>
        <div>
          <RadioFieldSet>
            <ReceiptTypeRadio label="Utlegg" value="deposit" tooltip="Hvis du har lagt ut med ditt eget kort" />
            <ReceiptTypeRadio
              label="Bankkort"
              value="card"
              tooltip="Hvis du har betalt for noe med ett av Online sine kort"
            />
          </RadioFieldSet>
        </div>
      </ContentFieldSet>
      <FieldSet>
        {state.type === 'deposit' && <AccountField />}
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
