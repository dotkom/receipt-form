import React from 'react';
import styled from 'styled-components';
import { Input, RadioButton } from '../Input';
import { FieldSet } from '../FieldSet';

export const BankInfo = () => {
  return (
    <>
      <RadioButton label="Innskudd" />
      <RadioButton label="Uttak" />
      <RadioButton label="Bankkort" />
      <RadioButton label="Faktura" />
      <FieldSet>
        <Input label="Kontonummer" type="number" />
        <Input label="Beløp" type="number" />
      </FieldSet>
      <FieldSet>
        <Input label="Anledning" />
        <Input label="E-post til økonomiansvarlig" />
      </FieldSet>
    </>
  )
};
