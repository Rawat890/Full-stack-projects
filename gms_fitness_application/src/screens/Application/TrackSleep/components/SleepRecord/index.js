import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';

import PressableImage from '../../../../../components/PressableImage';
import { Other } from '../../../../../components/TextComponents';
import { bedImage, verticalThreeDots } from '../../../../../utilities/constants/images';

import { styles } from './styles';

const SleepRecord = ({ item, onDelete }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.recordItem}>
      <View style={styles.recordItemContainer1}>
        <Image source={bedImage} style={styles.bedIcon} />
        <View style={styles.recordDetails}>
          <View style={styles.timeRow1}>
            <Other style={styles.timeLabel}>{`${t('bedtime')}:`}</Other>
            <Other
              style={styles.timeValue}
            >{new Date(item.bedtime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}</Other>
          </View>
          <View style={styles.timeRow2}>
            <Other
              style={styles.durationText}
            >{`${t('duration')}: ${item.duration}`}</Other>
          </View>
        </View>
      </View>
      <PressableImage imageStyle={styles.icon} onPress={() => onDelete(item.id)} source={verticalThreeDots} />
    </View>
  );
};

export default SleepRecord;
