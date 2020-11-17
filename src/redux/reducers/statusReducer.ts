import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorData } from 'lambda/errors';
import { SuccessBody } from 'lambda/handler';

export interface ApiResponse {
  statusCode: number;
  body: ErrorData | SuccessBody;
}

export interface IStatusState {
  isDownloading: boolean;
  isSendingMail: boolean;
  response: ApiResponse | null;
}

const INITIAL_STATUS_STATE: IStatusState = {
  isDownloading: false,
  isSendingMail: false,
  response: null,
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
    setResponse(state, action: PayloadAction<ApiResponse | null>) {
      state.response = action.payload;
    },
    resetStatus() {
      return INITIAL_STATUS_STATE;
    },
  },
});

export const { downloadFinished, downloadStarted, loadingDone, resetStatus, setResponse } = statusSlice.actions;

export const statusReducer = statusSlice.reducer;
