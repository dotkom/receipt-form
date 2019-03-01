import React, { ChangeEvent, useContext } from 'react';

import { Input } from 'components/Input';
import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType } from 'hooks/useReceiptData';

export const AmountField = () => {
  const { state, dispatch } = useContext(ReceiptContext);

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        amount: Number(event.target.value),
      },
    });
  };

  return <Input label="Beløp" type="number" value={state.amount || 0} onChange={change} />;
};
