import { Reducer } from 'redux';

import { FieldInteractions, INITIAL_INTERACTION, interactAll } from 'form/interaction';

export enum ActionType {
  SET_INTERACTED = 'SET_INTERACTED',
  SET_ALL_INTERACTED = 'SET_ALL_INTERACTED',
}

export interface IAction<K extends ActionType, T = undefined> {
  type: K;
  data: T;
}

export type Actions =
  | IAction<ActionType.SET_INTERACTED, Partial<FieldInteractions>>
  | IAction<ActionType.SET_ALL_INTERACTED>;

export const interactionReducer: Reducer<FieldInteractions, Actions> = (state = INITIAL_INTERACTION, action) => {
  switch (action.type) {
    case ActionType.SET_INTERACTED:
      return {
        ...state,
        ...action.data,
      };
    case ActionType.SET_ALL_INTERACTED:
      return {
        ...interactAll(),
      };
    default:
      return state;
  }
};
