import React, { createContext, FC, useState } from 'react';

import { FieldInteractions, INITIAL_INTERACTION } from 'form/interaction';

const MOCK_FUNCTION = () => {
  throw new Error('Mock Function called from Interaction Context');
};

export const INITIAL_STATE = {
  interaction: {} as FieldInteractions,
  updateInteraction: MOCK_FUNCTION as (updated: Partial<FieldInteractions>) => void,
  setInteracted: MOCK_FUNCTION as (field: keyof FieldInteractions) => void,
};

export const InteractionContext = createContext(INITIAL_STATE);

export const Interaction: FC = ({ children }) => {
  const [interaction, setInteraction] = useState(INITIAL_INTERACTION);

  const updateInteraction = (updated: Partial<FieldInteractions>) => {
    setInteraction((current) => ({ ...current, ...updated }));
  };

  const setInteracted = (field: keyof FieldInteractions) => {
    setInteraction((current) => ({ ...current, [field]: true }));
  };

  return (
    <InteractionContext.Provider value={{ interaction, updateInteraction, setInteracted }}>
      {children}
    </InteractionContext.Provider>
  );
};
