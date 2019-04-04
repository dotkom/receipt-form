import React from 'react';
import styled from 'styled-components';

import { colors } from 'constants/colors';

const FooterStyle = styled.footer`
  background: ${colors.backgroundGray};
  padding: 4rem 2.5rem;
  text-align: center;
`;

const Link = styled.a`
  color: ${colors.blue};
  text-decoration-line: none;
`;

const MessageParagraph = styled.p`
  text-align: center;
`;

const MESSAGE = `Fra Dotkom med kjærlighet <3`;
const REPO_LINK = `https://github.com/dotkom/receipt-form`;
const CONTACT_MAIL = `dotkom@online.ntnu.no`;

export const Footer = () => {
  return (
    <FooterStyle>
      <MessageParagraph>{MESSAGE}</MessageParagraph>
      <br />
      <MessageParagraph>
        Ved problemer, <Link href={`mailto:${CONTACT_MAIL}`}>ta kontakt med Dotkom!</Link>
      </MessageParagraph>
      <MessageParagraph>
        Kildekoden for prosjektet ligger åpent på <Link href={REPO_LINK}>Github</Link>.
      </MessageParagraph>
    </FooterStyle>
  );
};
