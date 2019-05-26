const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, folder, fileName) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { public_id: fileName, overwrite: true, folder },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    ).end(buffer);
  });

module.exports = {
  upload: uploadToCloudinary,
};
