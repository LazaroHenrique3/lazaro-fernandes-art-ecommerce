import * as yup from 'yup'
import { FormHandles } from '@unform/core'

import { IVFormErrors } from '../../../../forms' 

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { 
    useAuthContext, 
    useNavBarContext 
} from '../../../../contexts' 

import {
    IFormData,
    formatValidationSchema,
} from '../validation/Schema'

interface IUseLoginAdmin {
    setIsLoading: (status: boolean) => void
    formRef: React.RefObject<FormHandles>
}

export const UseLoginCustomer = ({setIsLoading, formRef}: IUseLoginAdmin) => {
    const { login } = useAuthContext()
    const { handleCloseModalLogin } = useNavBarContext()

    const handleLogin = async (data: IFormData) => {
        try {
            const validateData = await formatValidationSchema.validate(data, { abortEarly: false })

            setIsLoading(true)

            const result = await login(validateData.email, validateData.password)
            setIsLoading(false)

            if (typeof result === 'string') {
                toast.error(result)
            } else {
                toast.success('Login realizado com sucesso!')
                handleCloseModalLogin()
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

    return { handleLogin }

}