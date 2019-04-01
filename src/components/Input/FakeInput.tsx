import styled from 'styled-components';

import { colors } from 'constants/colors';

export const FakeInput = styled.div`
  width: 100%;

  background: ${colors.white};
  border-radius: 5px;
  border: 2px solid ${colors.gray};

  padding: 0.6rem;
  box-sizing: border-box;

  display: grid;
  justify-content: center;
`;
