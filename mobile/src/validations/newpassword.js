import * as yup from 'yup'
import { passwordRules } from '../validations/passwordRules'

export const schema = yup.object({
    password: passwordRules,
    confirmPassword: yup.string().required('Confirme a nova senha.').oneOf([yup.ref('password')], 'As senhas não coincidem.')
})