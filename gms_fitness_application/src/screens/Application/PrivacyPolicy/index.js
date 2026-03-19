import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { styles } from './styles';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://www.google.com' }} />
    </View>
  );
};

export default PrivacyPolicy;
