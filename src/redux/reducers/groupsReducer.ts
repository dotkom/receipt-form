import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from 'models/groups';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: [] as Group[],
  reducers: {
    loadGroups(_, action: PayloadAction<Group[]>) {
      return action.payload;
    },
  },
});

export const { loadGroups } = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
