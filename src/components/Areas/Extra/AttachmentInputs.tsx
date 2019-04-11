import React, { useContext } from 'react';

import { FileInput } from 'components/Input';
import { ReceiptContext } from 'contexts/ReceiptData';
import { useInteraction } from 'hooks/useInteraction';
import { ActionType } from 'hooks/useReceiptData';
import { useValidation } from 'hooks/useValidation';

export const AttachmentsInputs = () => {
  const { state, dispatch } = useContext(ReceiptContext);
  const { interacted, setInteracted } = useInteraction('attachments');
  const { validation, level } = useValidation('attachments');

  const removeFile = (index: number) => {
    const attachments = state.attachments.filter((_, i) => i !== index);
    dispatch({
      type: ActionType.CHANGE,
      data: { attachments },
    });
  };

  const handleFileChange = (file: File) => {
    const attachments = [...state.attachments, file];
    dispatch({
      type: ActionType.CHANGE,
      data: { attachments },
    });
    setInteracted();
  };

  const length = state.attachments && state.attachments.length;
  const count = length === 0 ? '' : length + 1;

  return (
    <>
      <br />
      {state.attachments.map((attachment, i) => (
        <FileInput
          key={`Vedlegg ${i + 1}`}
          label={`Vedlegg ${i + 1}`}
          onUpload={handleFileChange}
          onRemove={() => removeFile(i)}
          file={attachment || undefined}
          validationLevel={level}
          onBlur={setInteracted}
          interacted={interacted}
        />
      ))}
      <FileInput
        label={`Vedlegg ${count}`}
        onUpload={handleFileChange}
        onBlur={setInteracted}
        validationLevel={level}
        validation={validation}
        interacted={state.attachments.length === 0 && interacted}
      />
    </>
  );
};
