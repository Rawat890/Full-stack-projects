import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Pressable } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { Body2, Heading2, Other } from '../../../../../components/TextComponents';
import { colors } from '../../../../../utilities/constants/colors';
import { navigationCircle } from '../../../../../utilities/constants/images';
import navigationRoutes from '../../../../../utilities/constants/navigationRoutes';
import { formatDateString } from '../../../../../utilities/helper/dateFunctions';
import { navigate } from '../../../../../utilities/navigationService';

import { styles } from './styles';

interface WorkoutItem {
  id: string;
  imageUrl?: string | { uri: string };
  workoutType: string;
  calories_burn: number;
  exerciseTime: number;
  date: string;
  time: string;
}

interface LatestWorkoutListProps {
  data: WorkoutItem[]
}

const LatestWorkoutList: React.FC<LatestWorkoutListProps> = ({ data }) => {
  const { t } = useTranslation();

  function navigateToWorkout(item: WorkoutItem) {
    navigate(navigationRoutes.LATEST_WORKOUT_OVERVIEW,
      { workout: item },
    );
  }

  const renderItem: ListRenderItem<WorkoutItem> = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        {item.imageUrl && (
          <Image
            source={{ uri: typeof item.imageUrl === 'string' ? item.imageUrl : item.imageUrl.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.textContainer}>
          <Heading2 style={styles.workoutType}>{item.workoutType}</Heading2>
          <View style={styles.textInnerContainer1}>
            <Body2
              style={styles.detailsText}
            >{`${item.calories_burn} ${t('calories')} ${t('burn2')} |`}</Body2>
            <Other
              style={styles.detailsText}
            >{`${item.exerciseTime} ${t('minutes')}`}</Other>
          </View>
          <View style={styles.textInnerContainer2}>
            <Other
              style={styles.date}
            >{formatDateString(item.date)}</Other>
            <Other
              style={styles.time}
            >{`${item.time}`}</Other>
          </View>
          <ProgressBar
            progress={0.5}
            color={colors.indigo1}
            style={styles.bar}
          />
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [pressed && styles.pressed]}
        onPress={() => navigateToWorkout(item)}
      >
        <Image source={navigationCircle} style={styles.buttonImage} />
      </Pressable>
    </View>
  );

  return (
    <FlashList
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      estimatedItemSize={20}
    />
  );
};

export default LatestWorkoutList;
