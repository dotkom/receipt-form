import { Reducer } from 'redux';

import { IResultMessage } from 'lambda/handler';

export interface IStatusState {
  isDownloading: boolean;
  isSendingMail: boolean;
  responseMessage: IResultMessage | null;
}

const INITIAL_STATUS_STATE: IStatusState = {
  isDownloading: false,
  isSendingMail: false,
  responseMessage: null,
};

export enum ActionType {
  SET_LOADING_DONE = 'SET_LOADING_DONE',
  SET_IS_DOWNLOADING = 'SET_IS_DOWNLOADING',
  SET_IS_SENDING_MAIL = 'SET_IS_SENDING_MAIL',
  SET_RESPONSE_MESSAGE = 'SET_RESPONSE_MESSAGE',
  RESET = 'RESET_RESPONSE',
}

export interface IAction<K extends ActionType, T = undefined> {
  type: K;
  data: T;
}

export type Actions =
  | IAction<ActionType.SET_LOADING_DONE>
  | IAction<ActionType.SET_IS_DOWNLOADING, boolean>
  | IAction<ActionType.SET_IS_SENDING_MAIL, boolean>
  | IAction<ActionType.SET_RESPONSE_MESSAGE, IResultMessage | null>
  | IAction<ActionType.RESET>;

export const statusReducer: Reducer<IStatusState, Actions> = (state = INITIAL_STATUS_STATE, action) => {
  switch (action.type) {
    case ActionType.SET_LOADING_DONE:
      return {
        ...state,
        isDownloading: false,
        isSendingMail: false,
      };
    case ActionType.SET_IS_DOWNLOADING:
      return {
        ...state,
        isDownloading: action.data,
      };
    case ActionType.SET_IS_SENDING_MAIL:
      return {
        ...state,
        isSendingMail: action.data,
      };
    case ActionType.SET_RESPONSE_MESSAGE:
      return {
        ...state,
        responseMessage: action.data,
      };
    case ActionType.RESET:
      return INITIAL_STATUS_STATE;
    default:
      return state;
  }
};
