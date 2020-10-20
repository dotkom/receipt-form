import { Group } from 'models/groups';
import { readDataUrlAsFile2 } from 'utils/readDataUrlAsFile';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';

export type ReceiptType = 'card' | 'deposit';
export type SendMode = 'download' | 'email' | 'teapot';

export interface IState {
  fullname: string | null;
  email: string | null;
  signature: File | null;
  type: ReceiptType;
  amount: number | null;
  intent: string | null;
  account: string | null;
  cardDetails: string | null;
  committee: Group | null;
  comments: string | null;
  attachments: File[];
  mode: SendMode;
}

export const INITIAL_STATE: IState = {
  fullname: null,
  email: null,
  signature: null,
  type: 'deposit',
  amount: null,
  intent: null,
  account: null,
  cardDetails: null,
  committee: null,
  comments: null,
  attachments: [],
  mode: 'download',
};

export interface IDeserializedState {
  fullname: string;
  email: string;
  amount: number;
  intent: string;
  committee: Group;
  comments: string;

  /** 'type' describes which of either 'acount' and 'cardDetails' that is defined */
  type: ReceiptType;
  account: string | null;
  cardDetails: string | null;

  /** Files converted to a Base64 URI string for it to be sendable as JSON */
  signature: string;
  attachments: string[];
  mode: SendMode;
}

export const deserializeReceipt = async (state: IState): Promise<IDeserializedState> => {
  const attachments = await Promise.all(state.attachments.map(async (file) => readFileAsDataUrl(file)));
  const signature = await readFileAsDataUrl(state.signature || new File([], 'newfile'));
  return {
    ...state,
    attachments,
    signature,
  } as IDeserializedState;
};

export const serializeReceipt = async (deserializedState: IDeserializedState): Promise<IState> => {
  const attachments = await Promise.all(
    deserializedState.attachments.map(async (dataUrl) => readDataUrlAsFile2(dataUrl))
  );
  const signature = await readDataUrlAsFile2(deserializedState.signature);
  return {
    ...deserializedState,
    attachments: attachments.filter(Boolean) as File[],
    signature,
  };
};
