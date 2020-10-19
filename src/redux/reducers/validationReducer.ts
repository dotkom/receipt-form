import { INITIAL_STATE } from 'form/state';
import { StateValidation, validate } from 'form/validation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_VALIDATION = validate(INITIAL_STATE);

export const validationSlice = createSlice({
  name: 'validation',
  initialState: INITIAL_VALIDATION,
  reducers: {
    setValidation(_, action: PayloadAction<StateValidation>) {
      const validation = action.payload;
      return validation;
    },
  },
});

export const { setValidation } = validationSlice.actions;

export const validationReducer = validationSlice.reducer;
