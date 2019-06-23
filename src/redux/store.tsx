import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { formValidatorMiddleware } from './middleware/validationMiddleware';
import { rootReducer } from './reducers';
import { Action, State } from './types';

const reduxDevToolsHook = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (x: any) => x; // tslint:disable-line no-any

const thunkMiddleware = thunk as ThunkMiddleware<State, Action>;

export const initStore = (initialState?: State) =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, formValidatorMiddleware),
      reduxDevToolsHook
    )
  );

export const store = initStore();
// @ts-ignore
window.store = store;

export const StoreProvider: FC = (props) => {
  return <Provider {...props} store={store} />;
};
