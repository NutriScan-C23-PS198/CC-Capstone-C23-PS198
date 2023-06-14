const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Upload image from base64 encoded string
async function uploadImage(dir, filename, file) {
  // ? Remove header from base64 string
  file = file.replace(/^data:image\/\w+;base64,/, '');
  
  // ? Remove new line characters from base64 string
  file = file.replace(/\n/g, '');
  
  // ? Create buffer from base64 string and
  // ? upload to Google Cloud Storage
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

  // ? Return the image URL
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  return publicUrl;
  // return {
  //   url: publicUrl,
  //   location: blob.name
  // };
}

// Delete image from Google Cloud Storage
async function deleteImage(dir, filename) {
  // const filename = photoURL.split('/').pop();
  const blob = bucket.file(`${dir}/${filename}`);
  return await blob.delete();
}

module.exports = {
  uploadImage,
  deleteImage,
}
