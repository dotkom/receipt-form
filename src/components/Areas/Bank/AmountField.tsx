import React, { ChangeEvent } from 'react';

import { Input } from 'components/Input';
import { useDispatch, useSelector } from 'redux/hooks';
import { formDataUpdated } from 'redux/reducers/formReducer';

export const AmountField = () => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.form.amount);

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      formDataUpdated({
        amount: Number(event.target.value),
      })
    );
  };

  return <Input label="Beløp" type="number" value={amount || 0} onChange={change} />;
};
