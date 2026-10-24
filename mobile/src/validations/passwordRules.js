import * as yup from 'yup'

const symbolRegex = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/;']/

export const passwordRequirements = [
    {
        key: 'length',
        label: 'Mínimo de 8 caracteres',
        message: 'A senha deve conter no mínimo 8 caracteres.',
        test: (value) => value.length >= 8,
    },
    {
        key: 'uppercase',
        label: 'Uma letra maiúscula',
        message: 'A senha deve conter pelo menos uma letra maiúscula.',
        test: (value) => /[A-Z]/.test(value),
    },
    {
        key: 'lowercase',
        label: 'Uma letra minúscula',
        message: 'A senha deve conter pelo menos uma letra minúscula.',
        test: (value) => /[a-z]/.test(value),
    },
    {
        key: 'number',
        label: 'Um número',
        message: 'A senha deve conter pelo menos um número.',
        test: (value) => /[0-9]/.test(value),
    },
    {
        key: 'symbol',
        label: 'Um símbolo (! @ # $ % & *)',
        message: 'A senha deve conter pelo menos um símbolo.',
        test: (value) => symbolRegex.test(value),
    },
]

export const passwordRules = passwordRequirements.reduce(
    (schema, req) => schema.test(req.key, req.message, (value) => !value || req.test(value)),
    yup.string().required('Informe sua senha.')
)