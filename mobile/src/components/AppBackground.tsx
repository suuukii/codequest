import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

export function AppBackground({ children }: PropsWithChildren) {
  return (
    <View style={styles.page}>
      <LinearGradient colors={['transparent', '#063927', 'transparent']} style={styles.topGlow} />
      <LinearGradient colors={['transparent', '#16455D']} style={styles.bottomGlow} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },
  topGlow: { position: 'absolute', top: -70, left: 0, right: 0, height: 290, opacity: 0.8 },
  bottomGlow: { position: 'absolute', bottom: -70, left: 0, right: 0, height: 260, opacity: 0.95 },
});
