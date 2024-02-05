import { useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAuthContext } from '../../../../contexts'
import { useDebounce } from '../../../../hooks'

import { AddressService, IListAddress } from '../../../../services/api/address/AddressService'

interface IUseFetchAddressDataProps {
    setIsLoading: (status: boolean) => void
    setRows: (addresss: IListAddress[]) => void
    setTotalCount: (total: number) => void
    rows: IListAddress[]
    search: string
    page: number
}

export const UseFetchAddressData = ({ setIsLoading, setRows, setTotalCount, rows, search, page }: IUseFetchAddressDataProps) => {
    const { idUser } = useAuthContext()

    //Para adicionar delay na pesquisa
    const { debounce } = useDebounce()

    useEffect(() => {

        const fetchData = () => {
            debounce(async () => {
                if (idUser) {
                    setIsLoading(true)
                    const result = await AddressService.getAll(page, search, idUser, false)

                    setIsLoading(false)

                    if (result instanceof Error) {
                        toast.error(result.message)
                        return
                    }

                    setRows([...rows, ...result.data])
                    setTotalCount(result.totalCount)
                }
            })
        }

        fetchData()

    }, [search, page])
}

