import { Button } from '@/components/Button'
import { FormField } from '@/components/FormField'
import { ScreenBackground } from '@/components/ScreenBackground'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useRouter } from "expo-router"
import * as SplashScreen from 'expo-splash-screen'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, View } from "react-native"
import { schema } from '../validations/forgotpassword'

SplashScreen.preventAutoHideAsync();

type ForgotPasswordData = {
    email: string
}

export default function ForgotPassword() {
    const router = useRouter()

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<ForgotPasswordData>({
        resolver: yupResolver(schema),
        defaultValues: { email: '' }
    })

    function handleForgotPassword(data: ForgotPasswordData) {
        console.log('Dados validados:', data)
        Alert.alert(
            'E-mail enviado!',
            'Se este e-mail estiver cadastrado, você receberá as instruções para redefinir a senha.',
            [{ text: 'OK', onPress: () => router.push('/newpassword') }]
        )
    }
    return (
        <ScreenBackground
            title="Recuperar senha"
            subtitle="Informe seu e-mail e enviaremos as instruções para redefinir sua senha."
        >
            <View style={styles.form}>
                <FormField
                    control={control}
                    name="email"
                    label="E-MAIL"
                    icon="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button title="ENVIAR" onPress={handleSubmit(handleForgotPassword)} loading={isSubmitting} />
            </View>

            <Text style={styles.footerText}>
                Lembrou a senha? <Link href="/" style={styles.footerLink}>Voltar ao login.</Link>
            </Text>
        </ScreenBackground>

    )
}

const styles = StyleSheet.create({
    form: {
        width: "100%",
        gap: 12,
        marginBottom: 180,
    },

    footerText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Geist-Bold',
    },

    footerLink: {
        color: "#4BF1A3",
        fontWeight: "700",
        textDecorationLine: 'underline',
    }
})