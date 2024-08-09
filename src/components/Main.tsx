import React, { useEffect } from 'react';

import { colors } from 'constants/colors';

import { Area } from './Area';
import { Attachments } from './Areas/Attachments';
import { BankInfo } from './Areas/Bank';
import { ExtraInfo } from './Areas/Extra';
import { Submit } from './Areas/Submit';
import { UserInfo } from './Areas/User';
import SaveInfoPrompt from './SaveInfoPrompt';
import { useDispatch, useSelector } from 'react-redux';
import { formDataUpdated } from '../redux/reducers/formReducer';

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const formData = localStorage.getItem('formData');
    if (formData) {
      dispatch(formDataUpdated(JSON.parse(formData)));
    }
  }, [dispatch]);

  // On submit, save form data to local storage
  const form = useSelector((state) => ({
    fullname: state.form.fullname,
    email: state.form.email,
    type: state.form.type,
    intent: state.form.intent,
    cardDetails: state.form.cardDetails,
    account: state.form.account,
    committee: state.form.committee,
  }));

  const saveInfo = useSelector((state) => state.form.saveInfo || false);
  const onFormSubmit = () => {
    if (saveInfo) {
      localStorage.setItem('formData', JSON.stringify(form));
    } else {
      localStorage.removeItem('formData');
    }
  };

  return (
    <main>
      <Area header="Personinformasjon">
        <UserInfo />
      </Area>
      <Area header="Kvitteringsinformasjon" color={colors.backgroundGray}>
        <BankInfo />
      </Area>
      <Area header="Extrainformasjon">
        <ExtraInfo />
      </Area>
      <Area header="Vedlegg/kvitteringer">
        <Attachments />
      </Area>
      <Area header="">
        <SaveInfoPrompt />
        <Submit onSubmit={onFormSubmit} />
      </Area>
    </main>
  );
};
