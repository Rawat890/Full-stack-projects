import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { Body2, Heading1 } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { welcomeUser } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { replace } from '../../../utilities/navigationService';

import { styles } from './styles';

const RegistrationSuccess = ({ route }) => {
  const { userData } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const navigateToDashBoard = async () => {
    replace(navigationRoutes.BOTTOM_TAB_NAVIGATOR);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.frameView}>
          <Image style={styles.frame1} source={welcomeUser} resizeMode="contain" />
          <View style={styles.imagePrimaryTextContainer}>
            <Heading1 style={styles.imagePrimaryText}>{t('welcome') + ` ${userData.fullName},`}</Heading1>
          </View>
          <Body2 style={styles.imageSecondaryText}>{t('allSet')} </Body2>
        </View>
      </View>

      <View style={styles.button}>
        <TextUniversalButton label={t('goHome')} onPress={navigateToDashBoard} />
      </View>
    </View>
  );
};

export default RegistrationSuccess;
