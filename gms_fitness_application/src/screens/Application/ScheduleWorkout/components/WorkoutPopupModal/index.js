import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Modal, Pressable, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import PressableImage from '../../../../../components/PressableImage';
import { Body2, Heading2, Other } from '../../../../../components/TextComponents';
import { colors } from '../../../../../utilities/constants/colors';
import { clockIcon, close, deleteIcon } from '../../../../../utilities/constants/images';

import { styles } from './styles';

const WorkoutPopupModal = ({ visible, workout, onClose, onDelete, onMarkDone }) => {
  const { t } = useTranslation();
  if (!workout) { return null; }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <PressableImage
              onPress={onClose}
              source={close}
              imageStyle={styles.icon}
            />
            <Heading2 style={styles.title}>{t('workoutSchedule')}</Heading2>
            <PressableImage
              onPress={onDelete}
              source={deleteIcon}
              imageStyle={styles.icon}
            />
          </View>

          <Body2 style={styles.text}>{workout.workoutType}</Body2>

          <View style={styles.details}>
            <Image source={clockIcon} style={styles.clock} />
            <Other style={styles.timeText}>{workout.time}</Other>
          </View>

          <Pressable onPress={onMarkDone}>
            <LinearGradient colors={[colors.cyan, colors.green2]} style={styles.button}>
              <Other style={styles.buttonText}>{t('mark')}</Other>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default WorkoutPopupModal;
