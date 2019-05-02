import { Dispatch, Reducer, useEffect, useReducer, useState } from 'react';

import { INITIAL_STATE, IState } from 'form/state';
import { StateValidation, validate } from 'form/validation';

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
    case ActionType.RESET:
      return INITIAL_STATE;
  }
  return state;
};

export type ReceiptData = [IState, Dispatch<Actions>, StateValidation];

const VALIDATION_TIMEOUT = 250;

export const useReceiptData = (): ReceiptData => {
  const [state, dispatch] = useReducer(receiptReducer, INITIAL_STATE);

  /** Set the initial validation, will not recalculate on rerender, will only happen in effect */
  const initialValidation = validate(state);
  const [validation, setValidation] = useState<StateValidation>(initialValidation);
  const [trigger, setTrigger] = useState<number | null>(null);

  const storeValidation = () => {
    setValidation(validate(state));
    setTrigger(null);
  };

  const activateTrigger = (timeout = VALIDATION_TIMEOUT) => {
    const newTrigger = window.setTimeout(storeValidation, timeout);
    setTrigger(newTrigger);
  };

  const replaceTrigger = () => {
    if (trigger) {
      window.clearTimeout(trigger);
    }
    activateTrigger(100);
  };

  useEffect(() => {
    if (!trigger) {
      activateTrigger();
    } else {
      replaceTrigger();
    }
  }, [state]);

  return [state, dispatch, validation];
};
