import React from 'react';
import Document, { Head, Html, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ComponentProps } from 'react';

const getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
    };

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

type DocumentProps = ComponentProps<typeof Document>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomDocument = (_: DocumentProps): JSX.Element => {
  return (
    <Html lang="nb">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/receipt-logo-256.png" />
        <meta name="theme-color" content="#0D5474" />
        <meta name="description" content="Kvitteringsskjema fra Linjeforeningen Online" />
        <meta name="keywords" content="Online, Kvittering, Kvitteringsskjema, Bankom, NTNU, Linjeforening" />
        <meta name="author" content="Dotkom, Linjeforeningen Online" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://kvittering.online.ntnu.no" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700|Source+Serif+Pro|Source+Code+Pro|Material+Icons+Outlined"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

CustomDocument.getInitialProps = getInitialProps;
CustomDocument.renderDocument = Document.renderDocument;

export default CustomDocument;
