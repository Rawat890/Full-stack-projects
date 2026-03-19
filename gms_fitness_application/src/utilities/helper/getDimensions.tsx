import { Dimensions } from 'react-native';

export const getDimensions = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return [screenWidth, screenHeight];
};
