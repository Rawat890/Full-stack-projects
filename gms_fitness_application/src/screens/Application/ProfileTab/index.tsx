import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { Heading2, Other } from '../../../components/TextComponents';
import { colors } from '../../../utilities/constants/colors';
import { female, profile_tab, message, shield, threeDots, male } from '../../../utilities/constants/images';
import { calculateAge } from '../../../utilities/helper/calculation';

import LogoutButton from './components/LogoutButton';
import ProfileSettingsCard from './components/ProfileSettingsCard';
import UserInformationCard from './components/UserInformationCard';
import { styles } from './styles';

interface UserData {
  gender?: string
  fullName?: string
  goal?: string
  height?: number
  weight?: number
  dob?: string
}

interface RootState {
  user: {
    userData?: UserData
  }
}

const ProfileTab = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const [loading] = useState<boolean>(false);
  const { t } = useTranslation();

  if (!userData || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.black1} />
      </View>
    );
  }

  const isMale = userData.gender === 'Male' ? male : female;

  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading2 style={styles.headerText}>{t('profileWord')}</Heading2>
          <Image source={threeDots} style={styles.dots} />
        </View>

        <View style={styles.profileView}>
          <View style={styles.innerView1}>
            <Image source={isMale} style={styles.image} resizeMode="contain" />
            <View style={styles.user}>
              <Other style={styles.userName}>{userData.fullName}</Other>
              <Other style={styles.userProgram}>{`${userData.goal} ${t('program')}`}</Other>
            </View>
          </View>

          <View style={styles.innerView2}>
            <UserInformationCard
              label={t('height')}
              info={`${userData.height ? Math.round(userData.height) : 'N/A'} cm`}
            />
            <UserInformationCard
              label={t('weight')}
              info={`${userData.weight ? Math.round(userData.weight) : 'N/A'} kg`}
            />
            <UserInformationCard
              label={t('age')}
              info={`${calculateAge(userData.dob)} yo`}
            />
          </View>
        </View>

        <View style={styles.menuSection}>
          <ProfileSettingsCard
            label={t('personalDetails')}
            source={profile_tab}
            data={userData}
            screen="ProfileDetails"
          />
          <ProfileSettingsCard
            label={t('contactUs')}
            source={message}
            screen="ContactUs"
          />
          <ProfileSettingsCard
            label={t('privacyPolicyText')}
            screen="PrivacyPolicy"
            source={shield}
          />
          <ProfileSettingsCard
            label={t('uploadDocs')}
            screen="UploadDocs"
            source={shield}
          />
        </View>

        <LogoutButton />
      </View>
    </ScrollView>
  );
};

export default ProfileTab;

