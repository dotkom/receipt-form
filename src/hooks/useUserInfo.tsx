import { User, UserManager } from 'oidc-client';
import { useContext, useEffect } from 'react';

import { AUTH_CALLBACK, AUTH_CLIENT_ID, AUTH_ENDPOINT } from 'constants/auth';
import { ReceiptContext } from 'contexts/ReceiptData';
import { deserializeReceipt, IDeserializedState, IState, serializeReceipt } from 'form/state';
import { getTotalFileSize } from 'utils/getTotalFileSize';
import { getProfile, IProfile } from 'utils/profile';

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

/** Prefer committee/Online mail is the user has one */
const getEmail = (email: string, profile?: IProfile) => {
  return profile && profile.online_mail ? `${profile.online_mail}@online.ntnu.no` : email;
};

const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4 MB
const STORAGE_KEY = 'LOGIN_REDIRECT_STATE';

const logInRedirect = async (state: IState) => {
  const totalSize = getTotalFileSize(state);
  if (totalSize < MAX_STORAGE_SIZE) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(await deserializeReceipt(state)));
  }
  await MANAGER.signinRedirect();
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

  const logIn = async () => {
    try {
      const user: User | null = await MANAGER.getUser();
      if (user) {
        processUser(user);
      } else {
        logInRedirect(state);
      }
    } catch (err) {
      logInRedirect(state);
    }
  };

  const catchCallback = async () => {
    try {
      const user = await MANAGER.signinRedirectCallback();
      const storedStateString = window.sessionStorage.getItem(STORAGE_KEY);
      if (storedStateString) {
        const storedState = await serializeReceipt(JSON.parse(storedStateString) as IDeserializedState);
        window.sessionStorage.removeItem(STORAGE_KEY);
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
