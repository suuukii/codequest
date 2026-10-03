import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppBackground } from './src/components/AppBackground';
import { AuthInput } from './src/components/AuthInput';
import { Brand } from './src/components/Brand';
import { GradientButton } from './src/components/GradientButton';
import { authApi } from './src/services/api';
import { colors } from './src/theme';
import { Session } from './src/types';

type Screen = 'login' | 'register';
type FormErrors = Record<string, string>;
const SESSION_KEY = 'codequest.session';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync(SESSION_KEY)
      .then(value => value && setSession(JSON.parse(value) as Session))
      .catch(() => SecureStore.deleteItemAsync(SESSION_KEY))
      .finally(() => setLoadingSession(false));
  }, []);

  async function saveSession(nextSession: Session) {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    setSession(null);
    setScreen('login');
  }

  if (loadingSession) return <AppBackground />;
  if (session) return <Home session={session} onSignOut={signOut} />;
  return <AuthScreen mode={screen} onModeChange={setScreen} onAuthenticated={saveSession} />;
}

function AuthScreen({ mode, onModeChange, onAuthenticated }: {
  mode: Screen; onModeChange: (screen: Screen) => void; onAuthenticated: (session: Session) => Promise<void>;
}) {
  const isRegister = mode === 'register';
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function switchMode(next: Screen) {
    setErrors({});
    setPassword('');
    onModeChange(next);
  }

  function validate() {
    const next: FormErrors = {};
    if (isRegister && name.trim().length < 2) next.name = 'Informe seu nome.';
    const loginValue = isRegister ? nickname : nickname;
    if (!loginValue.trim()) next.login = isRegister ? 'Informe um nickname.' : 'Informe seu nome ou nickname.';
    if (isRegister && !/^[a-zA-Z0-9_]{3,40}$/.test(nickname)) next.login = 'Use 3+ letras, números ou _.';
    if (password.length < (isRegister ? 8 : 1)) next.password = isRegister ? 'Use ao menos 8 caracteres.' : 'Informe sua senha.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const newSession = isRegister
        ? await authApi.register(name.trim(), nickname.trim(), password)
        : await authApi.login(nickname.trim(), password);
      await onAuthenticated(newSession);
    } catch (error) {
      Alert.alert('Não foi possível continuar', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return <AppBackground>
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={[styles.content, !isRegister && styles.loginContent]} keyboardShouldPersistTaps="handled">
          {isRegister && <Brand />}
          <View style={styles.form}>
            {isRegister && <AuthInput label="NOME *" icon="user" value={name} onChangeText={setName} placeholder="Seu nome" autoCapitalize="words" error={errors.name} />}
            <AuthInput
              label={isRegister ? 'NICKNAME *' : 'NOME OU NICKNAME'} icon="user" value={nickname} onChangeText={setNickname}
              placeholder={isRegister ? 'ex.: ana_dev' : 'Como você entrou'} error={errors.login}
            />
            <AuthInput label="SENHA *" icon="lock" value={password} onChangeText={setPassword} placeholder="Sua senha" secureTextEntry error={errors.password} />
            <GradientButton title={isRegister ? 'CADASTRAR' : 'LOGIN'} onPress={submit} loading={submitting} />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{isRegister ? 'Já possui uma conta? ' : 'Ainda não tem uma conta? '}</Text>
            <Pressable onPress={() => switchMode(isRegister ? 'login' : 'register')}><Text style={styles.link}>{isRegister ? 'Faça o login.' : 'Registre-se.'}</Text></Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </AppBackground>;
}

function Home({ session, onSignOut }: { session: Session; onSignOut: () => Promise<void> }) {
  return <AppBackground>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.homeHeader}><Brand compact /><Pressable onPress={onSignOut}><Text style={styles.link}>Sair</Text></Pressable></View>
      <View style={styles.homeContent}>
        <Text style={styles.welcome}>Olá, {session.user.name}!</Text>
        <Text style={styles.homeDescription}>Sua jornada no CodeQuest está pronta para começar.</Text>
        <View style={styles.card}><Text style={styles.cardEyebrow}>AVENTUREIRO</Text><Text style={styles.cardName}>@{session.user.nickname}</Text><Text style={styles.cardText}>Autenticação concluída com sucesso.</Text></View>
      </View>
    </SafeAreaView>
  </AppBackground>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, safeArea: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 26, paddingTop: 76, paddingBottom: 50 },
  loginContent: { paddingTop: 225 }, form: { width: '100%' },
  switchRow: { marginTop: 'auto', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', paddingTop: 50 },
  switchText: { color: colors.text, fontSize: 16, fontWeight: '700' },
  link: { color: colors.green, fontSize: 16, fontWeight: '800', textDecorationLine: 'underline' },
  homeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16 },
  homeContent: { padding: 28, marginTop: 80 }, welcome: { color: colors.text, fontSize: 31, fontWeight: '800' },
  homeDescription: { color: colors.muted, fontSize: 16, marginTop: 8 }, card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 22, marginTop: 35 },
  cardEyebrow: { color: colors.purple, fontWeight: '800', fontSize: 12, letterSpacing: 1 }, cardName: { color: colors.text, fontSize: 22, fontWeight: '800', marginTop: 7 }, cardText: { color: colors.muted, marginTop: 15 },
});
