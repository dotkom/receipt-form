import { IValidation } from 'form/validation';

export interface ErrorData {
  message: string;
  validation?: IValidation[];
}

export class ApiError extends Error {
  statusCode = 400;
  displayMessage = '';

  getDisplayMessage(): string | undefined {
    return undefined;
  }

  getData(): ErrorData {
    return {
      message: this.getDisplayMessage() ?? this.displayMessage,
    };
  }
}

export class PdfRenderError extends ApiError {
  statusCode = 500;
  displayMessage = 'Noe gikk galt, og PDF-en ble ikke generert. Vennligst prøv om igjen, eller ta kontakt med Dotkom.';
}

export class EncryptedAttachmentError extends ApiError {
  statusCode = 400;
  displayMessage2 = '';
  fileName?: string;

  constructor(message?: string, fileName?: string) {
    super(message);
    this.fileName = fileName;
  }

  getDisplayMessage(): string {
    const aboutPdf = this.fileName
      ? `Vedlegget '${this.fileName}' en kryptert PDF og må dekrypteres før opplastning.`
      : `Et av vedleggene er en kryptert PDF og må dekrypteres før opplastning.`;
    const howToMitigate =
      'Du kan prøve å skrive dokumentet til PDF på nytt uten kryptering, låse det opp med et passord, eller konvertere dokumentet til et bilde før du laster det opp.';
    return `${aboutPdf} ${howToMitigate}`;
  }
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
