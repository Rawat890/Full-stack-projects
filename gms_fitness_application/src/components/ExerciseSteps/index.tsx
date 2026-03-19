import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Line, Svg } from 'react-native-svg';

import { colors } from '../../utilities/constants/colors';
import { goBack } from '../../utilities/navigationService';
import { Body1, Heading1, Heading2, Other } from '../TextComponents';
import TextUniversalButton from '../TextUniversalButton';

import { styles } from './styles';

interface Instruction {
  title: string;
  description: string;
}

interface ExerciseStepsProps {
  instructions: Instruction[];
}

const ExerciseSteps: React.FC<ExerciseStepsProps> = ({ instructions }) => {
  const { t } = useTranslation();

  if (!instructions || instructions.length === 0) {
    return (
      <View style={styles.container}>
        <Other style={styles.noStepsText}>{t('noInstructions')}</Other>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoHeader}>
        <Heading2 style={styles.header}>{t('howToDo')}</Heading2>
        <Other style={styles.stepsLength}>{`${instructions.length} ${t('steps')}`}</Other>
      </View>

      <View style={styles.instructionsContainer}>
        {instructions.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <View style={styles.stepNumberContainer}>
              <Other style={styles.stepNumberText}>{`0${index + 1}`}</Other>
            </View>

            <View style={styles.circleLineContainer}>
              <View style={styles.circle}>
                <View style={styles.innerCircle} />
              </View>
              {index !== instructions.length - 1 && (
                <Svg height={80} width="2" style={styles.dashedLine}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Line
                      key={i}
                      x1="1"
                      y1={i * 6.5}
                      x2="1"
                      y2={i * 6.5 + 4}
                      stroke={colors.orchidPink1}
                      strokeWidth="2"
                    />
                  ))}
                </Svg>
              )}
            </View>

            <View style={styles.stepContent}>
              <Heading1 style={styles.stepTitle}>{step.title}</Heading1>
              <Body1 style={styles.stepDescription}>{step.description}</Body1>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.button}>
        <TextUniversalButton label={t('done')} onPress={goBack} />
      </View>
    </View>
  );
};

export default ExerciseSteps;
