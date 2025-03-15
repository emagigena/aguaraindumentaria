/**
 * Resizes and compresses an image to a maximum width and quality
 * @param base64Image The base64 encoded image
 * @param maxWidth The maximum width of the image
 * @param quality The quality of the image (0-1)
 * @returns A promise that resolves to a base64 encoded image
 */
export async function resizeImage(base64Image: string, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's a placeholder or not a base64 image, return it as is
    if (base64Image.includes('placeholder.svg') || !base64Image.startsWith('data:image')) {
      resolve(base64Image);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Calculate new dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      // Create canvas and draw image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to base64 with reduced quality
      const resizedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(resizedBase64);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = base64Image;
  });
}
