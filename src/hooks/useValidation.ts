import { useContext } from 'react';

import { ReceiptContext } from 'contexts/ReceiptData';
import { IState } from 'form/state';
import { ValidationLevel } from 'form/validation';

export const useValidation = (field: keyof IState) => {
  const { validation: allValidations } = useContext(ReceiptContext);

  const validations = allValidations[field];
  const validation = validations.filter((val) => !val.valid);
  const level = validation.reduce<ValidationLevel>(
    (current, validator) => (current < validator.level ? validator.level : current),
    ValidationLevel.NONE
  );

  return { validation, level: validation.length ? level : ValidationLevel.VALID };
};
