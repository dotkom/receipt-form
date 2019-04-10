import { INITIAL_STATE, IState } from './state';

/** Track if a field has been interacted with by the user */
export type FieldInteractions = { [K in keyof IState]: boolean };

export const INITIAL_INTERACTION = Object.keys(INITIAL_STATE).reduce(
  (acc, key) => ({ ...acc, [key]: false }),
  {} as FieldInteractions
);
