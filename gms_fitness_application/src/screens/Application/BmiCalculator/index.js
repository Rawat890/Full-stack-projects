import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Modal, TextInput, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import PressableImage from '../../../components/PressableImage';
import { Body2, Heading1, Heading2, Heading3, Other } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { setBmiValue } from '../../../screens/Application/BmiCalculator/bmiSlice';
import { colors } from '../../../utilities/constants/colors';
import { back, bmiImage, female, male, twoDots } from '../../../utilities/constants/images';
import { getBmiAndCategory, calculateAge } from '../../../utilities/helper/calculation';
import { goBack } from '../../../utilities/navigationService';

import { styles } from './styles';

const BmiCalculator = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { userData } = useSelector(state => state.user);
  const [height, setHeight] = useState(userData?.height?.toString() || '');
  const [weight, setWeight] = useState(userData?.weight?.toString() || '');
  const [bmi, setBmi] = useState(null);
  const [categoryKey, setCategoryKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [bmiText, setBmiText] = useState('');

  useEffect(() => {
    if (userData?.height) { setHeight(userData.height.toString()); }
    if (userData?.weight) { setWeight(userData.weight.toString()); }
  }, [userData]);

  const calculateBMI = () => {
    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    if (!height || !weight) {
      Toast.show({
        type: 'error',
        text1: t('validationError'),
        text2: t('pleaseEnterHeightWeight'),
      });
      return;
    }

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
      Toast.show({
        type: 'error',
        text1: t('validationError'),
        text2: t('pleaseEnterValidNumbers'),
      });
      return;
    }

    if (parsedHeight < 50 || parsedHeight > 300) {
      Toast.show({
        type: 'error',
        text1: t('validationError'),
        text2: t('heightValidation'),
      });
      return;
    }

    if (parsedWeight < 10 || parsedWeight > 500) {
      Toast.show({
        type: 'error',
        text1: t('validationError'),
        text2: t('weightValidation'),
      });
      return;
    }

    const { bmi, categoryKey, text } = getBmiAndCategory(parsedHeight, parsedWeight, t);
    if (!bmi) { return; }

    setBmi(bmi);
    setCategoryKey(categoryKey);
    setBmiText(text);
    dispatch(setBmiValue({ value: bmi, category: categoryKey }));
    setModalVisible(true);
  };

  const heightRef = useRef(null);
  const weightRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.header1}>
        <PressableImage
          onPress={goBack}
          source={back}
          imageStyle={styles.headerIcon}
          pressableStyle={styles.pressed}
        />
        <PressableImage
          source={twoDots}
          imageStyle={styles.headerIcon}
          pressableStyle={styles.pressed}
        />
      </View>

      <View style={styles.header2}>
        <Image source={bmiImage} style={styles.bmiImage} />
        <Heading1 style={styles.title}>{t('bmiCalculator')}</Heading1>
      </View>

      <View style={styles.information}>
        <Image source={userData.gender === 'Male' ? male : female} style={styles.icon} />
        <Heading3 style={styles.nameText}>{userData.fullName}</Heading3>
        <Heading3 style={styles.ageText}>{`${calculateAge(userData.dob)} years`}</Heading3>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          ref={heightRef}
          returnKeyType="next"
          onSubmitEditing={() => weightRef.current?.focus()}
          style={styles.input}
          placeholder={t('heightCm')}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholderTextColor={colors.gray4}
        />
        <Other style={styles.cmText}>{t('cm')}</Other>

        <TextInput
          ref={weightRef}
          returnKeyType="done"
          style={styles.input}
          placeholder={t('weightKg')}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholderTextColor={colors.gray4}
        />
        <Other style={styles.kgText}>{t('kg')}</Other>
      </View>

      <View style={styles.button}>
        <TextUniversalButton label={t('calculate')} onPress={calculateBMI} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, getCategoryStyle(categoryKey)]}>
            <View style={styles.result}>
              <Heading2 style={styles.resultText1}>{t('result')}</Heading2>
              <Other style={styles.categoryText}>{t(categoryKey)}</Other>
            </View>
            <Heading2 style={styles.resultText}>{`${t('yourBmi')} ${bmi}`}</Heading2>
            <Body2 style={styles.bmiInfoText}>{bmiText}</Body2>
            <View style={styles.backButton}>
              <TextUniversalButton label={t('back')} onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getCategoryStyle = (key) => {
  switch (key) {
    case 'underWeight': return { backgroundColor: colors.lightLavender };
    case 'normalWeight': return { backgroundColor: colors.green4 };
    case 'overWeight': return { backgroundColor: colors.red4 };
    case 'obese': return { backgroundColor: colors.red5 };
    default: return {};
  }
};

export default BmiCalculator;
