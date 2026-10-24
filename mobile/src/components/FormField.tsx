import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'

type FormFieldProps<T extends FieldValues> = Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> & {
    control: Control<T>
    name: Path<T>
    label: string
    icon: keyof typeof MaterialIcons.glyphMap
}

export function FormField<T extends FieldValues>({
    control,
    name,
    label,
    icon,
    secureTextEntry,
    ...inputProps
}: FormFieldProps<T>) {
    const [hidden, setHidden] = useState(!!secureTextEntry)

    const {
        field: { value, onChange, onBlur },
        fieldState: { error },
    } = useController({ control, name })

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>

            <View style={[styles.inputContainer, error && styles.inputError]}>
                <MaterialIcons name={icon} size={20} color="#9494B8" style={styles.icon} />

                <TextInput
                    {...inputProps}
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={hidden}
                />

                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setHidden(!hidden)}>
                        <MaterialIcons
                            name={hidden ? 'visibility-off' : 'visibility'}
                            size={20}
                            color="#9494B8"
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.labelError}>{error.message}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        width: '100%',
        gap: 8,
    },
    label: {
        color: '#8B5CF6',
        fontSize: 12,
        fontFamily: 'Geist-Bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#11111E',
        borderWidth: 1,
        borderColor: '#222235',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 60,
    },
    inputError: {
        borderColor: '#ff375b',
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    labelError: {
        color: '#ff375b',
        fontSize: 12,
        fontFamily: 'Geist-Regular',
    },
})