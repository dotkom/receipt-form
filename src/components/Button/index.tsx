import React, { FC, HTMLProps } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #0060a3;
  color: #fff;
  box-shadow: 0 1px 3px 0 #333;
  border-radius: 4px;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

export const Button: FC<HTMLProps<HTMLButtonElement>> = (props) => {
  return (
    <div>
      <StyledButton>
        { props.children }
      </StyledButton>
    </div>
  );
};
