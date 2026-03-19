export const OTHERS = {
  fullBody_url: 'https://res.cloudinary.com/djolg0is0/image/upload/v1747985041/Workout-Pic_amvolf.png',
  fullBody_calories: 420,
  fullBody_exerciseTime: 45,
  ab_url: 'https://res.cloudinary.com/djolg0is0/image/upload/v1746089066/Workout2_ocibvn.png',
  ab_calories: 250,
  ab_exerciseTime: 30,
  lower_url: 'https://res.cloudinary.com/djolg0is0/image/upload/v1746089068/Workout3_gqcv2e.png',
  lower_calories: 350,
  lower_exerciseTime: 40,
  min_length: 0,
  camera_quality: 0.8,
};

export const ANIMATIONS ={
  gym: require('../../assets/animations/gym.json'),
  noWifi: require('../../assets/animations/noWifi.json'),
}

export const INPUT_FIELDS = {
  fullName: 'fullName',
  email: 'email',
  password: 'password',
  phone: 'phone',
} as const;

export type InputFieldKeys = keyof typeof INPUT_FIELDS;
