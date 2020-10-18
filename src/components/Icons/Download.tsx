import React, { HTMLProps } from 'react';

import { colors } from 'constants/colors';

export const Download = ({ color, title, ...props }: HTMLProps<SVGSVGElement>) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 11 11" {...props}>
      <title>{title}</title>
      <rect x="2" y="8.2" width="7" height="1" fill={color || colors.darkGray} />
      <rect x="5" y="2" width="1" height="4" fill={color || colors.darkGray} />
      <path d="M3.5 5H7.5L5.5 7.5L3.5 5Z" fill={color || colors.darkGray} />
    </svg>
  );
};
