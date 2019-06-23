import { IState } from 'form/state';
import { IValidation, ValidationLevel } from 'form/validation';
import { useSelector } from 'redux/hooks';

export const isValidationEqual = (val1: IValidation, val2: IValidation): boolean => {
  return val1.valid === val2.valid && val1.level === val2.level && val1.message === val2.message;
};

export const areValidationsEqual = (prev: IValidation[], next: IValidation[]): boolean => {
  if (prev.length !== next.length) {
    return false;
  }
  return prev.every((validation, i) => isValidationEqual(validation, next[i]));
};

export const useValidation = (field: keyof IState) => {
  const validations = useSelector((state) => state.validation[field], areValidationsEqual);
  const validation = validations.filter((val) => !val.valid);
  const level = validation.reduce<ValidationLevel>(
    (current, validator) => (current < validator.level ? validator.level : current),
    ValidationLevel.NONE
  );

  return { validation, level: validation.length ? level : ValidationLevel.VALID };
};
