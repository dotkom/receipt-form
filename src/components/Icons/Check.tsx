import React, { FC, SVGProps } from 'react';

import { colors } from 'constants/colors';

interface Props extends SVGProps<SVGSVGElement> {
  title: string;
}

export const Check: FC<Props> = ({ color, title, ...props }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 11 11" {...props}>
      <title>{title}</title>
      <path
        d="M8.59967 2.88562L9.54248 3.82843L4.82843 8.54247L2.00001 5.71404L2.94281 4.77124L4.82843 6.65685L8.59967 2.88562Z"
        fill={color || colors.darkGray}
      />
    </svg>
  );
};
