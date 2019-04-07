import React, { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Cross } from 'components/Icons/Cross';
import { ValidationLevel } from 'form/validation';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';

import { IInputProps, InputContainer } from './Base';
import { FileDisplay } from './FileDisplay';
import { FileInfo } from './FileInfo';
import { FileInputContainer } from './FileInputContainer';
import { FileLabels } from './FileLabels';
import { ValidationMessages } from './ValidationMessages';

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/jpg'];
const ALLOWED_TYPES = [...IMAGE_TYPES, 'application/pdf', '.pdf'];

export interface IFileInputProps extends IInputProps {
  file?: File;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  buttons?: ReactNode;
}

export const FileInput: FC<IFileInputProps> = ({
  label,
  file,
  onRemove,
  onUpload,
  validation = [],
  validationLevel = ValidationLevel.NONE,
  buttons,
  placeholder,
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
      <FileLabels label={label}>
        {buttons}
        {!!file && <Cross onClick={clearFile} />}
      </FileLabels>
      <ValidationMessages display={interacted} validation={validation} />
      {file ? (
        <FileDisplay file={file} image={image} level={validationLevel} />
      ) : (
        <FileInputContainer
          type="file"
          onDragEnter={onFileHover}
          onDragLeave={onCancelFileHover}
          value={props.value}
          onChange={handleUpload}
          ref={fileInputRef}
          accept={ALLOWED_TYPES.join(',')}
          onBlur={() => setInteracted(true)}
          level={interacted ? validationLevel : undefined}
          highlight={fileHover}
          placeholder={placeholder}
        />
      )}
      <FileInfo file={file} />
    </InputContainer>
  );
};
