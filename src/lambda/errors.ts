import { IValidation } from 'form/validation';

export interface ErrorData {
  message: string;
  validation?: IValidation[];
}

export class ApiError extends Error {
  statusCode = 400;
  displayMessage = '';

  getData(): ErrorData {
    return {
      message: this.displayMessage,
    };
  }
}

export class PdfRenderError extends ApiError {
  statusCode = 500;
  displayMessage = 'Noe gikk galt, og PDF-en ble ikke generert. Vennligst prøv om igjen, eller ta kontakt med Dotkom.';
}

export class EncryptedAttachmentError extends ApiError {
  statusCode = 400;
  displayMessage =
    'Et av vedleggene er en kryptert PDF og må dekrypteres før opplastning. Print den til PDF på nytt eller endre til et annet format.';
}

export class ApiBodyError extends ApiError {
  statusCode = 400;
  displayMessage = 'Det ble ikke sendt data med forespørselen, vennligst last inn siden på nytt og prøv igjen.';
}

export class ApiGenericError extends ApiError {
  statusCode = 400;
  displayMessage =
    'Noe ser ut til å ha gått galt under prosesseringen, vennligst last inn siden på nytt og prøv igjen.';
}

export class ConfigError extends ApiGenericError {}

export class ApiEmailError extends ApiError {
  statusCode = 500;
  displayMessage = 'Noe gikk galt under sendingen av E-post, vennligst prøv igjen eller ta kontakt med Dotkom.';
}

export class ApiValidationError extends ApiError {
  statusCode = 400;
  displayMessage = 'Skjemaet passerer ikke validering, vennligst last inn siden på nytt og prøv igjen.';
  validation: IValidation[];

  constructor(validation: IValidation[]) {
    super();
    this.validation = validation;
  }

  getData(): ErrorData {
    return {
      ...this.getData(),
      validation: this.validation,
    };
  }
}
