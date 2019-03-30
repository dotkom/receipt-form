import { User, UserManager } from 'oidc-client';
import { useContext, useEffect } from 'react';

import { AUTH_CALLBACK, AUTH_CLIENT_ID, AUTH_ENDPOINT } from 'constants/auth';
import { ReceiptContext } from 'contexts/ReceiptData';
import { getProfile, IProfile } from 'utils/profile';

import { ActionType, IState } from './useReceiptData';

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

/** Prefer committee/Online mail is the user has one */
const getEmail = (email: string, profile?: IProfile) => {
  return profile && profile.online_mail ? `${profile.online_mail}@online.ntnu.no` : email;
};

export const useUserInfo = () => {
  const { state, dispatch } = useContext(ReceiptContext);

  const processUser = async (user: User) => {
    const profile: IAuthProfile = user.profile;
    const extProfile = await getProfile(user.access_token);
    const email = getEmail(profile.email, extProfile);
    dispatch({
      type: ActionType.CHANGE,
      data: {
        fullname: profile.name,
        email,
      },
    });
  };

  const logInRedirect = () => {
    window.sessionStorage.setItem('LOGIN_REDIRECT_STATE', JSON.stringify(state));
    MANAGER.signinRedirect();
  };

  const logIn = async () => {
    try {
      const user: User | null = await MANAGER.getUser();
      if (user) {
        processUser(user);
      } else {
        logInRedirect();
      }
    } catch (err) {
      logInRedirect();
    }
  };

  const catchCallback = async () => {
    try {
      const user = await MANAGER.signinRedirectCallback();
      const storedStateString = window.sessionStorage.getItem('LOGIN_REDIRECT_STATE');
      if (storedStateString) {
        const storedState = JSON.parse(storedStateString) as IState;
        window.sessionStorage.removeItem('LOGIN_REDIRECT_STATE');
        dispatch({
          type: ActionType.CHANGE,
          data: storedState,
        });
      }
      processUser(user);
    } catch (err) {
      /** Do nothing if no user data is present */
      return;
    }
  };

  useEffect(() => {
    catchCallback();
  }, []);

  return { logIn };
};
