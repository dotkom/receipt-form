/**
 * TODO: #1209
 */

export interface ICommittee {
  /* Onlineweb 4 group name */
  group: string;
  /* Full canonical name of committee */
  name: string;
  email: string;
  shortName: string;
}

/**
 * TODO: #1209
 */

export const COMMITTEES: ICommittee[] = [
  {
    shortName: 'Arrkom',
    group: 'arrKom',
    name: 'Arrangementskomiteen',
    email: 'arrkom@online.ntnu.no',
  },
  {
    shortName: 'Bankom',
    group: 'banKom',
    name: 'Bank- og økonomikomiteen',
    email: 'bankom@online.ntnu.no',
  },
  {
    shortName: 'Bedkom',
    group: 'bedKom',
    name: 'Bedriftskomiteen',
    email: 'bedkom@online.ntnu.no',
  },
  {
    shortName: 'Dotkom',
    group: 'dotKom',
    name: 'Drifts- og Utviklingskomiteen',
    email: 'dotkom@online.ntnu.no',
  },
  {
    shortName: 'Ekskom',
    group: 'eksKom',
    name: 'Ekskursjonskomiteen',
    email: 'ekskom@online.ntnu.no',
  },
  {
    shortName: 'Fagkom',
    group: 'fagKom',
    name: 'Fag- og kurskomiteen',
    email: 'fagkom@online.ntnu.no',
  },
  {
    shortName: 'Hovedstyret',
    group: 'Hovedstyret',
    name: 'Hovedstyret',
    email: 'hovedstyret@online.ntnu.no',
  },
  {
    shortName: 'Prokom',
    group: 'proKom',
    name: 'Profil- og aviskomiteen',
    email: 'prokom@online.ntnu.no',
  },
  {
    shortName: 'Seniorkom',
    group: 'seniorKom',
    name: 'Seniorkomiteen',
    email: 'seniorkom@online.ntnu.no',
  },
  {
    shortName: 'Trikom',
    group: 'triKom',
    name: 'Trivselskomiteen',
    email: 'trikom@online.ntnu.no',
  },
  {
    shortName: 'ITEX',
    group: 'itex',
    name: 'IT-Ekskursjonen',
    email: 'itex@online.ntnu.no',
  },
  {
    shortName: 'Jubkom',
    group: 'jubKom',
    name: 'Jubileumskomiteen',
    email: 'jubkom@online.ntnu.no',
  },
  {
    shortName: 'Redaksjonen',
    group: 'Redaksjonen',
    name: 'Redaksjonen',
    email: 'redaksjonen@online.ntnu.no',
  },
  {
    shortName: 'Velkom',
    group: 'velKom',
    name: 'Velkomstkomiteen',
    email: 'velkom@online.ntnu.no',
  },
  {
    shortName: 'Onlinepotten',
    group: 'onlinepotten',
    name: 'Onlinepotten',
    email: 'hovedstyret@online.ntnu.no',
  },
  {
    shortName: 'Fondstyret',
    group: 'Fond',
    name: 'Fondstyret',
    email: 'fond@online.ntnu.no',
  },
  {
    shortName: 'Online-IL',
    group: 'Online-IL',
    name: 'Online idrettslag',
    email: 'oil@online.ntnu.no',
  },
];
