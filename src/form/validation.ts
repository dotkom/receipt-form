import { formatBytes } from 'utils/bytes';

import { IState } from './state';

export enum ValidationLevel {
  NONE,
  WARNING,
  REQUIRED,
  VALID,
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

export const ACCOUNT_NUMBER_REGEX = new RegExp(/^\d{4} \d{2} \d{5}$/);
export const COMMITTEE_EMAIL_REGEX = new RegExp(/^.{2,50}@online\.ntnu\.no$/);
export const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export const CARD_DETAIL_REGEX = new RegExp(/^.{5,30}$/);
export const FILE_SIZE_WARN = 20 * 1024 * 1024; // 20 MB
export const FILE_SIZE_MAX = 25 * 1024 * 1024; // 25 MB

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
      level: ValidationLevel.REQUIRED,
      message: 'Du må velge en komité eller gruppe',
      validator: ({ committee }) => committee !== null,
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
      message: 'Du må legge ved en signatur for kvitteringen din. Husk å lagre signaturen ved å trykke på ✔️!',
      validator: ({ signature }) => signature !== null,
    },
    {
      level: ValidationLevel.WARNING,
      message: `Det er ikke anbefalt å legge ved filer på over ${formatBytes(FILE_SIZE_WARN)}`,
      validator: ({ signature }) => (signature !== null ? signature.size <= FILE_SIZE_WARN : true),
    },
    {
      level: ValidationLevel.REQUIRED,
      message: `Det er ikke tillat å legge ved filer på over ${formatBytes(FILE_SIZE_MAX)}`,
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
      message: `Det er ikke anbefalt å legge ved filer på over ${formatBytes(FILE_SIZE_WARN)}`,
      validator: ({ attachments, signature }) =>
        attachments.reduce<number>((total, a) => total + a.size, 0) + (signature ? signature.size : 0) <=
        FILE_SIZE_WARN,
    },
    {
      level: ValidationLevel.REQUIRED,
      message: `Det er ikke tillat å legge ved filer på over ${formatBytes(FILE_SIZE_MAX)}`,
      validator: ({ attachments, signature }) =>
        attachments.reduce<number>((total, a) => total + a.size, 0) + (signature ? signature.size : 0) <= FILE_SIZE_MAX,
    },
  ],
  mode: [
    {
      level: ValidationLevel.REQUIRED,
      message: 'Du må velge et støttet innsendingsmodus',
      validator: ({ mode }) => mode === 'email' || mode === 'download',
    },
  ],
};

export type ExcludeFunction = (state: IState) => keyof IState;

/**
 * Functions for excluding certain fields based on the values of other fields.
 */
export const EXCLUDE_FIELDS: ExcludeFunction[] = [({ type }) => (type === 'card' ? 'account' : 'cardDetails')];

export const validate = (state: IState): StateValidation => {
  const keys = Object.entries(STATE_VALIDATION) as Array<[keyof IState, IValidator[]]>;
  const excludes = EXCLUDE_FIELDS.map((excludeFunction) => excludeFunction(state));
  const validation = keys.map<[keyof IState, IValidation[]]>(([key, validators]) => {
    /** Return empty validators if key is excluded from the validation */
    if (excludes.includes(key)) {
      return [key, []];
    }
    return [
      key,
      validators.map<IValidation>(({ validator, level, message }) => ({ valid: validator(state), level, message })),
    ];
  });
  return validation.reduce<StateValidation>((acc, [key, value]) => ({ ...acc, [key]: value }), {} as StateValidation);
};

export const getIsValid = (state: IState): [boolean, IValidation[]] => {
  const validation = validate(state);
  const errors = Object.values(validation)
    .flat()
    .filter((val) => val.level === ValidationLevel.REQUIRED && !val.valid);
  const isValid = errors.length === 0;
  return [isValid, errors];
};
