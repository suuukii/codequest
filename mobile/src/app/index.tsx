import { Button } from '@/components/Button'
import { FormField } from '@/components/FormField'
import { ScreenBackground } from '@/components/ScreenBackground'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from "expo-router"
import * as SplashScreen from 'expo-splash-screen'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from "react-native"
import { schema } from '../validations/index'

SplashScreen.preventAutoHideAsync();

type LoginData = {
    username: string
    password: string
}

export default function Index() {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginData>({
        resolver: yupResolver(schema),
        defaultValues: { username: '', password: '' },
    })

    async function handleLogin(data: LoginData) {
        console.log('Dados validados:', data)
    }
    return (
        <ScreenBackground title="CodeQuest" subtitle="Eleve suas habilidades em programação.">
            <View style={styles.form}>
                <FormField
                    control={control}
                    name="username"
                    label="NICKNAME OU EMAIL"
                    icon="person-outline"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <FormField
                    control={control}
                    name="password"
                    label="SENHA"
                    icon="lock-outline"
                    secureTextEntry
                    autoCapitalize="none"
                />

                <Link href="/forgotpassword" style={styles.forgotPassword}>
                    Esqueci minha senha
                </Link>

                <Button
                    title="LOGIN"
                    onPress={handleSubmit(handleLogin)}
                    loading={isSubmitting}
                />
            </View>

            <Text style={styles.footerText}>
                Não tem uma conta? <Link href="/signup" style={styles.footerLink}>Registre-se.</Link>
            </Text>
        </ScreenBackground>
    )
}

const styles = StyleSheet.create({
    form: {
        width: '100%',
        gap: 15,
        marginBottom: 100,
    },

    forgotPassword: {
        color: '#8B5CF6',
        textAlign: 'right',
        fontSize: 12,
        marginBottom: 8,
        fontFamily: 'Geist-Bold',
    },

    footerText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Geist-Bold',
        marginBottom: 40,
    },

    footerLink: {
        color: '#4BF1A3',
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
})