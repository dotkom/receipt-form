import React, { FC, useCallback, useEffect, useState } from 'react';

import { Edit } from 'components/Icons/Edit';
import { FileInput } from 'components/Input';
import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { useDispatch, useSelector } from 'redux/hooks';
import { formDataUpdated } from 'redux/reducers/formReducer';
import { isFileEqual } from 'utils/file';
import { Checkbox } from '@dotkomonline/design-system';
import { readFileAsDataUrl } from 'utils/readFileAsDataUrl';
import { readDataUrlAsFile } from 'utils/readDataUrlAsFile';

interface IProps {
  editClick: () => void;
}

const isSignatureEqual = (prev: File | null, next: File | null) => {
  return prev === next || (prev && next ? isFileEqual(prev, next) : false);
};

const SIGNATURE_STORAGE_KEY = 'SAVED_SIGNATURE';

const readSignatureFromStorage = async (): Promise<File | null> => {
  const signatureString = localStorage.getItem(SIGNATURE_STORAGE_KEY);
  if (signatureString) {
    const signature = await readDataUrlAsFile(signatureString);
    return signature;
  }
  return null;
};

const saveSignatureToStorage = async (signature: File) => {
  const signatureString = await readFileAsDataUrl(signature);
  localStorage.setItem(SIGNATURE_STORAGE_KEY, signatureString);
};

const removeSignatureFromStorage = async () => {
  localStorage.removeItem(SIGNATURE_STORAGE_KEY);
};

export const SignatureInput: FC<IProps> = ({ editClick }) => {
  /* Dirty has since DS controlled inputs are broken AF */
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const [shouldStoreSignature, setShouldStoreSignature] = useState(false);
  const dispatch = useDispatch();
  const signature = useSelector((state) => state.form.signature, isSignatureEqual);

  const removeFile = () => {
    dispatch(
      formDataUpdated({
        signature: null,
      })
    );
    removeSignatureFromStorage();
  };

  const handleFileChange = useCallback(
    (file: File) => {
      dispatch(
        formDataUpdated({
          signature: file,
        })
      );
    },
    [dispatch]
  );

  const handleLoadInitialSignature = useCallback(async () => {
    const storedSignature = await readSignatureFromStorage();
    if (storedSignature) {
      handleFileChange(storedSignature);
      setShouldStoreSignature(true);
    }
    /**
     * DS checkbox can't be controlled from the outside as it should be.
     * We have to wait for initial load of the signature to know what the default value
     * of the checkbox should be, and render it only after we know that.
     */
    setHasLoadedInitial(true);
  }, [handleFileChange]);

  useEffect(() => {
    handleLoadInitialSignature();
  }, [handleLoadInitialSignature]);

  const handleShouldStoreSignatureChange = async (shouldStore = false) => {
    setShouldStoreSignature(shouldStore);
    if (shouldStore) {
      if (!signature) {
        throw new Error('Should store signature was clicked when no signature was present');
      }
      await saveSignatureToStorage(signature);
    } else {
      await removeSignatureFromStorage();
    }
  };

  const { validation, level } = useValidation('signature');
  const { interacted, setInteracted } = useInteraction('signature');

  return (
    <>
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
      {hasLoadedInitial && Boolean(signature) && (
        <Checkbox
          label="Lagre signaturen på denne enheten?"
          onChange={handleShouldStoreSignatureChange}
          defaultChecked={shouldStoreSignature}
          isChecked={shouldStoreSignature}
        />
      )}
    </>
  );
};
