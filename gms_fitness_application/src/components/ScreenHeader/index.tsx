import React from 'react';
import { View } from 'react-native';

import { back } from '../../utilities/constants/images';
import { goBack } from '../../utilities/navigationService';
import PressableImage from '../PressableImage';
import { Heading1 } from '../TextComponents';

import { styles } from './styles';

type ScreenHeaderProps = {
  title: String;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => (
  <View style={styles.headerContainer}>
    <PressableImage
      source={back}
      onPress={goBack}
      imageStyle={styles.icon}
    />
    <Heading1 style={styles.header} >{title}</Heading1>
    <View />
  </View>
);

export default ScreenHeader;
