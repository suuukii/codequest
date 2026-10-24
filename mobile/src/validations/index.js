import * as yup from 'yup'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/

export const schema = yup.object({
    username: yup.string().trim().required('Informe seu nickname ou e-mail.').test('email-ou-nickname', 'E-mail inválido.', (value) => {
        if (!value) return true
        return value.includes('@') ? emailRegex.test(value) : true
    }),
    password: yup.string().required('Informe sua senha.'),
})