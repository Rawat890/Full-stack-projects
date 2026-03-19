import React from 'react';
import { View } from 'react-native';

import { Other } from '../TextComponents';
import { styles } from './styles';

type CustomToastProps = {
  text1?: string;
  text2?: string; 
  type: 'success' | 'error' | 'go';
};

const CustomToast: React.FC<CustomToastProps> = ({ text1, text2, type }) => {
  const isError = type === 'error';

  let emoji: string;
  if (type === 'error') {
    emoji = '❌';
  } else if (type === 'success') {
    emoji = '✅';
  } else {
    emoji = 'ᯓ🏃🏻‍♀️‍➡️';
  }

  return (
    <View style={[styles.toastContainer, isError ? styles.error : styles.success]}>
      <Other style={{}}>{emoji}</Other>
      <View style={styles.textContainer}>
        <Other style={styles.title}>{text1}</Other>
        {text2 ? <Other style={styles.description}>{text2}</Other> : null}
      </View>
    </View>
  );
};

type NotificationProps = Omit<CustomToastProps, 'type'>;

export const Notification = {
  success: (props: NotificationProps) => <CustomToast {...props} type="success" />,
  error: (props: NotificationProps) => <CustomToast {...props} type="error" />,
  go: (props: NotificationProps) => <CustomToast {...props} type="go" />,
};
