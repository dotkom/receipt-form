import React, { HTMLProps } from 'react';

import { colors } from 'constants/colors';

export interface IProps extends HTMLProps<SVGElement> {
  color?: string;
  title?: string;
}

export const Undo = ({ ref, color, title, ...props }: HTMLProps<SVGElement>) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 11 11" {...props}>
      <title>{title}</title>
      <path
        d="M2.66842 3.44274C3.02042 2.95826 3.49083 2.5722 4.03467 2.32148C4.57851 2.07077 5.17759 1.96379 5.77459 2.01078C6.37159 2.05776 6.94655 2.25714 7.44448 2.58984C7.9424 2.92255 8.34663 3.37744 8.6185 3.91102C8.89038 4.4446 9.02079 5.03901 8.99728 5.6374C8.97377 6.23578 8.79712 6.81813 8.48422 7.32873C8.17132 7.83933 7.73265 8.26111 7.21015 8.55372C6.68766 8.84633 6.09883 8.99999 5.49998 8.99999L5.49998 7.94999C5.91917 7.94999 6.33136 7.84243 6.6971 7.6376C7.06285 7.43277 7.36992 7.13753 7.58895 6.78011C7.80798 6.42269 7.93163 6.01504 7.94809 5.59617C7.96455 5.1773 7.87326 4.76121 7.68295 4.38771C7.49264 4.0142 7.20968 3.69578 6.86113 3.46289C6.51258 3.22999 6.11011 3.09043 5.69221 3.05754C5.2743 3.02465 4.85495 3.09954 4.47426 3.27504C4.09358 3.45053 3.76429 3.72078 3.51789 4.05991L2.66842 3.44274Z"
        fill={color || colors.darkGray}
      />
      <path d="M2.20001 3.55005L3.58228 4.53966L1.90154 5.42712L2.20001 3.55005Z" fill={color || colors.darkGray} />
    </svg>
  );
};
