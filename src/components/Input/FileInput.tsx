import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { ValidationLevel } from 'form/validation';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';

import { IInputProps, InputContainer, StyledInput } from './Base';
import { FileDisplay } from './FileDisplay';
import { FileInfo } from './FileInfo';
import { FileLabels } from './FileLabels';
import { ValidationMessages } from './ValidationMessages';

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/jpg'];
const ALLOWED_TYPES = [...IMAGE_TYPES, 'application/pdf', '.pdf'];

export interface IFileInputProps extends IInputProps {
  file?: File;
  onUpload: (file: File) => void;
  onRemove?: () => void;
}

export const FileInput: FC<IFileInputProps> = ({
  label,
  file,
  onRemove,
  onUpload,
  validation = [],
  validationLevel = ValidationLevel.NONE,
  ...props
}) => {
  const [image, setImage] = useState<null | string>(null);
  const [fileHover, setFileHover] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileHover = () => setFileHover(true);
  const onCancelFileHover = () => setFileHover(false);

  const readImageFile = async (dataFile: File) => {
    const newImage = await readFileAsDataUrl(dataFile);
    setImage(newImage);
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
    onCancelFileHover();
  };

  return (
    <InputContainer>
      <FileLabels label={label} onCrossClick={clearFile} displayCross={!!file} />
      <ValidationMessages display={interacted} validation={validation} />
      {file ? (
        <FileDisplay file={file} image={image} level={validationLevel} />
      ) : (
        <StyledInput
          type="file"
          onDragEnter={onFileHover}
          onDragLeave={onCancelFileHover}
          highlight={fileHover}
          value={props.value}
          onChange={handleUpload}
          placeholder={props.placeholder}
          ref={fileInputRef}
          accept={ALLOWED_TYPES.join(',')}
          level={interacted ? validationLevel : undefined}
          onBlur={() => setInteracted(true)}
        />
      )}
      <FileInfo file={file} />
    </InputContainer>
  );
};
