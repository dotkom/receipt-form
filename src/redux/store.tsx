import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { formValidatorMiddleware } from './middleware/validationMiddleware';
import { rootReducer } from './reducers';
import { Action, State } from './types';

export const initStore = (initialState?: State) =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk as ThunkMiddleware<State, Action>, formValidatorMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

export const store = initStore();
// @ts-ignore
window.store = store;

export const StoreProvider: FC = (props) => {
  return <Provider {...props} store={store} />;
};
