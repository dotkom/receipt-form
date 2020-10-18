import React, { HTMLProps } from 'react';

import { colors } from 'constants/colors';

export const Edit = ({ color, title, ...props }: HTMLProps<SVGSVGElement>) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 11 11" {...props}>
      <title>{title}</title>
      <path d="M7.14233 2L8.45555 3.10192L4.78248 7.47932L3.46926 6.3774L7.14233 2Z" fill={color || colors.darkGray} />
      <path d="M3.10193 6.81519L4.41515 7.91711L2.65662 8.67937L3.10193 6.81519Z" fill={color || colors.darkGray} />
    </svg>
  );
};
