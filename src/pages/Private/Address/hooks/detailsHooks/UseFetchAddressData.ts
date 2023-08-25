import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormHandles } from '@unform/core'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAuthContext } from '../../../../../shared/contexts'
import { AddressService } from '../../../../../shared/services/api/address/AddressService'

interface IUseFetchAddressDataProps {
    setIsLoading: (status: boolean) => void
    setName: (name: string) => void
    formRef: React.RefObject<FormHandles>
    id: string
}

export const UseFetchAddressData = ({ setIsLoading, setName, formRef, id }: IUseFetchAddressDataProps) => {
    const { idUser } = useAuthContext()

    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            if (!idUser) return
        
            if (id !== 'new') {
                setIsLoading(true)
                const result = await AddressService.getById(idUser, Number(id))

                setIsLoading(false)

                if (result instanceof Error) {
                    toast.error(result.message)
                    navigate('/customer/address')
                    return
                }

                setName(result.street)
                formRef.current?.setData(result)
            } else {
                formRef.current?.setData({
                    name: '',
                    city: '',
                    state: '',
                    number: '',
                    cep: '',
                    complement: '',
                    neighborhood: '',
                    street: ''
                })
            }

            return
        }

        fetchData()

    }, [id])

}



