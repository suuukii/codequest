import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <View style={styles.mark}><MaterialCommunityIcons name="sword-cross" size={compact ? 28 : 50} color={colors.green} /></View>
      {!compact && <>
        <Text style={styles.title}>CodeQuest</Text>
        <Text style={styles.subtitle}>Eleve suas habilidades em programação.</Text>
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 33 },
  compact: { flexDirection: 'row', gap: 9, marginBottom: 0 },
  mark: { alignItems: 'center', justifyContent: 'center', width: 76, height: 76, borderRadius: 38, backgroundColor: '#0A2D27', borderWidth: 1, borderColor: '#1A6B55', marginBottom: 13 },
  title: { color: colors.text, fontSize: 31, fontWeight: '800', letterSpacing: -0.7 },
  subtitle: { marginTop: 3, color: colors.text, fontSize: 13 },
});
