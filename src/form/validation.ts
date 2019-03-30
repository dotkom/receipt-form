import { COMMITTEES } from 'models/comittees';

import { IState } from './state';

export enum ValidationLevel {
  NONE,
  WARNING,
  REQUIRED,
}

export interface IValidator {
  level: ValidationLevel;
  message: string;
  validator: (state: IState) => boolean;
}

export interface IValidation {
  level: ValidationLevel;
  message: string;
  valid: boolean;
}

export type StateValidation = { [K in keyof IState]: IValidation[] };

export type StateValidators = { [K in keyof IState]: IValidator[] };

const ACCOUNT_NUMBER_REGEX = new RegExp(/^\d{11}$/);
const COMMITTEE_EMAIL_REGEX = new RegExp(/^.{2,50}@online\.ntnu\.no$/);
const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const CARD_DETAIL_REGEX = new RegExp(/^.{5,30}$/);
const FILE_SIZE_WARN = 10 * 1024 * 1024; // 10 MB
const FILE_SIZE_MAX = 18.9 * 1024 * 1024; // 18.9 MB

export const STATE_VALIDATION: StateValidators = {
  fullname: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'Du må inkludere både fornavn og etternavn',
      validator: ({ fullname }) => fullname !== null && fullname.split('').includes(' '),
    },
  ],
  account: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'Kontonummeret må være på 11 siffer',
      validator: ({ account, type }) => type === 'deposit' && account !== null && ACCOUNT_NUMBER_REGEX.test(account),
    },
  ],
  email: [
    {
      level: ValidationLevel.WARNING,
      message: 'Du burde bruke en @online.ntnu.no e-post hvis du har, men det er ikke nødvendig',
      validator: ({ email }) => email !== null && COMMITTEE_EMAIL_REGEX.test(email),
    },
    {
      level: ValidationLevel.REQUIRED,
      message: 'Feltet må inneholde en gyldig e-postadresse',
      validator: ({ email }) => email !== null && EMAIL_REGEX.test(email),
    },
  ],
  amount: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'En kvittering må føres på en positiv pengeverdi',
      validator: ({ amount }) => amount !== null && amount > 0,
    },
  ],
  intent: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'Du må legge ved et grunnlag for kjøpet på minst 3 tegn',
      validator: ({ intent }) => intent !== null && intent.length >= 3,
    },
  ],
  type: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'Det har skjedd en feil i valg av type, vennligst last inn siden på nytt',
      validator: ({ type }) => type === 'card' || type === 'deposit',
    },
  ],
  cardDetails: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'Informasjonen burde være på mellom 5 og 30 tegn',
      validator: ({ cardDetails, type }) =>
        type === 'card' && cardDetails !== null && CARD_DETAIL_REGEX.test(cardDetails),
    },
  ],
  committee: [
    {
      level: ValidationLevel.WARNING,
      message: 'Du har skrevet inn en egen valgmulghet, bare gjør dette hvis ingen av valgene i listen passer',
      validator: ({ committee }) => committee !== null && !!COMMITTEES.find((c) => c.group === committee.group),
    },
  ],
  comments: [
    {
      level: ValidationLevel.WARNING,
      message: 'Det anbefales at du legger ved kommentarer, men det er ikke pålagt',
      validator: ({ comments }) => comments !== null && comments.length > 0,
    },
  ],
  signature: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'Du må legge ved en signatur for kvitteringen din',
      validator: ({ signature }) => signature !== null,
    },
    {
      level: ValidationLevel.WARNING,
      message: 'Det er ikke anbefalt å legge ved filer på over 10 MB',
      validator: ({ signature }) => (signature !== null ? signature.size <= FILE_SIZE_WARN : true),
    },
    {
      level: ValidationLevel.REQUIRED,
      message: 'Det er ikke mulig å legge ved enkeltfiler på over 18.9 MB',
      validator: ({ signature }) => (signature !== null ? signature.size <= FILE_SIZE_MAX : true),
    },
  ],
  attachments: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'Du må laste opp kvitteringen din som et vedlegg',
      validator: ({ attachments }) => attachments.length > 0,
    },
    {
      level: ValidationLevel.WARNING,
      message: 'Det er ikke anbefalt å legge ved filer på over 10 MB',
      validator: ({ attachments }) => attachments.reduce<number>((total, a) => total + a.size, 0) <= FILE_SIZE_WARN,
    },
    {
      level: ValidationLevel.REQUIRED,
      message: 'Det er ikke mulig å legge ved filer på over 18.9 MB',
      validator: ({ attachments }) => attachments.reduce<number>((total, a) => total + a.size, 0) <= FILE_SIZE_MAX,
    },
  ],
};
