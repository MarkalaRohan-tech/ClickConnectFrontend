// utils/cloudinary.js
export const getOptimizedImage = (url, options = {}) => {
  if (!url) return "";

  const {
    w = 500,
    h = null,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = options;

  let transformation = `w_${w},q_${quality},f_${format}`;
  if (h) transformation = `w_${w},h_${h},c_${crop},q_${quality},f_${format}`;

  return url.replace("/upload/", `/upload/${transformation}/`);
};
