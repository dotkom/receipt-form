/**
 * TODO: #1209
 */

export interface ICommittee {
  /* Onlineweb 4 group name */
  group: string;
  /* Full canonical name of committee */
  name: string;
  email: string;
}

/**
 * TODO: #1209
 */

export const COMMITTEES: ICommittee[] = [
  {
    group: 'arrKom',
    name: 'Arrangementskomiteen',
    email: 'arrkom@online.ntnu.no',
  },
  {
    group: 'banKom',
    name: 'Bank- og økonomikomiteen',
    email: 'bankom@online.ntnu.no',
  },
  {
    group: 'bedKom',
    name: 'Bedriftskomiteen',
    email: 'bedkom@online.ntnu.no',
  },
  {
    group: 'dotKom',
    name: 'Drifts- og Utviklingskomiteen',
    email: 'dotkom@online.ntnu.no',
  },
  {
    group: 'eksKom',
    name: 'Ekskursjonskomiteen',
    email: 'ekskom@online.ntnu.no',
  },
  {
    group: 'fagKom',
    name: 'Fag- og kurskomiteen',
    email: 'fagkom@online.ntnu.no',
  },
  {
    group: 'Hovedstyret',
    name: 'Hovedstyret',
    email: 'hovedstyret@online.ntnu.no',
  },
  {
    group: 'proKom',
    name: 'Profil- og aviskomiteen',
    email: 'prokom@online.ntnu.no',
  },
  {
    group: 'seniorKom',
    name: 'Seniorkomiteen',
    email: 'seniorkom@online.ntnu.no',
  },
  {
    group: 'triKom',
    name: 'Trivselskomiteen',
    email: 'trikom@online.ntnu.no',
  },
  {
    group: 'itex',
    name: 'IT-Ekskursjonen',
    email: 'itex@online.ntnu.no',
  },
  {
    group: 'jubKom',
    name: 'Jubileumskomiteen',
    email: 'jubkom@online.ntnu.no',
  },
  {
    group: 'Redaksjonen',
    name: 'Redaksjonen',
    email: 'redaksjonen@online.ntnu.no',
  },
  {
    group: 'velKom',
    name: 'Velkomstkomiteen',
    email: 'velkom@online.ntnu.no',
  },
];
