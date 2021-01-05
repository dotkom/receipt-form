import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors, Logo } from '@dotkomonline/design-system';

import { NonNullableState } from 'lambda/generatePDF';
import { getCurrentDateString } from '../tools/date';
import { getGroupName } from 'models/groups';
import { formatAmount } from 'lambda/tools/format';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const Html = styled.html`
  width: 210mm;
  height: 297mm;
  background-color: white;
`;

const Body = styled.body`
  height: 100%;
  padding: 20mm;
  background-color: white;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 2fr 6fr 1fr 3fr;
  grid-template-rows: 16mm 16mm 16mm 16mm 16mm 110mm 140px;
  grid-template-areas:
    'name name name name'
    'email email email email'
    'committee committee date date'
    'account account amount amount'
    'intent intent type type'
    'comments comments comments comments'
    'signature signature signature signature';

  background-color: black;
  border: 1px solid black;
  gap: 1px;
`;

const GroupContainer = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
  padding: 10px 8px;
  background-color: ${colors.white};
`;

const Label = styled.label``;

const Content = styled.p`
  padding: 0;
  margin: 0;
  font-size: 20px;
`;

const Comment = styled.p`
  padding: 0;
  margin: 0;
  font-size: 16px;
`;

const InfoGroup: FC<{ label: string; value: string; area: string }> = ({ label, value, area }) => {
  return (
    <GroupContainer area={area}>
      <Label>{label}</Label>
      <Content>{value}</Content>
    </GroupContainer>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

const SignatureImage = styled.img`
  width: 100%;
  height: 120px;
`;

interface Props {
  form: NonNullableState;
  signature: string;
}

export const PdfTemplate: FC<Props> = ({ form, signature }) => {
  return (
    <Html>
      <GlobalStyle />
      <Body>
        <Header>
          <h1>Kvitteringsskjema</h1>
          <Logo width="200px" />
        </Header>
        <Main>
          <InfoGroup area="name" label="Navn" value={form.fullname} />
          <InfoGroup area="email" label="E-post" value={form.email} />
          <InfoGroup area="committee" label="Ansvarlig enhet" value={getGroupName(form.committee)} />
          <InfoGroup area="date" label="Dato" value={getCurrentDateString()} />
          <InfoGroup
            area="account"
            label={form.type === 'card' ? 'Kortnummer' : 'Kontonummer'}
            value={form.type === 'card' ? form.cardDetails : form.account}
          />
          <InfoGroup area="amount" label="Beløp" value={`${formatAmount(form.amount)} kr`} />
          <InfoGroup area="intent" label="Anledning" value={form.intent} />
          <InfoGroup area="type" label="Type" value={form.type === 'card' ? 'Bankkort' : 'Utlegg'} />
          <GroupContainer area="comments">
            <Label>Kommentarer</Label>
            {(form.comments || '') &&
              form.comments.split('\n').map((comment) => <Comment key={comment}>{comment}</Comment>)}
          </GroupContainer>
          <GroupContainer area="signature">
            <SignatureImage src={signature} />
          </GroupContainer>
        </Main>
      </Body>
    </Html>
  );
};
