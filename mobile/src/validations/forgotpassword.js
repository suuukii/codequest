import * as yup from 'yup'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/

export const schema = yup.object({
    email: yup.string().trim().lowercase().required('Informe seu e-mail.').matches(emailRegex, 'E-mail inválido.'),
})
