import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 100%;

  background: #fff;
  border-radius: 5px;
  border: 2px solid #e5e5e5;

  padding: 0.6rem;
  box-sizing: border-box;

  display: grid;
  justify-content: center;
`;

const Image = styled.img`
  max-height: 5rem;
`;

export const FileImage = ({ dataUrl }: { dataUrl: string }) => {
  return (
    <ImageContainer>
      <Image src={dataUrl} />
    </ImageContainer>
  );
};
