import { combineReducers } from 'redux';

import { formReducer } from './formReducer';
import { interactionReducer } from './interactionReducer';
import { statusReducer } from './statusReducer';
import { userReducer } from './userReducer';
import { validationReducer } from './validationReducer';

export const rootReducer = combineReducers({
  form: formReducer,
  validation: validationReducer,
  interaction: interactionReducer,
  userData: userReducer,
  status: statusReducer,
});
