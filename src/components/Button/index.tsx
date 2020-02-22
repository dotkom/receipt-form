import styled from 'styled-components';

import { colors } from 'constants/colors';

export const Button = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: 4px;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;

  :focus {
    outline: none;
    box-shadow: inset 0px 0px 0px 2px ${colors.accent};
  }

  :disabled {
    background: ${colors.darkGray};
  }
`;
