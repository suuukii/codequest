import * as yup from 'yup'
import { passwordRules } from '../validations/passwordRules'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/

export const schema = yup.object({
    username: yup.string().required('Informe seu nome.'),
    email: yup.string().trim().lowercase().required('Informe seu e-mail.').matches(emailRegex, 'E-mail inválido.'),
    nickname: yup.string().min(3, 'O nickname deve conter no mínimo 3 caracteres.').required('Informe seu nickname.'),
    password: passwordRules,
})