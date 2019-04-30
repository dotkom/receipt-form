import React, { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Cross } from 'components/Icons/Cross';
import { Download } from 'components/Icons/Download';
import { ValidationLevel } from 'form/validation';
import { downloadFile } from 'utils/download';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';

import { IInputProps, InputContainer } from './Base';
import { FileDisplay } from './FileDisplay';
import { FileInfo } from './FileInfo';
import { FileInputContainer } from './FileInputContainer';
import { FileLabels } from './FileLabels';
import { ValidationMessages } from './ValidationMessages';

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const DEFAULT_ALLOWED_TYPES = [...IMAGE_TYPES, 'application/pdf', '.pdf'];

export interface IFileInputProps extends IInputProps {
  file?: File;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  buttons?: ReactNode;
  allowedTypes?: string[];
}

export const FileInput: FC<IFileInputProps> = ({
  label,
  file,
  onRemove,
  onUpload,
  validation = [],
  validationLevel = ValidationLevel.NONE,
  buttons,
  interacted,
  ref,
  as,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  ...props
}) => {
  const [image, setImage] = useState<null | string>(null);
  const [fileHover, setFileHover] = useState(false);
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

  const download = () => {
    if (file) {
      downloadFile(file);
    }
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0] && allowedTypes.includes(files[0].type)) {
      onUpload(files[0]);
    }
    clearInputValue();
    onCancelFileHover();
  };

  return (
    <InputContainer>
      <FileLabels label={label}>
        {buttons}
        {!!file && (
          <>
            <Download onClick={download} title="Last ned filen" />
            <Cross onClick={clearFile} title="Fjern fil" />
          </>
        )}
      </FileLabels>
      <ValidationMessages display={Boolean(interacted)} validation={validation} />
      {file ? (
        <FileDisplay file={file} image={image} level={validationLevel} />
      ) : (
        <FileInputContainer
          type="file"
          onDragEnter={onFileHover}
          onDragLeave={onCancelFileHover}
          onChange={handleUpload}
          inputRef={fileInputRef}
          accept={allowedTypes.join(',')}
          level={interacted ? validationLevel : undefined}
          highlight={fileHover}
          {...props}
        />
      )}
      <FileInfo file={file} />
    </InputContainer>
  );
};
