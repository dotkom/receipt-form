import { useCallback, useEffect } from 'react';

import { catchCallbackAction, loginAction } from 'redux/actions/authActions';
import { useDispatch } from 'redux/hooks';

export const useUserInfo = () => {
  const dispatch = useDispatch();

  const logIn = useCallback(() => {
    dispatch(loginAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(catchCallbackAction());
  }, [dispatch]);

  return { logIn };
};
