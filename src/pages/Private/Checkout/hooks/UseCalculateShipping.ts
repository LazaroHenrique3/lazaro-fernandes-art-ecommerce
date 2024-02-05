import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { TProductCart, useCartContext  } from '../../../../shared/contexts'

import {
    ShippingService
} from '../../../.././shared/services/api/shipping/ShippingService'

interface IUseCalculateShippingProps {
    setCalculateShippingLoading: (status: boolean) => void
}

export const UseCalculateShipping = ({ setCalculateShippingLoading }: IUseCalculateShippingProps) => {
    const { productsInCart } = useCartContext()

    const calculateShipping = async (cep: string) => {
        try {
            const formattedCep = cep.replace(/[^\w]/g, '')
            setCalculateShippingLoading(true)

            const formattedRequest = {
                cep: formattedCep,
                weight: getTotalWeightInKilograms(productsInCart),
                width: getLargestWidth(productsInCart),
                length: getLargestLength(productsInCart),
                height: getTotalHeight(productsInCart)
            }

            const result = await ShippingService.calculateShipping(formattedRequest)
            setCalculateShippingLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            return result
        } catch (error) {
            toast.error('Houve um erro ao consultar o frete!')
            console.error(error)
        }
    }

    return { calculateShipping }

}

const getTotalWeightInKilograms = (productsInCart: TProductCart[]): number => {
    const productWeightInGrams = productsInCart.reduce((acc, product) => {
        return acc + (product.weight * product.quantitySelected)
    }, 0)

    // Convertendo de gramas para quilogramas (dividir por 1000)
    return productWeightInGrams / 1000
}

const getLargestWidth = (productsInCart: TProductCart[]): number => {
    return productsInCart.reduce((acc, product) => {
        const dimensions = product.dimension.split('x').map(Number)
        const width = dimensions[0]

        return Math.max(acc, width)
    }, 0)
}

const getLargestLength = (productsInCart: TProductCart[]): number => {
    return productsInCart.reduce((acc, product) => {
        const dimensions = product.dimension.split('x').map(Number)
        const length = dimensions[1]

        return Math.max(acc, length)
    }, 0)
}

const getTotalHeight = (productsInCart: TProductCart[]): number => {
    return productsInCart.reduce((acc, product) => {
        const dimensions = product.dimension.split('x').map(Number)
        const height = dimensions[2]
        return acc + (height * product.quantitySelected)
    }, 0)
}