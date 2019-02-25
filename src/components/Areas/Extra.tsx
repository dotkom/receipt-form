import React from 'react';
import { Button } from '../Button';
import { FieldSet, SeparatedFieldSet } from '../FieldSet';
import { DateField, FileInput, Input, TextArea } from '../Input';

export const ExtraInfo = () => {
  return (
    <>
      <FieldSet>
        <Input label="Komité" />
        <Input label="E-post til økonomiansvarlig" />
      </FieldSet>
      <TextArea label="Kommentarer" />
      <FileInput label="Vedlegg" />
      <SeparatedFieldSet>
        <Button title="download">Last ned PDF</Button>
        <Button title="send">Send til Bankom</Button>
      </SeparatedFieldSet>
    </>
  );
};
