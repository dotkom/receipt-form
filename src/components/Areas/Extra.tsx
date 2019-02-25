import React from 'react';
import { FileInput, Input, TextArea, DateField } from '../Input';
import { FieldSet, SeparatedFieldSet } from '../FieldSet';
import { Button } from '../Button';

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
        <Button title="download" onClick={()=> {}} >Last ned PDF</Button>
        <Button title="send" onClick={()=> {}} >Send til Bankom</Button>
      </SeparatedFieldSet>
    </>
  );
};
