import React, { HTMLProps } from 'react';

import { colors } from 'constants/colors';

export interface IProps extends HTMLProps<SVGElement> {
  color?: string;
}

export const Cross = ({ ref, color, ...props }: HTMLProps<SVGElement>) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 11 11" {...props}>
      <path
        d="M2.67161 7.62132L4.79293 5.5L2.67161 3.37868L3.37872 2.67157L5.50004 4.79289L7.62136 2.67157L8.32847 3.37868L6.20715 5.5L8.32847 7.62132L7.62136 8.32843L5.50004 6.20711L3.37872 8.32843L2.67161 7.62132Z"
        fill={color || colors.darkGray}
      />
    </svg>
  );
};
