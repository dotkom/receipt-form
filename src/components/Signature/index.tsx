import React, { FC, useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import styled from 'styled-components';

import { Check } from 'components/Icons/Check';
import { Cross } from 'components/Icons/Cross';
import { Edit } from 'components/Icons/Edit';
import { Undo } from 'components/Icons/Undo';
import { BaseInputStyle, InputContainer } from 'components/Input';
import { FileLabels } from 'components/Input/FileLabels';
import {
  getValidationLevelColor,
  IValidationMessageProps,
  ValidationMessages,
} from 'components/Input/ValidationMessages';
import { colors } from 'constants/colors';
import { IValidation, ValidationLevel } from 'form/validation';
import { readDataUrlAsFile } from 'utils/readDataUrlAsFile';

const Canvas = styled.canvas<IValidationMessageProps>`
  ${BaseInputStyle}
  padding: 0;
  min-height: 8rem;

  ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}

  ${({ highlight }) => highlight && `border-color: ${colors.primary};`}

  :focus {
    ${({ level }) => level && `border-color: ${getValidationLevelColor(level)};`}
  }
`;

export interface IProps {
  saveClick: (image: File) => void;
  editClick: () => void;
  interacted?: boolean;
  validationLevel?: ValidationLevel;
  validation?: IValidation[];
}

export const Signature: FC<IProps> = ({ saveClick, editClick, interacted, validationLevel, validation = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);
  const resizeCanvas = () => {
    if (canvasRef.current && signaturePad) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvasRef.current.width = canvasRef.current.offsetWidth * ratio;
      canvasRef.current.height = canvasRef.current.offsetHeight * ratio;
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.scale(ratio, ratio);
      }
      signaturePad.clear();
    }
  };

  const createSignaturePad = () => {
    if (canvasRef.current) {
      setSignaturePad(new SignaturePad(canvasRef.current, { backgroundColor: colors.white }));
    }
  };

  const clear = () => {
    if (signaturePad) {
      signaturePad.clear();
    }
  };

  const undo = () => {
    if (signaturePad) {
      const data = signaturePad.toData();
      if (data) {
        data.pop();
        signaturePad.fromData(data);
      }
    }
  };

  const save = async () => {
    if (signaturePad) {
      const imageURL = signaturePad.toDataURL('image/png');
      const image = await readDataUrlAsFile(imageURL);
      if (image) {
        saveClick(image);
      }
      editClick();
    }
  };

  useEffect(() => {
    createSignaturePad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current, canvasRef]);

  useEffect(() => {
    resizeCanvas();
  }, [signaturePad]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current, canvasRef, signaturePad]);

  return (
    <InputContainer>
      <FileLabels label="Signér">
        <Check onClick={save} title="Lagre signatur" />
        <Undo onClick={undo} title="Fjern siste linje" />
        <Cross onClick={clear} title="Start signeringen på nytt" />
        <Edit onClick={editClick} title="Avslutt uten å lagre" />
      </FileLabels>
      <ValidationMessages display={Boolean(interacted)} validation={validation} />
      <Canvas level={interacted ? validationLevel : undefined} ref={canvasRef} />
    </InputContainer>
  );
};
