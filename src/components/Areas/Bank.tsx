import React from 'react';
import styled from 'styled-components';
import { Input, RadioButton } from '../Input';
import { FieldSet, SeparatedFieldSet } from '../FieldSet';

export const BankInfo = () => {
  return (
    <>
      <FieldSet>
        <SeparatedFieldSet>
          <RadioButton label="Utlegg" />
          <RadioButton label="Bankkort" />
        </SeparatedFieldSet>
        <Input label="Kontonummer" type="number" />
      </FieldSet>
      <FieldSet>
        <Input label="Beløp" type="number" />
        <Input label="Anledning" />
      </FieldSet>
    </>
  )
};
