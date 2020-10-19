import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FieldInteractions, INITIAL_INTERACTION, interactAll } from 'form/interaction';

export const interactionSlice = createSlice({
  name: 'interaction',
  initialState: INITIAL_INTERACTION,
  reducers: {
    setInteraction(state, action: PayloadAction<Partial<FieldInteractions>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setAllInteracted() {
      return {
        ...interactAll(),
      };
    },
  },
});

export const { setAllInteracted, setInteraction } = interactionSlice.actions;

export const interactionReducer = interactionSlice.reducer;
