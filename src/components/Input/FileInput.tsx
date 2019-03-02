import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { IInputProps, InputContainer, StyledInput } from './Base';
import { FileDisplay } from './FileDisplay';
import { FileInfo } from './FileInfo';
import { FileLabels } from './FileLabels';

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/jpg'];
const ALLOWED_TYPES = [...IMAGE_TYPES, 'application/pdf', '.pdf'];

export interface IFileInputProps extends IInputProps {
  file?: File;
  onUpload: (file: File) => void;
  onRemove?: () => void;
}

export const FileInput: FC<IFileInputProps> = ({ label, file, onRemove, onUpload, ...props }) => {
  const [image, setImage] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageReader = new FileReader();

  const handleImageRead = (_: ProgressEvent): any => {
    const content = imageReader.result;
    if (content instanceof ArrayBuffer) {
      throw new Error('ImageReader got an ArrayBuffer, should only get String');
    } else {
      setImage(content);
    }
  };

  const readImageFile = (newFile: Blob) => {
    imageReader.onloadend = handleImageRead;
    imageReader.readAsDataURL(newFile);
  };

  useEffect(() => {
    if (file && IMAGE_TYPES.includes(file.type)) {
      readImageFile(file);
    } else {
      setImage(null);
    }
  }, [file]);

  const clearInputValue = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearFile = () => {
    setImage(null);
    clearInputValue();
    if (onRemove) {
      onRemove();
    }
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0] && ALLOWED_TYPES.includes(files[0].type)) {
      onUpload(files[0]);
    }
    clearInputValue();
  };

  return (
    <InputContainer>
      <FileLabels label={label} onCrossClick={clearFile} displayCross={!!file} />
      {file ? (
        <FileDisplay file={file} image={image} />
      ) : (
        <StyledInput
          type="file"
          value={props.value}
          onChange={handleUpload}
          placeholder={props.placeholder}
          ref={fileInputRef}
          accept={ALLOWED_TYPES.join(',')}
        />
      )}
      <FileInfo file={file} />
    </InputContainer>
  );
};
