import React, { FC, useState, useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { IInputProps, InputContainer, Label, StyledInput } from './Base';
import { Cross } from '../Icons/Cross';
import { FileImage } from './Image';

const LabelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CrossContainer = styled.span`
  height: 2rem;
  width: 2rem;

  :hover {
    cursor: pointer;
  }
`;

export const FileInput: FC<IInputProps> = ({ label, ...props }) => {
  const [image, setImage] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileReader = new FileReader();

  const handleFileRead = (event: ProgressEvent): any => {
    const content = fileReader.result;
    if (content instanceof ArrayBuffer) {
      console.log(content);
    } else {
      setImage(content)
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      fileReader.onloadend = handleFileRead;
      fileReader.readAsDataURL(files[0]);
    } else {
      setImage(null);
    }
  }

  const removeFiles = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <InputContainer>
      <LabelsContainer>
        <Label>{label}</Label>
        { image ? <CrossContainer>
          <Cross onClick={removeFiles} />
        </CrossContainer> : null }
      </LabelsContainer>
      { image
        ? <FileImage dataUrl={image} />
        : <StyledInput
          type="file"
          value={props.value}
          onChange={handleFileChange}
          placeholder={props.placeholder}
          ref={fileInputRef}
        />
      }
    </InputContainer>
  );
};
