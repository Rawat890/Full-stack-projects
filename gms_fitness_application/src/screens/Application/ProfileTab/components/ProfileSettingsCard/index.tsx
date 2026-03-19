import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View, Image } from 'react-native';

import { Body2, Heading3 } from '../../../../../components/TextComponents';
import { down } from '../../../../../utilities/constants/images';
import navigationRoutes from '../../../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../../../utilities/navigationService';

import { styles } from './styles';

interface ProfileSettingsCardProps {
  label: string
  source: any
  screen: string
  data?: any
  onPress?: () => void
}

const ProfileSettingsCard: React.FC<ProfileSettingsCardProps> = ({
  label,
  source,
  data,
  screen,
  onPress
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { t } = useTranslation();

  const handlePress = () => {
    setIsClicked(!isClicked);
    switch (screen) {
      case 'UploadDocs':
        navigate(navigationRoutes.UPLOAD_DOCS);
        break;
      case 'PrivacyPolicy':
        navigate(navigationRoutes.PRIVACY_POLICY);
        break;
      default:
        break;
    }

    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={handlePress}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image source={source} style={styles.icon1} />
          <Heading3 style={styles.text}>{label}</Heading3>
        </View>
        {isClicked &&
          screen !== 'UploadDocs' &&
          screen !== 'PrivacyPolicy' && (
            <Image source={down} style={styles.icon2} />
          )}
      </View>

      {isClicked && data && screen === 'ProfileDetails' && (
        <View style={styles.detailBox}>
          <Body2 style={styles.detailText}>
            {`${t('gender')}: ${data.gender || 'N/A'}`}
          </Body2>
          <Body2 style={styles.detailText}>
            {`${t('email')}: ${data.email || 'N/A'}`}
          </Body2>
          <Body2 style={styles.detailText}>
            {`${t('phone')}: ${data.phone || 'N/A'}`}
          </Body2>
        </View>
      )}

      {isClicked && screen === 'ContactUs' && (
        <View style={styles.detailBox}>
          <Body2 style={styles.detailText}>{t('emailAddress')}</Body2>
        </View>
      )}
    </Pressable>
  );
};

export default ProfileSettingsCard;
