import React from 'react';
import { Checkbox } from '@dotkomonline/design-system';
import { useDispatch } from '../redux/hooks';
import { formDataUpdated } from '../redux/reducers/formReducer';
import { useSelector } from 'react-redux';

export default function SaveInfoPrompt() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form.saveInfo || false);

  return (
    <Checkbox
      label="Lagre informasjon til neste gang?"
      onChange={() => dispatch(formDataUpdated({ saveInfo: !value }))}
    />
  );
}
