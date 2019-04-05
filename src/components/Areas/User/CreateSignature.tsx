import React, { FC, useContext } from 'react';

import { Signature } from 'components/Signature';
import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType } from 'hooks/useReceiptData';

export interface IProps {
  editClick: () => void;
}

export const CreateSignature: FC<IProps> = ({ editClick }) => {
  const { dispatch } = useContext(ReceiptContext);

  const onSave = (signature: File) => {
    dispatch({
      type: ActionType.CHANGE,
      data: { signature },
    });
  };

  return <Signature saveClick={onSave} editClick={editClick} />;
};
