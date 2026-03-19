import Config from 'react-native-config';

const CLOUD_NAME = Config.CLOUD_NAME;

export const uploadToCloudinary = async (photoUri) => {
  const data = new FormData();
  data.append('file', {
    uri: photoUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  data.append('upload_preset', 'fitness_users_images');

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: data,
  });

  const result = await res.json();
  return result.secure_url;
};
