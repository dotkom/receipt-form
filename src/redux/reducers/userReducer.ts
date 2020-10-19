import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile } from 'utils/profile';

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

interface IState {
  user: IAuthProfile | null;
  profile: IProfile | null;
}

const INITIAL_USER_STATE: IState = {
  user: null,
  profile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_STATE,
  reducers: {
    setUser(state, action: PayloadAction<IAuthProfile>) {
      const user = action.payload;
      state.user = user;
    },
    setProfile(state, action: PayloadAction<IProfile>) {
      const profile = action.payload;
      state.profile = profile;
    },
    resetUser() {
      return INITIAL_USER_STATE;
    },
  },
});

export const { resetUser, setProfile, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
