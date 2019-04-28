/**
 * Scales the width and height based on maxWidth and maxHeight
 */
export const scaleDims = (width: number, height: number, maxWidth: number = width, maxHeight: number = height) => {
  /* calculate scaling factors */
  const widthScalingFactor = width / maxWidth;
  const heightScalingFactor = height / maxHeight;

  let newWidth = width;
  let newHeight = height;

  /* scale to size based on scaling factors */
  if (widthScalingFactor > heightScalingFactor) {
    newWidth = maxWidth;
    newHeight = height / widthScalingFactor;
  } else {
    newWidth = width / heightScalingFactor;
    newHeight = maxHeight;
  }

  return { width: newWidth, height: newHeight };
};
