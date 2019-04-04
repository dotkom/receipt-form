import React, { useContext } from 'react';

import { FileInput } from 'components/Input';
import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType } from 'hooks/useReceiptData';
import { useValidation } from 'hooks/useValidation';

export const SignatureInput = () => {
  const { state, dispatch } = useContext(ReceiptContext);

  const removeFile = () => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        signature: null,
      },
    });
  };

  const handleFileChange = (file: File) => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        signature: file,
      },
    });
  };

  const { validation, level } = useValidation('signature');

  return (
    <FileInput
      label="Signatur"
      onUpload={handleFileChange}
      onRemove={removeFile}
      file={state.signature || undefined}
      validation={validation}
      validationLevel={level}
    />
  );
};
