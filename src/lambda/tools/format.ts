import { NonNullableState } from 'lambda/generatePDF';
import { getCurrentDateString } from './date';

/** Format decimal amounts to 2 decimals, integers to 0 decimals. */
export const formatAmount = (amount: number) => (Number.isInteger(amount) ? amount.toFixed(0) : amount.toFixed(2));

/** Formatted text for the kvitteringsbot email */
export const getFormattedText = (form: NonNullableState) => `
Type: [${form.type === 'card' ? 'Bankkort' : 'Utlegg'}]

${form.fullname} har sendt inn skjema på ${formatAmount(form.amount)} kr for:
${form.intent}

Ekstra informasjon:
${form.comments}

`;

/** File name for the generated PDF */
export const getFileName = (form: NonNullableState) =>
  `[${getCurrentDateString()}]-${form.intent}-${formatAmount(form.amount)}-kvitteringsskjema.pdf`;
