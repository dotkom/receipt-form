import React, { FC, useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import styled from 'styled-components';

import { Check } from 'components/Icons/Check';
import { Cross } from 'components/Icons/Cross';
import { Edit } from 'components/Icons/Edit';
import { BaseInputStyle, InputContainer } from 'components/Input';
import { FileLabels } from 'components/Input/FileLabels';
import { colors } from 'constants/colors';
import { readDataUrlAsFile } from 'utils/readDataUrlAsFile';

const Canvas = styled.canvas`
  ${BaseInputStyle}
  padding: 0;
  min-height: 8rem;
`;

export interface IProps {
  saveClick: (image: File) => void;
  editClick: () => void;
}

export const Signature: FC<IProps> = ({ saveClick, editClick }) => {
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

  const save = async () => {
    if (signaturePad) {
      const imageURL = signaturePad.toDataURL('image/png');
      const image = await readDataUrlAsFile(imageURL);
      saveClick(image);
      editClick();
    }
  };

  useEffect(() => {
    createSignaturePad();
  }, [canvasRef.current, canvasRef]);

  useEffect(() => {
    resizeCanvas();
  }, [signaturePad]);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [canvasRef.current, canvasRef, signaturePad]);

  return (
    <InputContainer>
      <FileLabels label="Signér">
        <Edit onClick={editClick} />
        <Check onClick={save} />
        <Cross onClick={clear} />
      </FileLabels>
      <Canvas ref={canvasRef} />
    </InputContainer>
  );
};
