import * as yup from 'yup'

export interface IFormData {
    cep: string
}

//Definindo o schema para validação
export const formatValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    cep: yup.string().length(8).required()
})