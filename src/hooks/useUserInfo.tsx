import { User, UserManager } from 'oidc-client';
import { useContext, useEffect } from 'react';

import { AUTH_CALLBACK, AUTH_CLIENT_ID, AUTH_ENDPOINT } from '../constants/auth';
import { ReceiptContext } from '../contexts/ReceiptData';
import { ActionType } from './useReceiptData';

const MANAGER = new UserManager({
  authority: AUTH_ENDPOINT,
  client_id: AUTH_CLIENT_ID,
  redirect_uri: AUTH_CALLBACK,
  post_logout_redirect_uri: AUTH_CALLBACK,
  response_type: 'id_token token',
  scope: 'openid profile email onlineweb4',
  filterProtocolClaims: true,
  loadUserInfo: true,
});

/**
 * Profile informastion returned from authenticating with
 * OpenID Connect to Onlineweb4.
 */
export interface IAuthProfile {
  /** Unix timestamp when the user was authenticated */
  auth_time: number;
  /** Last name of the user */
  family_name: string;
  /** First name(s) of the user */
  given_name: string;
  /** Full name of the user */
  name: string;
  /** Personally set nickname */
  nickname: string;
  /** Full URL to profile picture */
  picture: string;
  /** Onlineweb username */
  preferred_username: string;
  /** Onlineweb UserId */
  sub: string;
  /** Mail profile email */
  email: string;
}

export const useUserInfo = () => {
  const { dispatch } = useContext(ReceiptContext);

  const processUser = (user: User) => {
    const profile: IAuthProfile = user.profile;
    dispatch({
      type: ActionType.CHANGE,
      data: {
        fullname: profile.name,
        email: profile.email,
      }
    })
  };

  const logIn = async () => {
    try {
      const user = await MANAGER.getUser();
      processUser(user);
    } catch (err) {
      MANAGER.signinRedirect();
    }
  };

  const catchCallback = async () => {
    const user = await MANAGER.signinRedirectCallback();
    processUser(user);
  }; 

  useEffect(() => {
    catchCallback();
  }, [])

  return { logIn };
};
