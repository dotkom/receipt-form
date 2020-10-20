import { OW4_ADDRESS } from 'constants/backend';

export type GroupType = 'other' | 'node_committee' | 'committee' | 'hobby_group';

export interface OnlineGroup {
  id: number;
  image: string | null;
  name_short: string;
  name_long: string;
  description_long: string;
  description_short: string;
  application_description: string;
  email: string;
  created: string;
  group_type: GroupType;
  verbose_type: string;
  group: number;
  members: number[];
}

export const GROUP_TYPE_WHITELIST: GroupType[] = ['committee', 'node_committee', 'hobby_group'];
export const GROUP_ID_BLACKLIST: number[] = [];

export interface ExtraGroup {
  id: number;
  name: string;
  email: string;
  imageUrl?: string;
}

export const EXTRA_GROUP_CHOICES: ExtraGroup[] = [
  {
    id: -1, // Has to be unique but not clashing with real groups.
    name: 'Onlinepotten',
    email: 'hovedstyret@online.ntnu.no',
  },
];

export type Group = OnlineGroup | ExtraGroup;

export const isOnlineGroup = (group: Group): group is OnlineGroup => group.hasOwnProperty('created');

export const getGroupName = (group: Group) => {
  return isOnlineGroup(group) ? group.name_long : group.name;
};

export const getAllGroups = async (): Promise<Group[]> => {
  const response = await fetch(`${OW4_ADDRESS}/api/v1/group/online-groups/?page_size=60`);
  const data = await response.json();
  const groups = data.results as OnlineGroup[];
  const validGroups: Group[] = groups.filter(
    (group) => GROUP_TYPE_WHITELIST.includes(group.group_type) && !GROUP_ID_BLACKLIST.includes(group.id)
  );
  const allGroups = validGroups.concat(EXTRA_GROUP_CHOICES);
  return allGroups;
};
