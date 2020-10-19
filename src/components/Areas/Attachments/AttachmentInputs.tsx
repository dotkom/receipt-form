import React, { FC } from 'react';

import { FileInput } from 'components/Input';
import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { useDispatch, useSelector } from 'redux/hooks';
import { areFilesEqual } from 'utils/file';
import { formDataUpdated } from 'redux/reducers/formReducer';

export const AttachmentsInputs: FC = () => {
  const dispatch = useDispatch();
  const attachments = useSelector((state) => state.form.attachments, areFilesEqual);
  const { interacted, setInteracted } = useInteraction('attachments');
  const { validation, level } = useValidation('attachments');

  const removeFile = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    dispatch(formDataUpdated({ attachments: newAttachments }));
  };

  const handleFileChange = (file: File) => {
    const newAttachments = [...attachments, file];
    dispatch(formDataUpdated({ attachments: newAttachments }));
    setInteracted();
  };

  const length = attachments && attachments.length;
  const count = length === 0 ? '' : length + 1;

  return (
    <>
      {attachments.map((attachment, i) => (
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
        interacted={attachments.length === 0 && interacted}
      />
    </>
  );
};
