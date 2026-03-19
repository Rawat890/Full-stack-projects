import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

import { colors } from '../../utilities/constants/colors';

import { styles } from './styles';

type LoadingModalProps = {
  visible: boolean;
}

const LoadingModal : React.FC<LoadingModalProps> = ({visible}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color={colors.blue1} />
        </View>
      </View>
    </Modal>
  );
};
export default LoadingModal;

