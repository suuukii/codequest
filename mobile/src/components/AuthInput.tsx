import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme';

type Props = TextInputProps & { label: string; icon: keyof typeof Feather.glyphMap; error?: string };

export function AuthInput({ label, icon, error, secureTextEntry, ...props }: Props) {
  const [hidden, setHidden] = useState(Boolean(secureTextEntry));
  return <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.field, Boolean(error) && styles.fieldError]}>
      <Feather name={icon} size={19} color={colors.muted} />
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#5E5B74"
        secureTextEntry={secureTextEntry ? hidden : false}
        autoCapitalize="none"
      />
      {secureTextEntry && <Pressable onPress={() => setHidden(value => !value)} hitSlop={10}>
        <Feather name={hidden ? 'eye-off' : 'eye'} size={20} color={colors.muted} />
      </Pressable>}
    </View>
    {!!error && <Text style={styles.error}>{error}</Text>}
  </View>;
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 15 },
  label: { color: colors.purple, fontSize: 12, fontWeight: '700', marginBottom: 8 },
  field: { height: 50, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 11 },
  fieldError: { borderColor: colors.danger },
  input: { flex: 1, height: '100%', color: colors.text, fontSize: 15 },
  error: { color: colors.danger, fontSize: 12, marginTop: 5 },
});
