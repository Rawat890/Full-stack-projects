import { useTranslation } from 'react-i18next';
import { View, Image, ScrollView, Pressable } from 'react-native';

import PickDifficulty from '../../../../../components/PickDifficulty';
import {
  Heading1,
  Heading2,
  Body1,
  Body2,
  Body3,
} from '../../../../../components/TextComponents';
import { calendar } from '../../../../../utilities/constants/images';
import { formatDateString } from '../../../../../utilities/helper/dateFunctions';
import Exercises from '../Exercises';

import { styles } from './styles';

const WorkoutContent = ({
  item,
  isSchedule,
  handlePressOfSchedule,
  workoutName,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Heading1 style={styles.workoutName}>{workoutName}</Heading1>

      <View style={styles.workoutInfo}>
        <Body2 style={styles.workoutInfoText}>
          {`${item.Total_exercises} Exercises | `}
        </Body2>
        <Body2 style={styles.workoutInfoText}>
          {`${item.Total_time} | `}
        </Body2>
        <Body2 style={styles.workoutInfoText}>
          {`${item.calories_burn} ${t('burn1')}`}
        </Body2>
      </View>

      {isSchedule && (
        <Pressable onPress={handlePressOfSchedule} style={styles.scheduleContainer}>
          <View style={styles.scheduleInnerContainer}>
            <Image source={calendar} style={styles.calenderImage} />
            <Body1 style={styles.calenderText}>{t('scheduleWorkout')}</Body1>
          </View>
          <Body2 style={styles.date}>{formatDateString(new Date())}</Body2>
        </Pressable>
      )}

      <View style={styles.difficultyPicker}>
        <PickDifficulty
          selectedValue={selectedDifficulty}
          onValueChange={setSelectedDifficulty}
          options={[t('easy'), t('intermediate'), t('hard')]}
        />
      </View>

      <View style={styles.itemContainer}>
        <Body1 style={styles.itemText1}>{t('youNeed')}</Body1>
        <Body2 style={styles.itemText2}>
          {`${item.items_required.length} ${t('items')}`}
        </Body2>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.equipmentScroll}
      >
        {item.items_required.map((equipment, index) => (
          <View key={index} style={styles.equipmentContainer}>
            <Image source={{ uri: equipment.imageUrl }} style={styles.equipmentImage} />
            <Body3 style={styles.equipmentText}>{equipment.equipmentName}</Body3>
          </View>
        ))}
      </ScrollView>

      <View style={styles.exerciseListHeader}>
        <Heading2 style={styles.exerciseListText}>{t('exercises')}</Heading2>
        <Body2 style={styles.setNumber}>
          {`${item.exercises.TotalSets} ${t('sets')}`}
        </Body2>
      </View>

      <ScrollView
        style={styles.exerciseScroll}
        contentContainerStyle={styles.exerciseContainer}
        showsVerticalScrollIndicator={false}
      >
        <Exercises
          exercises={item.exercises}
          selectedDifficulty={selectedDifficulty}
        />
      </ScrollView>
    </>
  );
};

export default WorkoutContent;

