import { useContext, useMemo } from 'react';

import { InteractionContext } from 'contexts/Interaction';
import { FieldInteractions } from 'form/interaction';

export const useInteraction = (field: keyof FieldInteractions) => {
  const { setInteracted: set, interaction, ...rest } = useContext(InteractionContext);
  const setInteracted = () => set(field);
  const interacted = interaction[field];
  return useMemo(() => ({ ...rest, interacted, setInteracted }), [field, interaction]);
};
