import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAuthContext } from '../../../../../shared/contexts'

import {
    SaleService,
    ISaleListAll,
    TSaleStatus
} from '../../../../../shared/services/api/sales/SaleService'

interface IUseHandleSaleProps {
    setRows: (sales: ISaleListAll[]) => void
    rows: ISaleListAll[]
}

export const UseHandleSale = ({ setRows, rows }: IUseHandleSaleProps) => {
    const { idUser } = useAuthContext()

    const handleCancelSale = async (idSale: number) => {
        if (!idUser) return

        if (confirm('Realmente deseja cancelar esse pedido?')) {
            const result = await SaleService.cancelSale(idUser, idSale)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            //Criar um novo array com o status atualizado
            const newRows = rows.map(row => {
                if (row.id === idSale) {
                    // Se o ID corresponder, atualize o status para "cancelada"
                    const newStatus: TSaleStatus = 'Cancelada'
                    return { ...row, status: newStatus }
                }
                return row
            })

            setRows(newRows)
            toast.success('Pedido cancelado com sucesso!')
        }
    }

    return { handleCancelSale }
}

