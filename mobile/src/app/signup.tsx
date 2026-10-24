import { Button } from '@/components/Button'
import { FormField } from '@/components/FormField'
import { PasswordChecklist } from '@/components/PasswordChecklist'
import { ScreenBackground } from '@/components/ScreenBackground'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from "expo-router"
import * as SplashScreen from 'expo-splash-screen'
import { useForm, useWatch } from 'react-hook-form'
import { StyleSheet, Text, View } from "react-native"
import { schema } from '../validations/signup'

SplashScreen.preventAutoHideAsync();

type SignUpData = {
    username: string
    email: string
    nickname: string
    password: string
}

export default function SignUp() {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<SignUpData>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
        defaultValues: { username: '', email: '', nickname: '', password: '',
        }
    })

    const password = useWatch({ control, name: 'password' })

    function handleSignUp(data: SignUpData) {
        console.log('Dados validados:', data)
    }
    return (
        <ScreenBackground title="CodeQuest" subtitle="Eleve suas habilidades em programação.">
            <View style={styles.form}>
                <FormField
                    control={control}
                    name="username"
                    label="NOME *"
                    icon="person-outline"
                    autoCapitalize="words"
                />

                <FormField
                    control={control}
                    name="email"
                    label="E-MAIL *"
                    icon="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <FormField
                    control={control}
                    name="nickname"
                    label="NICKNAME *"
                    icon="person-outline"
                    autoCapitalize="none"
                />

                <FormField
                    control={control}
                    name="password"
                    label="SENHA *"
                    icon="lock-outline"
                    secureTextEntry
                    autoCapitalize="none"
                />

                <PasswordChecklist password={password} />
                <Button title="CADASTRAR" width="65%" onPress={handleSubmit(handleSignUp)} loading={isSubmitting} />
            </View>

            <Text style={styles.footerText}>
                Já possui uma conta? <Link href="/" style={styles.footerLink}>Faça o login.</Link>
            </Text>
        </ScreenBackground>
    )
}

const styles = StyleSheet.create({
    form: {
        width: "100%",
        gap: 15,
        marginBottom: 70,
    },

    footerText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Geist-Bold',
        paddingBottom: 50,
    },

    footerLink: {
        color: "#4BF1A3",
        fontWeight: "700",
        textDecorationLine: 'underline',
    }
})