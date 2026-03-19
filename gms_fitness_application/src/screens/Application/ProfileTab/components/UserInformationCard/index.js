import React from 'react';
import { View } from 'react-native';

import { Body3, Heading3 } from '../../../../../components/TextComponents';

import { styles } from './styles';

const UserInformationCard = ({ label, info }) => {
  return (
    <View style={styles.container}>
      <Heading3 style={styles.text1}>{info}</Heading3>
      <Body3 style={styles.text2}>{label}</Body3>
    </View>
  );
};

export default UserInformationCard;
