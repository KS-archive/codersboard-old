const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'codersboard',
  api_key: '531298878124654',
  api_secret: '_uLhnynsAu2vITPvdYzl66hP2ts',
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
