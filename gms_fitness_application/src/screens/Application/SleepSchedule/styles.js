import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: scale(10),
  },
  container: {
    flex: 1,
    marginHorizontal: scale(10),
  },
  header: {
    marginTop: scale(10),
    marginHorizontal: scale(10),
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: scale(16),
  },
});
