import { Reducer } from 'redux';

import { INITIAL_STATE, IState } from 'form/state';

export enum ActionType {
  CHANGE = 'CHANGE_FORM',
  RESET = 'RESET_FORM',
  SEND = 'SEND_FORM',
  DOWNLOAD = 'DOWNLOAD_FORM',
}

export interface IAction<K extends ActionType, T = undefined> {
  type: K;
  data: T;
}

export type Actions =
  | IAction<ActionType.CHANGE, Partial<IState>>
  | IAction<ActionType.DOWNLOAD>
  | IAction<ActionType.RESET>
  | IAction<ActionType.SEND>;

export const formReducer: Reducer<IState, Actions> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.CHANGE:
      return {
        ...state,
        ...action.data,
      };
    case ActionType.RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
