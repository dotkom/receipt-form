const MAX_SIZE = 1600;

function rescaledResolution(width: number, height: number) {
  const ratio = width / height;

  if (width <= MAX_SIZE && height <= MAX_SIZE) return { width, height };

  if (width > height) {
    return {
      width: MAX_SIZE,
      height: Math.round(MAX_SIZE / ratio),
    };
  } else {
    return {
      width: Math.round(MAX_SIZE * ratio),
      height: MAX_SIZE,
    };
  }
}

export function resizeUploadImage(file: File): Promise<File> {
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const { width, height } = rescaledResolution(img.width, img.height);

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Could not resize image'));
          return;
        }

        resolve(new File([blob], 'kvittering.jpg', { type: 'image/jpeg' }));
      });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
