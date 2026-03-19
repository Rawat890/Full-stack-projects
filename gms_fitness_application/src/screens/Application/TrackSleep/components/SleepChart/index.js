import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { scale } from 'react-native-size-matters';

import { Heading2 } from '../../../../../components/TextComponents';
import { colors } from '../../../../../utilities/constants/colors';
import { getDimensions } from '../../../../../utilities/helper/getDimensions';

import { styles } from './styles';

const [screenWidth, screenHeight] = getDimensions();

const SleepChart = ({ sleepRecords }) => {
  const { t } = useTranslation();
  const parseDuration = (duration) => {
    if (!duration) { return 0; }

    const parts = duration.split(/h\s*/);
    const hours = parseFloat(parts[0]) || 0;
    const minutes = parseFloat(parts[1]) || 0;
    return hours + (minutes / 60);
  };

  const processRecords = () => {
    if (!sleepRecords || sleepRecords.length === 0) {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        hours: Array(7).fill(0),
      };
    }

    const dayMap = Array(7).fill(0);
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    sleepRecords.forEach(record => {
      try {
        const recordDate = new Date(record.date);
        const dayOfWeek = recordDate.getDay();
        const durationHours = parseDuration(record.duration);

        if (durationHours > dayMap[dayOfWeek]) {
          dayMap[dayOfWeek] = durationHours;
        }
      } catch (error) {
      }
    });

    return {
      labels: dayLabels,
      hours: dayMap,
    };
  };

  const { labels, hours } = processRecords();

  return (
    <View style={styles.container}>
      <Heading2 style={styles.chartTitle} >{t('weeklySleepHours')}</Heading2>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: hours,
              color: (opacity = 1) => colors.white1,
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - scale(80)}
        height={screenHeight / 3.5}
        yAxisSuffix="h"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: colors.white1,
          backgroundGradientFrom: colors.white1,
          backgroundGradientTo: colors.white1,
          decimalPlaces: 1,
          color: (opacity = 1) => colors.purple1,
          labelColor: (opacity = 1) => colors.purple2,
          style: {
            borderRadius: scale(16),
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: colors.gray4,
            fill: colors.white1,
          },
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: colors.gray7,
            strokeDasharray: '0',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

export default SleepChart;
