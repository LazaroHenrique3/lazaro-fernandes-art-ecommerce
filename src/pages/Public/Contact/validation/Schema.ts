import * as yup from 'yup'

export interface IFormData {
    name: string
    email: string
    message: string
}

//Definindo o schema para validação
export const formatValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email inválido!').required('Campo obrigatório!'),
    message: yup.string().required('Campo obrigatório!'),
})

