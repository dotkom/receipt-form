import { Middleware } from 'redux';

import { validate } from 'form/validation';
import { formDataUpdated } from 'redux/reducers/formReducer';
import { setValidation } from 'redux/reducers/validationReducer';
import { State } from 'redux/store';

export const formValidatorMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === formDataUpdated.type) {
    const { form } = store.getState() as State;
    const validation = validate(form);
    store.dispatch(setValidation(validation));
  }
  return result;
};
