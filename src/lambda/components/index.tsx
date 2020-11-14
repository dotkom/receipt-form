import React, { FC } from 'react';
import styled from 'styled-components';
import { colors, Logo } from '@dotkomonline/design-system';

import { NonNullableState } from 'lambda/generatePDF';
import { getCurrentDateString } from '../tools/date';
import { getGroupName } from 'models/groups';
import { formatAmount } from 'lambda/tools/format';

const Html = styled.html`
  width: 100%;
  height: 100%;
`;

const Body = styled.body`
  height: 100%;
  margin: 60px;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 2fr 6fr 1fr 3fr;
  grid-template-rows: 40px 40px 80px 80px 80px fit-content 120px;
  grid-template-areas:
    'name name name name'
    'email email email email'
    'committee committee date date'
    'account account amount amount'
    'intent intent type type'
    'comments comments comments comments'
    'signature signature signature signature';

  box-sizing: border-box;
  background-color: black;
  border: 1px solid black;
  gap: 1px;
`;

const GroupContainer = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
  padding: 10px 8px;
  background-color: ${colors.white};
`;

const Content = styled.p`
  padding: 0;
  margin: 0;
`;

const InfoGroup: FC<{ label: string; value: string | string[]; area: string }> = ({ label, value, area }) => {
  return (
    <GroupContainer area={area}>
      <label>{label}</label>
      {!Array.isArray(value) ? <Content>{value}</Content> : value.map((v) => <Content key={v}>{v}</Content>)}
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
          <InfoGroup area="comments" label="Kommentarer" value={form.comments.split('\n')} />
          <GroupContainer area="signature">
            <SignatureImage src={signature} />
          </GroupContainer>
        </Main>
      </Body>
    </Html>
  );
};
