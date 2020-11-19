import { OW4_ADDRESS } from 'constants/backend';

const PROFILE_API = `${OW4_ADDRESS}/api/v1/profile/`;

/**
 * Full Onlineweb user profile.
 * Currently only populated with the used fields in this app.
 */
export interface IProfile {
  /* Name of the online_mail, without @online.ntnu.no */
  online_mail: string | null;
}

export const getProfile = async (token: string) => {
  const data = await fetch(PROFILE_API, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const profile: IProfile = await data.json();
  return profile;
};
