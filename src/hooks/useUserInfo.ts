import { useEffect } from 'react';

import { catchCallbackAction, loginAction } from 'redux/actions/authActions';
import { useThunk } from 'redux/hooks';

export const useUserInfo = () => {
  const logIn = useThunk(loginAction());
  const catchCallback = useThunk(catchCallbackAction());

  useEffect(() => {
    catchCallback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { logIn };
};
