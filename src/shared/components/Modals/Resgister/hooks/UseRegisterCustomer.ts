import * as yup from 'yup'
import { FormHandles } from '@unform/core'

import { IVFormErrors } from '../../../../forms'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CustomerService } from '../../../../services/api/customer/CustomerService'

import {
    IFormData,
    formatValidationSchema
} from '../validation/Schema'

interface IUseHandleProduct {
    setIsLoading: (status: boolean) => void
    setOpen: (opens: boolean) => void
    formRef: React.RefObject<FormHandles>
}

export const UseRegisterCustomer = ({ setIsLoading, setOpen, formRef }: IUseHandleProduct) => {
    const handleSave = async (data: IFormData) => {

        try {

            const cell_phone = data.cell_phone.replace(/[^\w]/g, '')
            const cpf = data.cpf.replace(/[^\w]/g, '')

            const validateData: IFormData = await formatValidationSchema.validate({ ...data, cell_phone, cpf}, { abortEarly: false })

            setIsLoading(true)

            const formData = new FormData()
            formData.append('status', validateData.status)
            formData.append('name', validateData.name)
            formData.append('email', validateData.email)
            formData.append('password', String(validateData.password))
            formData.append('confirmPassword', String(validateData.confirmPassword))
            formData.append('cell_phone', String(validateData.cell_phone))
            formData.append('genre', String(validateData.genre))
            formData.append('date_of_birth', String(validateData.date_of_birth))
            formData.append('cpf', String(validateData.cpf))

            //Verificando se foi passado imagem
            if ('image' in validateData && validateData.image !== undefined) {
                const [ formattedImage ] = validateData.image
                formData.append('image', formattedImage)
            }

            const result = await CustomerService.create(formData)

            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
            } else {
                toast.success('Registro salvo com sucesso!')
                setOpen(false)
            }

        } catch (errors) {

            const errorsYup: yup.ValidationError = errors as yup.ValidationError

            const validationErrors: IVFormErrors = {}

            errorsYup.inner.forEach(error => {
                if (!error.path) return

                validationErrors[error.path] = error.message
                formRef.current?.setErrors(validationErrors)
            })
        }
    }

    return { handleSave }
}