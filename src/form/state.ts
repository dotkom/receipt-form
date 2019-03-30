import { ICommittee } from 'models/comittees';

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
