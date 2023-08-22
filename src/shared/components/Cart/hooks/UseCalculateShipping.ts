import { useState } from 'react'

import * as yup from 'yup'
import { FormHandles } from '@unform/core'

import { IVFormErrors } from '../../../../shared/forms'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    IFormData,
    formatValidationSchema
} from '../validation/Schema'

import { TProductCart, useCartContext } from '../../../contexts'

import {
    IPrecoPrazoResponse,
    ShippingService
} from '../../../services/api/shipping/ShippingService'

interface IUseCalculateShippingProps {
    setIsLoading: (status: boolean) => void
    formRef: React.RefObject<FormHandles>
}

const INITIAL_VALUES = {
    Codigo: '0',
    Valor: '0',
    PrazoEntrega: '0',
    ValorSemAdicionais: '0',
    ValorMaoPropria: '0',
    ValorAvisoRecebimento: '0',
    ValorDeclarado: '0',
    EntregaDomiciliar: '0',
    EntregaSabado: '0',
    obsFim: '0',
    Erro: '0',
    MsgErro: '0'
}

export const UseCalculateShipping = ({ setIsLoading, formRef }: IUseCalculateShippingProps) => {
    const { productsInCart } = useCartContext()

    const [shipping, setShipping] = useState<IPrecoPrazoResponse>(INITIAL_VALUES)

    const calculateShipping = async (data: IFormData) => {
        try {
            const cep = data.cep.replace(/[^\w]/g, '')
            const validateData = await formatValidationSchema.validate({ cep }, { abortEarly: false })
            setIsLoading(true)

            const formattedRequest = {
                cep: validateData.cep,
                weight: getTotalWeightInKilograms(productsInCart),
                width: getLargestWidth(productsInCart),
                length: getLargestLength(productsInCart),
                height: getTotalHeight(productsInCart)
            }
            console.log('Testa: ', formattedRequest)
            const result = await ShippingService.calculateShipping(formattedRequest)
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            setShipping(result)
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

    return { shipping, calculateShipping }

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

