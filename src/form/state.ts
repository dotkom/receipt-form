import { ICommittee } from 'models/comittees';
import { getEntries } from 'utils/object';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';

export type ReceiptType = 'card' | 'deposit';

export interface IState {
  fullname: string | null;
  email: string | null;
  signature: File | null;
  type: ReceiptType;
  amount: number | null;
  intent: string | null;
  account: string | null;
  cardDetails: string | null;
  committee: ICommittee | null;
  comments: string | null;
  attachments: File[];
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
};

export interface IDeserializedState {
  fullname: string;
  email: string;
  amount: number;
  intent: string;
  committee: ICommittee;
  comments: string;

  /** 'type' describes which of either 'acount' and 'cardDetails' that is defined */
  type: ReceiptType;
  account: string | null;
  cardDetails: string | null;

  /** Files converted to a Base64 URI string for it to be sendable as JSON */
  signature: string;
  attachments: string[];
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

const formAppend = (data: FormData, key: string, value: IState[keyof IState]) => {
  if (typeof value === 'string') {
    data.append(key, value);
  } else if (typeof value === 'number') {
    data.append(key, String(value));
  } else if (value instanceof File) {
    data.append(key, value, value.name);
  } else if (value === null) {
    data.append(key, String(value));
  } else if (value instanceof Array) {
    value.forEach((innerValue) => formAppend(data, key, innerValue));
  } else if (value instanceof Object) {
    data.append(key, JSON.stringify(value));
  }
};

export const createFormData = (state: IState): FormData => {
  const data = new FormData();
  getEntries(state).forEach(([key, value]) => formAppend(data, key, value));
  return data;
};
