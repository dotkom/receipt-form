import { Dispatch, Reducer, useEffect, useReducer, useState } from 'react';

import { deserializeReceipt, INITIAL_STATE, IState } from 'form/state';
import { EXCLUDE_FIELDS, IValidation, IValidator, STATE_VALIDATION, StateValidation } from 'form/validation';
import { postReceipt } from 'utils/postReceipt';

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
      deserializeReceipt(state).then((data) => {
        // tslint:disable-next-line no-console
        console.log('Download action called', JSON.stringify(data));
        postReceipt(data);
      });
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

export const validate = (state: IState): StateValidation => {
  const keys = Object.entries(STATE_VALIDATION) as Array<[keyof IState, IValidator[]]>;
  const excludes = EXCLUDE_FIELDS.map((excludeFunction) => excludeFunction(state));
  const validation = keys.map<[keyof IState, IValidation[]]>(([key, validators]) => {
    /** Return empty validators if key is excluded from the validation */
    if (excludes.includes(key)) {
      return [key, []];
    }
    return [
      key,
      validators.map<IValidation>(({ validator, level, message }) => ({ valid: validator(state), level, message })),
    ];
  });
  return validation.reduce<StateValidation>((acc, [key, value]) => ({ ...acc, [key]: value }), {} as StateValidation);
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
