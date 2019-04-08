import { IState } from 'form/state';

export const getTotalFileSize = (state: IState) => {
  const signatureSize = state.signature ? state.signature.size : 0;
  const attachmentsSize = state.attachments.map((file) => file.size).reduce((size, total) => total + size, 0);
  const totalSize = signatureSize + attachmentsSize;
  return totalSize;
};
