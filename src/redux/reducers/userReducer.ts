import { Reducer } from 'redux';
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

export interface IUserState {
  user: IAuthProfile | null;
  profile: IProfile | null;
}

export const INITIAL_USER_STATE: IUserState = {
  user: null,
  profile: null,
};

export enum ActionType {
  SET_PROFILE = 'SET_PROFILE_DATA',
  SET_USER = 'SET_USER_DATA',
  RESET = 'RESET_USER_DATA',
}

export interface IAction<K extends ActionType, T = undefined> {
  type: K;
  data: T;
}

export type Actions =
  | IAction<ActionType.SET_PROFILE, IProfile>
  | IAction<ActionType.SET_USER, IAuthProfile>
  | IAction<ActionType.RESET>;

export const userReducer: Reducer<IUserState, Actions> = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.data,
      };
    case ActionType.SET_PROFILE:
      return {
        ...state,
        profile: action.data,
      };
    case ActionType.RESET:
      return INITIAL_USER_STATE;
    default:
      return state;
  }
};
