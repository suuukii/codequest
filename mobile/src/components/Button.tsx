import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator, DimensionValue, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type GradientButtonProps = Omit<TouchableOpacityProps, 'style' | 'children'> & {
    title: string
    loading?: boolean
    width?: DimensionValue
}

export function Button({
    title,
    loading = false,
    width = '60%',
    disabled,
    ...touchProps
}: GradientButtonProps) {
    const isDisabled = disabled || loading

    return (
        <LinearGradient
            colors={['#356C93', '#00FF66']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.gradient, { width }, isDisabled && styles.disabled]}
        >
            <TouchableOpacity
                {...touchProps}
                style={styles.touch}
                disabled={isDisabled}
                activeOpacity={0.8}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.text}>{title}</Text>
                )}
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        alignSelf: 'center',
        borderRadius: 50,
        height: 60,
        marginTop: 12,
    },
    disabled: {
        opacity: 0.6,
    },
    touch: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 1,
        fontFamily: 'ZalandoSansExpanded',
    },
})