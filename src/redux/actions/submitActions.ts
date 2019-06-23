import { batch } from 'react-redux';

import { NonNullableState } from 'lambda/generatePDF';
import { IResultMessage } from 'lambda/handler';
import { getFileName } from 'lambda/tools/format';
import { ActionType } from 'redux/reducers/statusReducer';
import { Thunk } from 'redux/types';
import { downloadFile } from 'utils/download';
import { postReceipt } from 'utils/postReceipt';
import { readDataUrlAsFile } from 'utils/readDataUrlAsFile';

const handleDownload = async (response: IResultMessage, state: NonNullableState) => {
  /** Just make sure it exists, because the server may not return our pre-defined format, e.g. NGINX */
  if (response && response.body && response.body.data) {
    /** Use the same filename that would be generated when sending a mail */
    const fileName = getFileName(state);
    const pdfFile = await readDataUrlAsFile(response.body.data, fileName);
    if (pdfFile) {
      downloadFile(pdfFile);
    }
  }
};

export const downloadFormAction: Thunk = () => async (dispatch, getState) => {
  dispatch({ type: ActionType.SET_IS_DOWNLOADING, data: true });
  const { form } = getState();
  const res = await postReceipt({ ...form, mode: 'download' });
  batch(() => {
    dispatch({ type: ActionType.SET_LOADING_DONE });
    dispatch({ type: ActionType.SET_RESPONSE_MESSAGE, data: res || null });
  });
  /** Response status 201, signifies 'Created' */
  if (res && res.statusCode === 201) {
    /** Intent cannot be null since a valid form is required to get here. Let us just hope that is true :) */
    handleDownload(res, form as NonNullableState);
  }
};

export const emailFormAction: Thunk = () => async (dispatch, getState) => {
  dispatch({ type: ActionType.SET_IS_DOWNLOADING, data: true });
  const { form } = getState();
  const res = await postReceipt({ ...form, mode: 'email' });
  batch(() => {
    dispatch({ type: ActionType.SET_LOADING_DONE });
    dispatch({ type: ActionType.SET_RESPONSE_MESSAGE, data: res || null });
  });
};
