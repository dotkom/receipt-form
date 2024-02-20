import { User, UserManager } from 'oidc-client';
import { batch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AUTH_CALLBACK, AUTH_CLIENT_ID, AUTH_ENDPOINT } from 'constants/auth';
import { calculateInteractions } from 'form/interaction';
import { deserializeReceipt, IDeserializedState, IState, serializeReceipt } from 'form/state';
import { IAuthProfile } from 'redux/reducers/userReducer';
import { getTotalFileSize } from 'utils/getTotalFileSize';
import { getProfile, IProfile } from 'utils/profile';
import { Dispatch, State } from 'redux/store';
import { formDataUpdated } from 'redux/reducers/formReducer';
import { setInteraction } from 'redux/reducers/interactionReducer';

const getManager = () =>
  new UserManager({
    authority: AUTH_ENDPOINT,
    client_id: AUTH_CLIENT_ID,
    redirect_uri: AUTH_CALLBACK,
    post_logout_redirect_uri: AUTH_CALLBACK,
    response_type: 'id_token token',
    scope: 'openid profile email onlineweb4',
    filterProtocolClaims: true,
    loadUserInfo: true,
  });

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
  await getManager().signinRedirect();
};

const processUser = async (user: User, state: IState): Promise<IState> => {
  const profile: IAuthProfile = user.profile as IAuthProfile;
  const extProfile = await getProfile(user.access_token);
  const email = getEmail(profile.email, extProfile);
  if (state.signature?.type === 'application/octet-stream') {
    state.signature = null;
  }

  return {
    ...state,
    fullname: profile.name,
    email,
  };
};

const updateForm = (dispatch: Dispatch, form: IState) => {
  batch(() => {
    dispatch(formDataUpdated(form));
    dispatch(setInteraction(calculateInteractions(form)));
  });
};

export const loginAction = createAsyncThunk('user/login', async (_, { dispatch, getState }) => {
  const { form } = getState() as State;
  try {
    const user: User | null = await getManager().getUser();
    if (user) {
      const newForm = await processUser(user, form);
      updateForm(dispatch, newForm);
    } else {
      logInRedirect(form);
    }
  } catch (err) {
    logInRedirect(form);
  }
});

export const catchCallbackAction = createAsyncThunk('user/catchCallback', async (_, { dispatch, getState }) => {
  const { form } = getState() as State;
  try {
    const user = await getManager().signinRedirectCallback();
    const storedStateString = window.sessionStorage.getItem(STORAGE_KEY);
    if (storedStateString) {
      const storedState = await serializeReceipt(JSON.parse(storedStateString) as IDeserializedState);
      window.sessionStorage.removeItem(STORAGE_KEY);
      const newForm = await processUser(user, storedState);
      updateForm(dispatch, newForm);
    } else {
      const newForm = await processUser(user, form);
      updateForm(dispatch, newForm);
    }
    /** Purge all OIDC user data from URL */
    window.location.hash = '';
  } catch (err) {
    /** Do nothing if no user data is present */
    window.location.hash = '';
    return;
  }
});
