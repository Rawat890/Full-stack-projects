import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  name: 'gms_fitness_application',
  slug: 'gms_fitness_application',
  runtimeVersion: '1.0.0',
  extra: {
    eas: {
      projectId: 'ade9398c-096c-4c4e-b041-7a4bae0017c6',
    },
  },
  updates: {
    url: 'https://u.expo.dev/ade9398c-096c-4c4e-b041-7a4bae0017c6',
    requestHeaders: {
      'expo-channel-name': process.env.EXPO_CHANNEL_NAME || 'development',
    },
  },
  android: {},
  ios: {},
});
