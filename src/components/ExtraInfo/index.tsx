import React from 'react';
import { FileInput, Input, TextArea, DateField } from '../Input';
import { FieldSet } from '../FieldSet';
import { Button } from '../Button';

export const ExtraInfo = () => {
  return (
    <>
      <FieldSet>
        <Input label="Komité" />
        <DateField label="Kjøpsdato" />
      </FieldSet>
      <TextArea label="Kommentarer" />
      <FileInput label="Vedlegg" />
      <FieldSet>
        <Button title="download" onClick={()=> {}} >Last ned PDF</Button>
        <Button title="send" onClick={()=> {}} >Send til Bankom</Button>
      </FieldSet>
    </>
  );
};
