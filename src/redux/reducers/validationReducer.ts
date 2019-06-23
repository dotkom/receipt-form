import { Reducer } from 'redux';

import { INITIAL_STATE } from 'form/state';
import { StateValidation, validate } from 'form/validation';

export enum ActionType {
  SET_VALIDATION = 'SET_VALIDATION',
}

export interface IAction<K extends ActionType, T = undefined> {
  type: K;
  data: T;
}

export type Actions = IAction<ActionType.SET_VALIDATION, StateValidation>;

const INITIAL_VALIDATION = validate(INITIAL_STATE);

export const validationReducer: Reducer<StateValidation, Actions> = (state = INITIAL_VALIDATION, action) => {
  switch (action.type) {
    case ActionType.SET_VALIDATION:
      return action.data;
    default:
      return state;
  }
};
