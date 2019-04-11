import { INITIAL_STATE, IState } from './state';

/** Track if a field has been interacted with by the user */
export type FieldInteractions = { [K in keyof IState]: boolean };

export const INITIAL_INTERACTION = Object.keys(INITIAL_STATE).reduce(
  (acc, key) => ({ ...acc, [key]: false }),
  {} as FieldInteractions
);

export const calculateInteractions = (state: IState): FieldInteractions => {
  const interaction = INITIAL_INTERACTION;
  for (const key of Object.keys(state) as Array<keyof IState>) {
    if (state[key] !== INITIAL_STATE[key]) {
      interaction[key] = true;
    }
  }
  return interaction;
};

export const interactAll = () => {
  return Object.keys(INITIAL_INTERACTION).reduce((acc, key) => ({ ...acc, [key]: true }), INITIAL_INTERACTION);
};
