const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Upload image from base64 encoded string
async function uploadImage(dir, filename, file) {
  const buffer     = Buffer.from(file, 'base64');
  const blob       = bucket.file(`${dir}/${filename}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: 'image/jpeg',
    }
  });

  await new Promise((resolve, reject) => {
    blobStream
      .on('finish', resolve)
      .on('error', reject)
      .end(buffer);
  });

  // The image URL
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  return publicUrl;
}

// Delete image from Google Cloud Storage
async function deleteImage(photoURL) {
  const filename = photoURL.split('/').pop();
  const blob = bucket.file(filename);
  return await blob.delete();
}

module.exports = {
  uploadImage,
  deleteImage,
}
