import { createContext, useContext } from 'react';
import { NonNullableState } from './generatePDF';

const PdfDataContext = createContext<NonNullableState>(null as any);

export const usePdfData = () => useContext(PdfDataContext);

export const PdfDataProvider = PdfDataContext.Provider;
