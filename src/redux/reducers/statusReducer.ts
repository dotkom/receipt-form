import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IResultMessage } from 'lambda/handler';

export interface IStatusState {
  isDownloading: boolean;
  isSendingMail: boolean;
  responseMessage: IResultMessage | null;
}

const INITIAL_STATUS_STATE: IStatusState = {
  isDownloading: false,
  isSendingMail: false,
  responseMessage: null,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState: INITIAL_STATUS_STATE,
  reducers: {
    loadingDone(state) {
      state.isDownloading = false;
      state.isSendingMail = false;
    },
    downloadStarted(state) {
      state.isDownloading = true;
    },
    downloadFinished(state) {
      state.isDownloading = false;
    },
    setResponse(state, action: PayloadAction<IResultMessage | null>) {
      state.responseMessage = action.payload;
    },
    resetStatus() {
      return INITIAL_STATUS_STATE;
    },
  },
});

export const { downloadFinished, downloadStarted, loadingDone, resetStatus, setResponse } = statusSlice.actions;

export const statusReducer = statusSlice.reducer;
