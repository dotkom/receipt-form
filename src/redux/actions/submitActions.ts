import { batch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { NonNullableState } from 'lambda/generatePDF';
import { getFileName } from 'lambda/tools/format';
import { postReceipt } from 'utils/postReceipt';
import { downloadFinished, downloadStarted, loadingDone, setResponse } from 'redux/reducers/statusReducer';
import { State } from 'redux/store';
import { SuccessBody } from 'lambda/handler';

const handleDownload = async (response: SuccessBody, state: NonNullableState) => {
  if (response.data) {
    /** Use the same filename that would be generated when sending a mail */
    const fileName = getFileName(state);
    // response.data is a URL to the file

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = response.data;
    a.download = fileName;
    a.click();
  }
};

export const downloadFormAction = createAsyncThunk('user/catchCallback', async (_, { dispatch, getState }) => {
  dispatch(downloadStarted());
  const { form } = getState() as State;
  const res = await postReceipt({ ...form, mode: 'download' });
  batch(() => {
    dispatch(downloadFinished());
    dispatch(setResponse(res || null));
  });
  /** Response status 201, signifies 'Created' */
  if (res && res.statusCode === 201) {
    /** Intent cannot be null since a valid form is required to get here. Let us just hope that is true :) */
    handleDownload(res.body, form as NonNullableState);
  }
});

export const emailFormAction = createAsyncThunk('user/catchCallback', async (_, { dispatch, getState }) => {
  dispatch(downloadStarted());
  const { form } = getState() as State;
  const res = await postReceipt({ ...form, mode: 'email' });
  batch(() => {
    dispatch(loadingDone());
    dispatch(setResponse(res || null));
  });
});
