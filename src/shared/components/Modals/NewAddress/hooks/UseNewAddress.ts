import * as yup from 'yup'
import { FormHandles } from '@unform/core'

import { IVFormErrors } from '../../../../forms'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getInfoByCep } from '../../../../services/external/viaCep/GetInfoByCep'
import { 
    AddressService, 
    IListAddress 
} from '../../../../services/api/address/AddressService'
import { useAuthContext } from '../../../../contexts'

import {
    IFormData,
    formatValidationSchema
} from '../validation/Schema'

interface IUseHandleProduct {
    setIsLoading: (status: boolean) => void
    setOpen: (opens: boolean) => void
    addresses: IListAddress[]
    updateAddressesList: (newAddressesList: IListAddress[]) => void
    formRef: React.RefObject<FormHandles>
}

export const UseNewAddress = ({ setIsLoading, setOpen, addresses, updateAddressesList, formRef }: IUseHandleProduct) => {
    const { idUser } = useAuthContext()

    const handleGetInfoByCep = async (cep: string) => {

        try {
            setIsLoading(true)

            const cepFormatted = cep.replace(/[^\w]/g, '')
            const result = await getInfoByCep(cepFormatted)

            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            formRef.current?.setData({
                cep: result.cep,
                city: result.localidade,
                state: result.uf,
                complement: result.complemento,
                neighborhood: result.bairro,
                street: result.logradouro
            })

        } catch (error) {
            console.error(error)
            toast.error('Houve um erro ao consultar cep!')
        }

    }

    const handleSave = async (data: IFormData) => {
        if (!idUser) return

        try {
            const cep = data.cep.replace(/[^\w]/g, '')
            const validateData = await formatValidationSchema.validate({ ...data, cep: cep }, { abortEarly: false })

            setIsLoading(true)

            const result = await AddressService.create(idUser, validateData)
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
            } else {                
                //Formatando o novo objeto de Address
                const newAddress: IListAddress = {
                    id: result,
                    status: validateData.status,
                    city: validateData.city,
                    state: validateData.state,
                    number: validateData.number,
                    cep: validateData.cep,
                    complement: validateData.complement,
                    neighborhood: validateData.neighborhood,
                    street: validateData.street,
                    customer_id: idUser
                }

                //Objeto atualizado com o novo endereço
                const updatedAddresses = [...addresses, newAddress]

                //Setando no state global la do Stepper de seleção de Address
                updateAddressesList(updatedAddresses)

                toast.success('Registro salvo com sucesso!')

                //Fechando o modal
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

    return { handleGetInfoByCep, handleSave }
}