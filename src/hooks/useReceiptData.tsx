import { Dispatch, Reducer, useReducer } from 'react';

export type ReceiptType = 'card' | 'deposit';

export interface IState {
  fullname: string | null;
  email: string | null;
  signature: string | null;
  type: ReceiptType;
  amount: number | null;
  intent: string | null;
  account: string | null;
  committee: string | null;
  comments: string | null;
  attachments: string | null;
}

const INITIAL_STATE: IState = {
  fullname: null,
  email: null,
  signature: null,
  type: 'card',
  amount: null,
  intent: null,
  account: null,
  committee: null,
  comments: null,
  attachments: null,
};

export enum ActionType {
  CHANGE,
  RESET,
  SEND,
  DOWNLOAD,
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

const receiptReducer: Reducer<IState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE:
      return {
        ...state,
        ...action.data,
      };
    case ActionType.DOWNLOAD:
      // tslint:disable-next-line no-console
      console.log('Download action called', state);
      return state;
    case ActionType.SEND:
      // tslint:disable-next-line no-console
      console.log('Send action called', state);
      return state;
    case ActionType.RESET:
      return INITIAL_STATE;
  }
  return state;
};

export const useReceiptData = (): [IState, Dispatch<Actions>] => {
  const [state, dispatch] = useReducer(receiptReducer, INITIAL_STATE);
  return [state, dispatch];
};
