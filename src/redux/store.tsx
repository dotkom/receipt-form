import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { configureStore, DeepPartial, StateFromReducersMapObject } from '@reduxjs/toolkit';

import { formReducer } from './reducers/formReducer';
import { interactionReducer } from './reducers/interactionReducer';
import { statusReducer } from './reducers/statusReducer';
import { userReducer } from './reducers/userReducer';
import { validationReducer } from './reducers/validationReducer';
import { formValidatorMiddleware } from './middleware/validationMiddleware';

/* eslint sort-keys: "error" */
const reducer = {
  form: formReducer,
  validation: validationReducer,
  interaction: interactionReducer,
  userData: userReducer,
  status: statusReducer,
};
/* eslint sort-keys: "off" */

export type State = StateFromReducersMapObject<typeof reducer>;

export const initStore = (preloadedState: DeepPartial<State> = {}) => {
  const _store = configureStore({
    preloadedState,
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(formValidatorMiddleware),
  });
  return _store;
};

export const store = initStore();

export const StoreProvider: FC = (props) => {
  return <Provider {...props} store={store} />;
};

export type Dispatch = typeof store.dispatch;
export type Store = typeof store;
