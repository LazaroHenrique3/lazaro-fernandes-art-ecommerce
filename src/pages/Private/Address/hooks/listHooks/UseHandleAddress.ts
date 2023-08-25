import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAuthContext } from '../../../../../shared/contexts'

import { 
    AddressService, 
    IListAddress 
} from '../../../../../shared/services/api/address/AddressService'

interface IUseHandleAddressProps {
    setRows: (addresss: IListAddress[]) => void
    rows:  IListAddress[]
    search: string
}

export const UseHandleAddress = ({ setRows, rows }: IUseHandleAddressProps) => {
    const { idUser } = useAuthContext()

    const handleDelete = async (id: number) => {
        if (!idUser) return

        if (confirm('Realmente deseja apagar esse endereço?')) {
            const result = await AddressService.deleteById(idUser, id)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const newRows = rows.filter(row => row.id !== id)

            setRows(newRows)
            toast.success('Registro apagado com sucesso!')
        }
    }

    return { handleDelete }
}

