import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_STATE, IState } from 'form/state';

export const formSlice = createSlice({
  name: 'form',
  initialState: INITIAL_STATE,
  reducers: {
    formDataUpdated(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetForm() {
      return INITIAL_STATE;
    },
  },
});

export const { resetForm, formDataUpdated } = formSlice.actions;

export const formReducer = formSlice.reducer;
