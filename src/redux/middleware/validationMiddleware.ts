import { Middleware } from 'redux';

import { validate } from 'form/validation';
import { ActionType as FormActionType } from 'redux/reducers/formReducer';
import { ActionType as ValidationActionType } from 'redux/reducers/validationReducer';
import { Dispatch, State, Store } from 'redux/types';

export const formValidatorMiddleware: Middleware<Store, State, Dispatch> = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === FormActionType.CHANGE) {
    const { form } = store.getState();
    const validation = validate(form);
    store.dispatch({
      type: ValidationActionType.SET_VALIDATION,
      data: validation,
    });
  }
  return result;
};
