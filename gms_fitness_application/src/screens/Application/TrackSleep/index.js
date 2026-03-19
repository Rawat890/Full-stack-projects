import { FlashList } from '@shopify/flash-list';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import ScreenHeader from '../../../components/ScreenHeader';
import { Body2, Heading2, Other } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { fetchSleepSchedules, removeSleepSchedule } from '../../../screens/Application/SleepSchedule/sleepSlice';
import { colors } from '../../../utilities/constants/colors';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../utilities/navigationService';

import SleepChart from './components/SleepChart';
import SleepRecord from './components/SleepRecord';
import { styles } from './styles';

const TrackSleep = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { records, status } = useSelector((state) => state.sleep);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?.email) {
      dispatch(fetchSleepSchedules());
    }
  }, [dispatch, userData?.email]);

  const getLastNightSleep = () => {
    if (!records?.length) { return t('noSleepData'); }
    return records[0]?.duration || t('noDuration');
  };

  const handleDeleteRecord = (recordId) => {
    Alert.alert(t('deleteSleepRecord'), t('sureDeleteRecord'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete'),
        onPress: () =>
          dispatch(removeSleepSchedule(recordId)).catch(() =>
            Toast.show({
              type: 'error',
              text1: t('failedToDeleteSleep'),
              text2: t('checkNetworkConnection'),
            }),
          ),
      },
    ]);
  };

  const renderRecordItem = ({ item }) => (
    <SleepRecord item={item} onDelete={handleDeleteRecord} />
  );

  function navigateToSleepSchedule() {
    navigate(navigationRoutes.SLEEP_SCHEDULE);
  }

  const renderListHeader = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScreenHeader title={t('sleepTracker')} />
      </View>
      <SleepChart sleepRecords={records} />
      <LinearGradient
        colors={[colors.amber, colors.red2]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Heading2 style={styles.buttonText}>{t('lastSleep')}</Heading2>
        <Body2 style={styles.buttonText} >{getLastNightSleep()}</Body2>
      </LinearGradient>

      <View style={styles.scheduleButton}>
        <Body2 style={styles.scheduleText}>{t('dailySleepSchedule')}</Body2>
        <View style={styles.button}>
          <TextUniversalButton
            label={t('check')}
            onPress={navigateToSleepSchedule}
            compact
          />
        </View>
      </View>

      <Other style={styles.sectionTitle}>{t('recentSleepSchedules')}</Other>

      {status === 'loading' && <Other style={styles.loading}>{t('loadingSleepData')}</Other>}
      {status !== 'loading' && records.length === 0 && (
        <>
          <Other style={styles.noSleepRecord}>{t('noSleepRecords')}</Other>
          <View style={styles.addScheduleBtn}>
            <TextUniversalButton label={t('addSchedule')} onPress={navigateToSleepSchedule} />
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlashList
        ListHeaderComponent={renderListHeader}
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecordItem}
        estimatedItemSize={50}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default TrackSleep;
