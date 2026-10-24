import { Button } from '@/components/Button'
import { FormField } from '@/components/FormField'
import { PasswordChecklist } from '@/components/PasswordChecklist'
import { ScreenBackground } from '@/components/ScreenBackground'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useRouter } from "expo-router"
import * as SplashScreen from 'expo-splash-screen'
import { useForm, useWatch } from 'react-hook-form'
import { Alert, StyleSheet, Text, View } from "react-native"
import { schema } from '../validations/newpassword'

SplashScreen.preventAutoHideAsync()

type NewPasswordData = {
    password: string
    confirmPassword: string
}

export default function NewPassword() {
    const router = useRouter()

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<NewPasswordData>({
        resolver: yupResolver(schema),
        defaultValues: { password: '', confirmPassword: '' },
    })

    const password = useWatch({ control, name: 'password' })

    function handleNewPassword(data: NewPasswordData) {
        console.log('Dados validados:', data)

        Alert.alert('Senha alterada', 'Sua senha foi redefinida com sucesso.', [
            { text: 'Fazer login', onPress: () => router.replace('/') },
        ])
    }
    return (
        <ScreenBackground title="Nova senha" subtitle="Crie uma nova senha.">
            <View style={styles.form}>
                <FormField
                    control={control}
                    name="password"
                    label="NOVA SENHA"
                    icon="lock-outline"
                    secureTextEntry
                    autoCapitalize="none"
                />
                <PasswordChecklist password={password} />

                <FormField
                    control={control}
                    name="confirmPassword"
                    label="CONFIRMAR SENHA"
                    icon="lock-outline"
                    secureTextEntry
                    autoCapitalize="none"
                />
                <Button title="SALVAR" onPress={handleSubmit(handleNewPassword)} loading={isSubmitting} />
            </View>

            <Text style={styles.footerText}>
                <Link href="/" style={styles.footerLink}>Voltar ao login.</Link>
            </Text>
        </ScreenBackground>
    )
}

const styles = StyleSheet.create({
    form: {
        width: "100%",
        gap: 12,
        marginBottom: 100,
    },

    footerText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Geist-Bold',
        marginBottom: 40,
    },

    footerLink: {
        color: "#4BF1A3",
        fontWeight: "700",
        textDecorationLine: 'underline',
    }
})