import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { passwordRequirements } from '../validations/passwordRules'

type PasswordChecklistProps = {
    password: string
}

export function PasswordChecklist({ password }: PasswordChecklistProps) {
    return (
        <View style={styles.container}>
            {passwordRequirements.map((req) => {
                const ok = req.test(password ?? '')

                return (
                    <View key={req.key} style={styles.row}>
                        <MaterialIcons
                            name={ok ? 'check-circle' : 'radio-button-unchecked'}
                            size={16}
                            color={ok ? '#4BF1A3' : '#9494B8'}
                        />
                        <Text style={[styles.text, ok && styles.textOk]}>{req.label}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 6,
        paddingHorizontal: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        color: '#9494B8',
        fontSize: 12,
        fontFamily: 'Geist-Regular',
    },
    textOk: {
        color: '#4BF1A3',
    },
})