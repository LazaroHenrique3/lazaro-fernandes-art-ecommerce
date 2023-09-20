import * as yup from 'yup'
import { FormHandles } from '@unform/core'

import { IVFormErrors } from '../../../../shared/forms'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//EmailJS
import emailJs from '@emailjs/browser'

import {
    IFormData,
    formatValidationSchema
} from '../validation/Schema'

interface IUseSendEmailContact {
    setIsLoading: (status: boolean) => void
    formRef: React.RefObject<FormHandles>
}


export const UseSendEmailContact = ({ setIsLoading, formRef }: IUseSendEmailContact) => {

    const sendEmail = async ( emailData: IFormData ) => {
        try {
            const validateData = await formatValidationSchema.validate(emailData, { abortEarly: false })

            const templateParams = {
                from_name: validateData.name,
                message: validateData.message,
                email: validateData.email
            }


            if (process.env.REACT_APP_EMAIL_CONTACT_SERVICE_ID && process.env.REACT_APP_EMAIL_CONTACT_TEMPLATE_ID && process.env.REACT_APP_EMAIL_CONTACT_PUBLIC_KEY) {
                setIsLoading(true)

                const result = await emailJs.send(
                    process.env.REACT_APP_EMAIL_CONTACT_SERVICE_ID,
                    process.env.REACT_APP_EMAIL_CONTACT_TEMPLATE_ID,
                    templateParams, process.env.REACT_APP_EMAIL_CONTACT_PUBLIC_KEY)

                setIsLoading(false)

                if (result.status === 400) {
                    toast.error('Houve um erro, tente novamente mais tarde!')
                    return
                }

                toast.success('Email enviado com sucesso!')

            } else {
                console.error('Alguma(s) variável(eis) do .env está(ão) indefinida(s).')
                toast.error('Houve um erro, tente novamente mais tarde!')
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

    return { sendEmail }

}