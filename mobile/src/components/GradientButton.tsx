import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export function GradientButton({ title, onPress, loading }: { title: string; onPress: () => void; loading?: boolean }) {
  return <Pressable onPress={onPress} disabled={loading} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
    <LinearGradient colors={[colors.blue, '#159F8C', colors.green]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.button}>
      {loading ? <ActivityIndicator color="white" /> : <Text style={styles.text}>{title}</Text>}
    </LinearGradient>
  </Pressable>;
}
const styles = StyleSheet.create({
  pressable: { alignSelf: 'center', width: 200, borderRadius: 30, marginTop: 22 },
  pressed: { opacity: 0.78 },
  button: { height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30 },
  text: { color: 'white', fontSize: 18, fontWeight: '800' },
});
