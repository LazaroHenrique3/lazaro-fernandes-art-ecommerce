import * as yup from 'yup'

import { cpf } from 'cpf-cnpj-validator'
import { formattedDateBR } from '../../../../shared/util'

export interface IFormData {
    status: 'Ativo' | 'Inativo'
    image?: FileList
    name: string
    email: string
    cell_phone: string
    genre: 'M' | 'F' | 'L' | 'N'
    date_of_birth: Date | string
    cpf: string
}

export interface IFormDataUpdate {
    status: 'Ativo' | 'Inativo'
    name: string
    email: string
    password: string
    confirmPassword: string
    cell_phone: string
    genre: 'M' | 'F' | 'L' | 'N'
    date_of_birth: Date | string
    cpf: string
}

export const formatValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    status: yup.string().oneOf(['Ativo', 'Inativo']).default('Ativo').required(),
    name: yup.string().required().min(3).max(100),
    email: yup.string().email().min(5).max(100).matches(/^[\w!#$%&'*+/=?`{|}~.-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Ex: exemplo@dominio.com').required(),
    cell_phone: yup.string().length(11).matches(/^\d{11}$/, 'Deve corresponder ao padrão: (44) 99999-9999').required(),
    genre: yup.string().length(1).oneOf(['M', 'F', 'L', 'N']).required(),
    date_of_birth: yup.date()
        .transform((currentValue, originalValue) => {
            if (originalValue && typeof originalValue === 'string') {
                const date = new Date(originalValue).toISOString().split('T')[0]

                const [year, month, day] = date.split('-')
                return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
            }
            return currentValue
        })
        .test('dateTest', value => {

            if (!value) {
                throw new yup.ValidationError('Este campo é obrigatório!', value, 'date_of_birth')
            }

            //Verificando se é de maior
            const currentDate = new Date()
            const eighteenYearsAgo = new Date(
                currentDate.getFullYear() - 18,
                currentDate.getMonth(),
                currentDate.getDate()
            )

            //Idade máxima de 100 anos
            const oneHundredYearsAgo = new Date(
                currentDate.getFullYear() - 100,
                currentDate.getMonth(),
                currentDate.getDate()
            )

            const customerBirth = new Date(value)
            if (!(customerBirth < eighteenYearsAgo)) {
                throw new yup.ValidationError('O usuário deve ter mais de 18 anos!', value, 'date_of_birth')
            }

            //Verificando se a data é maior que hoje
            if (!(customerBirth <= currentDate)) {
                throw new yup.ValidationError('A data não pode ser maior que a data atual!', value, 'date_of_birth')
            }

            //Verificando se o usuário tem até 100 anos
            if (customerBirth < oneHundredYearsAgo) {
                throw new yup.ValidationError(`Data de nascimento máxima: ${formattedDateBR(oneHundredYearsAgo)}`, value, 'date_of_birth')
            }

            return true
        })
        .required(),
    cpf: yup.string().test('valid-cpf', 'CPF inválido', function (value) {
        if (!value) {
            return false
        }

        return cpf.isValid(value)
    }).required(),
})

//Definindo o schema para validação de atualização
export const formatValidationSchemaUpdate: yup.Schema<IFormDataUpdate> = yup.object().shape({
    status: yup.string().oneOf(['Ativo', 'Inativo']).default('Ativo').required(),
    name: yup.string().required().min(3).max(100),
    email: yup.string().email().min(5).max(100).matches(/^[\w!#$%&'*+/=?`{|}~.-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Ex: exemplo@dominio.com').required(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required(),
    cell_phone: yup.string().length(11).matches(/^\d{11}$/, 'Deve corresponder ao padrão: (44) 99999-9999').required(),
    genre: yup.string().length(1).oneOf(['M', 'F', 'L', 'N']).required(),
    date_of_birth: yup.date()
        .transform((currentValue, originalValue) => {
            if (originalValue && typeof originalValue === 'string') {
                const date = new Date(originalValue).toISOString().split('T')[0]

                const [year, month, day] = date.split('-')
                return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
            }
            return currentValue
        })
        .test('dateTest', value => {

            if (!value) {
                throw new yup.ValidationError('Este campo é obrigatório!', value, 'date_of_birth')
            }

            //Verificando se é de maior
            const currentDate = new Date()
            const eighteenYearsAgo = new Date(
                currentDate.getFullYear() - 18,
                currentDate.getMonth(),
                currentDate.getDate()
            )

            const customerBirth = new Date(value)
            if (!(customerBirth < eighteenYearsAgo)) {
                throw new yup.ValidationError('O usuário deve ter mais de 18 anos!', value, 'date_of_birth')
            }

            //Verificando se a data é maior que hoje
            if (!(customerBirth <= currentDate)) {
                throw new yup.ValidationError('A data não pode ser maior que a data atual!', value, 'date_of_birth')
            }

            return true
        })
        .required(),
    cpf: yup.string().test('valid-cpf', 'CPF inválido', function (value) {
        if (!value) {
            return false
        }

        return cpf.isValid(value)
    }).required(),
}) 