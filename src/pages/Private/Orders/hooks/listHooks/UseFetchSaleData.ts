import { useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAuthContext } from '../../../../../shared/contexts'
import { useDebounce } from '../../../../../shared/hooks'

import {
    SaleService,
    ISaleListAll,
    TSaleStatus
} from '../../../../../shared/services/api/sales/SaleService'

interface IUseFetchSaleDataProps {
    setIsLoading: (status: boolean) => void
    setRows: (sales: ISaleListAll[]) => void
    setTotalCount: (total: number) => void
    page: number
}

export const UseFetchSaleData = ({ setIsLoading, setRows, setTotalCount, page }: IUseFetchSaleDataProps) => {
    const { idUser } = useAuthContext()

    //Para adicionar delay na pesquisa
    const { debounce } = useDebounce()

    useEffect(() => {
        setIsLoading(true)

        const fetchData = () => {
            debounce(async () => {
                if (idUser) {
                    const result = await SaleService.getAll(page, '', idUser)
                    setIsLoading(false)

                    if (result instanceof Error) {
                        toast.error(result.message)
                        return
                    }

                    //Ordenar com base no status
                    const orderedResults = result.data.sort(compareByStatus)

                    setRows(orderedResults)
                    setTotalCount(result.totalCount)
                }
            })
        }

        fetchData()

    }, [page])
}

//Função resposável por comparar e ordenar os resultados
const compareByStatus = (a: ISaleListAll, b: ISaleListAll) => {
    const orderOfStatus: TSaleStatus[] = ['Ag. Pagamento', 'Em preparação', 'Enviado', 'Concluída', 'Cancelada']

    const indexA = orderOfStatus.indexOf(a.status)
    const indexB = orderOfStatus.indexOf(b.status)

    return indexA - indexB
}

