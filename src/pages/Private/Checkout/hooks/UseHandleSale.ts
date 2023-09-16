import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useNavigate } from 'react-router-dom'

import {
    useCartContext,
    useAuthContext
} from '../../../../shared/contexts'

import {
    ISaleItems,
    IDetailSale,
    TSalePaymentMethods,
    TSaleShippingMethods,
    SaleService
} from '../../../../shared/services/api/sales/SaleService'

interface IUseCalculateShippingProps {
    setIsLoading: (status: boolean) => void
}

export const UseHandleSale = ({ setIsLoading }: IUseCalculateShippingProps) => {

    const { idUser } = useAuthContext()
    const { productsInCart, resetCart } = useCartContext()

    const navigate = useNavigate()

    const handleSave = async (
        selectedAddress: number,
        selectedPaymentMethod: string,
        selectedShippingMethod: string,
        estimatedDeliveryDate: string,
        selectedShippingPrice: number
    ) => {
        if (!idUser) return

        if (!confirm('Confirma todas as informações?')) return

        try {
            const saleItems: ISaleItems[] = productsInCart.map((product) => ({
                idProduct: product.id,
                quantity: product.quantitySelected
            }))

            const formattedSaleInfo: Omit<IDetailSale, 'id' | 'status' | 'order_date' | 'payment_due_date' | 'payment_received_date' | 'delivery_date' | 'customer_id' | 'address_id'> = {
                estimated_delivery_date: estimatedDeliveryDate,
                payment_method: selectedPaymentMethod as TSalePaymentMethods,
                shipping_method: selectedShippingMethod as TSaleShippingMethods,
                shipping_cost: selectedShippingPrice,
                sale_items: saleItems
            }

            setIsLoading(true)

            const result = await SaleService.create(idUser, selectedAddress, formattedSaleInfo)
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
            } else {
                toast.success('Pedido realizado com sucesso!')
                resetCart()
                navigate('/customer/orders')
            }

        } catch (error) {
            console.error(error)
            toast.error('Houve um erro ao finalizar pedido!')
        }
    }

    return { handleSave }

}



