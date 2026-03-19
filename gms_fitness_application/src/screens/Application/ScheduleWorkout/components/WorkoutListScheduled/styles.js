import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    paddingBottom: scale(100),
  },
  list: {
    flex: 1,
  },
});
