import React, { FC } from 'react';

import { Edit } from 'components/Icons/Edit';
import { FileInput } from 'components/Input';
import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { useDispatch, useSelector } from 'redux/hooks';
import { formDataUpdated } from 'redux/reducers/formReducer';
import { isFileEqual } from 'utils/file';

interface IProps {
  editClick: () => void;
}

const isSignatureEqual = (prev: File | null, next: File | null) => {
  return prev === next || (prev && next ? isFileEqual(prev, next) : false);
};

export const SignatureInput: FC<IProps> = ({ editClick }) => {
  const dispatch = useDispatch();
  const signature = useSelector((state) => state.form.signature, isSignatureEqual);

  const removeFile = () => {
    dispatch(
      formDataUpdated({
        signature: null,
      })
    );
  };

  const handleFileChange = (file: File) => {
    dispatch(
      formDataUpdated({
        signature: file,
      })
    );
  };

  const { validation, level } = useValidation('signature');
  const { interacted, setInteracted } = useInteraction('signature');

  return (
    <FileInput
      label="Signatur"
      onUpload={handleFileChange}
      onRemove={removeFile}
      file={signature || undefined}
      validation={validation}
      validationLevel={level}
      buttons={<Edit onClick={editClick} title="Tegn signatur" />}
      placeholder="Trykk på pennen for å skrive inn signatur. Klikk på dette feltet, eller dra en fil hit for å laste opp"
      interacted={interacted}
      onBlur={setInteracted}
      allowedTypes={['image/png']}
    />
  );
};
