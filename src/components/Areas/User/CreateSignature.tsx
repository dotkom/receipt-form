import React, { FC } from 'react';

import { Signature } from 'components/Signature';
import { useDispatch } from 'redux/hooks';
import { ActionType } from 'redux/reducers/formReducer';

export interface IProps {
  editClick: () => void;
}

export const CreateSignature: FC<IProps> = ({ editClick }) => {
  const dispatch = useDispatch();

  const onSave = (signature: File) => {
    dispatch({
      type: ActionType.CHANGE,
      data: { signature },
    });
  };

  return <Signature saveClick={onSave} editClick={editClick} />;
};
