import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Screen({ children, style }: ScreenProps) {
  return (
    <SafeAreaView style={[{ flex: 1 }, style]}>
      {children}
    </SafeAreaView>
  );
}