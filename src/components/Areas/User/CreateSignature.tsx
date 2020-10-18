import React, { FC } from 'react';

import { Signature } from 'components/Signature';
import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { useDispatch } from 'redux/hooks';
import { ActionType } from 'redux/reducers/formReducer';

interface IProps {
  editClick: () => void;
}

export const CreateSignature: FC<IProps> = ({ editClick }) => {
  const dispatch = useDispatch();
  const { level, validation } = useValidation('signature');
  const { interacted } = useInteraction('signature');

  const onSave = (signature: File) => {
    dispatch({
      type: ActionType.CHANGE,
      data: { signature },
    });
  };

  return (
    <Signature
      saveClick={onSave}
      editClick={editClick}
      interacted={interacted}
      validationLevel={level}
      validation={validation}
    />
  );
};
