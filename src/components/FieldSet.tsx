import styled from 'styled-components';

export const FieldSet = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const SeparatedFieldSet = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0;
`;
